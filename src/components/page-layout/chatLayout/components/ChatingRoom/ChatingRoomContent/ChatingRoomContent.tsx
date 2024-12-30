import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

import { Client } from "@stomp/stompjs";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";

import getLogIn from "@/components/common/Header/apis/getLogIn";
import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/ChatingRoomContent.module.scss";
import ChatArrow from "@/icons/chat_arrow.svg";

import MyChat from "./MyChat/MyChat";
import OppositeChat from "./OppositeChat/OppositeChat";
import getChatingRoom from "../../../apis/getChatingRoom";
import { useChatContext } from "../../chatLayout";

const cn = classNames.bind(styles);

interface ReceivedMessage {
  content: string;
  senderId: number;
  createdAt: Date;
  messageType: string;
}

interface ChattingList {
  chatMessages: ReceivedMessage[];
}

export default function ChatingRoomContent() {
  const { chatingRoomNumber } = useChatContext();
  const [receivedMessages, setReceivedMessages] = useState<ReceivedMessage[]>([]);
  const [, setConnectionStatus] = useState("Disconnected");
  const clientRef = useRef<Client | null>(null);
  const { register, handleSubmit, reset } = useForm<ReceivedMessage>();
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const [lastRef, inView] = useInView();
  const accessToken = localStorage.getItem("accessToken");

  const { data } = useQuery({
    queryKey: ["userLogIn"],
    queryFn: () => getLogIn(),
  });

  const {
    data: chattingData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["chatingRoom", chatingRoomNumber],
    queryFn: ({ pageParam }) => getChatingRoom(5, pageParam, chatingRoomNumber as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      lastPage.nextPage ? lastPage.cursor : undefined,
    enabled: !!chatingRoomNumber,
  });

  const sendMessage = useCallback(
    (data: ReceivedMessage) => {
      if (clientRef.current && clientRef.current.active) {
        clientRef.current.publish({
          destination: `/api/app/chat/${chatingRoomNumber}`,
          body: JSON.stringify({
            content: data.content,
            messageType: "CHAT",
          }),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        reset();
      }
    },
    [chatingRoomNumber, reset, accessToken],
  );

  useEffect(() => {
    const chatingMessageList: ReceivedMessage[] = [];
    chattingData?.pages.map((chatingList: ChattingList) =>
      chatingList.chatMessages.map((chatMessages: ReceivedMessage) => chatingMessageList.push(chatMessages)),
    );
    setReceivedMessages(chatingMessageList.slice().reverse());

    const client = new Client({
      brokerURL: "wss://buddybridge.13.209.34.25.sslip.io/socket/connect",
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      debug: (str) => {
        console.log(str);
      },
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("Connected");
        setConnectionStatus("Connected");
        client.subscribe(`/api/queue/chat/${chatingRoomNumber}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setReceivedMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
        setConnectionStatus("Error: " + frame.headers["message"]);
      },
      onWebSocketError: (event) => {
        console.error("WebSocket error", event);
        setConnectionStatus("WebSocket Error");
      },
      onDisconnect: () => {
        console.log("Disconnected");
        setConnectionStatus("Disconnected");
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, [chatingRoomNumber, chattingData?.pages, accessToken]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [receivedMessages]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(sendMessage)();
    }
  };

  return (
    <div className={cn("container")}>
      <div className={cn("chattingBox")} ref={chatBoxRef}>
        <div ref={lastRef}></div>
        {receivedMessages?.map((msg, index) =>
          msg.messageType === "INFO" ? (
            <div className={cn("firstMessageContainer")} key={index}>
              <p className={cn("firstMessage")}>매칭이 생성되었습니다.</p>
            </div>
          ) : data?.memberId === msg.senderId ? (
            <MyChat date={msg.createdAt} chat={msg.content} key={index} />
          ) : (
            <OppositeChat
              date={msg.createdAt}
              key={index}
              oppsiteUser={chattingData?.pages[0].receiver}
              chat={msg.content}
            />
          ),
        )}
      </div>
      <form className={cn("form")} onSubmit={handleSubmit(sendMessage)}>
        <textarea
          className={cn("textarea")}
          placeholder="메시지를 입력하세요."
          onKeyDown={handleKeyDown}
          {...register("content", { required: true })}
        />
        <button type="submit" className={cn("sendBtn")}>
          <ChatArrow />
        </button>
      </form>
    </div>
  );
}

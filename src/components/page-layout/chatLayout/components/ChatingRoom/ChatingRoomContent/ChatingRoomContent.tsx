import { useCallback, useEffect, useRef, useState } from "react";

import { Client } from "@stomp/stompjs";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";

import { useRouter } from "next/router";

import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/ChatingRoomContent.module.scss";
import ChatArrow from "@/icons/chat_arrow.svg";
import useUserInfoStore from "@/stores/kakaoInnfo";

import MyChat from "./MyChat/MyChat";
import OppositeChat from "./OppositeChat/OppositeChat";
import getChatingRoom from "../../../apis/getChatingRoom";
import { useChatContext } from "../../chatLayout";

const cn = classNames.bind(styles);

interface ReceivedMessage {
  content: string;
  senderId: number;
}

export default function ChatingRoomContent() {
  const { chatingRoomNumber } = useChatContext();
  const [receivedMessages, setReceivedMessages] = useState<ReceivedMessage[]>([]);
  const [, setConnectionStatus] = useState("Disconnected");
  const clientRef = useRef<Client | null>(null);
  const { register, handleSubmit, reset } = useForm<ReceivedMessage>();
  const { userInfo } = useUserInfoStore();
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const [lastRef, inView] = useInView();

  const {
    data: chaingData,
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
        });
        reset();
      }
    },
    [chatingRoomNumber, reset],
  );

  useEffect(() => {
    const latestPage = chaingData?.pages[chaingData?.pages.length - 1];
    if (latestPage && latestPage.chatMessages) {
      const latestMessages = latestPage.chatMessages.slice().reverse() as ReceivedMessage[];
      setReceivedMessages((prevMessages: ReceivedMessage[]) => [...latestMessages, ...prevMessages]);
    }

    const client = new Client({
      brokerURL: "wss://buddybridge.13.209.34.25.sslip.io/socket/connect",
      connectHeaders: {},
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
  }, [chatingRoomNumber, chaingData?.pages]);

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

  return (
    <div className={cn("container")}>
      <div className={cn("chatingBox")} ref={chatBoxRef}>
        <div ref={lastRef} className={cn("trigger")}></div>
        {receivedMessages?.map((msg, index) =>
          userInfo?.memberId === msg.senderId ? (
            <MyChat chat={msg.content} key={index} />
          ) : (
            <OppositeChat key={index} oppsiteUser={chaingData?.pages[0].receiver} chat={msg.content} />
          ),
        )}
      </div>
      <form className={cn("form")} onSubmit={handleSubmit(sendMessage)}>
        <input
          className={cn("input")}
          placeholder="메시지를 입력하세요."
          {...register("content", { required: true })}
        />
        <button type="submit">
          <ChatArrow />
        </button>
      </form>
    </div>
  );
}

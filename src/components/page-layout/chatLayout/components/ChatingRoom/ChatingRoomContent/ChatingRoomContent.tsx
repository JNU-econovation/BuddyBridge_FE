import { useCallback, useEffect, useRef, useState } from "react";

import { Client } from "@stomp/stompjs";
import { useInfiniteQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";

import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/ChatingRoomContent.module.scss";
import ChatArrow from "@/icons/chat_arrow.svg";
import useUserInfoStore from "@/stores/kakaoInnfo";

import MyChat from "./MyChat/MyChat";
import OppositeChat from "./OppositeChat/OppositeChat";
import getChatingRoom from "../../../apis/getChatingRoom";
import { useAccodionContext } from "../../chatLayout";

const cn = classNames.bind(styles);

interface ReceivedMessage {
  content: string;
  senderId: number;
}

export default function ChatingRoomContent() {
  const { chatingRoomNumber } = useAccodionContext();
  const [receivedMessages, setReceivedMessages] = useState<ReceivedMessage[]>([]);
  const [, setConnectionStatus] = useState("Disconnected");
  const clientRef = useRef<Client | null>(null);
  const { register, handleSubmit, reset } = useForm<ReceivedMessage>();
  const { userInfo } = useUserInfoStore();
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["chatingRoom", chatingRoomNumber],
    queryFn: ({ pageParam }) => getChatingRoom(6, pageParam, chatingRoomNumber as number),
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
          console.log(`/api/queue/chat/${chatingRoomNumber}`);
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
  }, [chatingRoomNumber]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [receivedMessages]);

  return (
    <div className={cn("container")}>
      <div className={cn("chatingBox")} ref={chatBoxRef}>
        {receivedMessages.map((msg, index) =>
          userInfo?.memberId === msg.senderId ? (
            <MyChat chat={msg.content} key={index} />
          ) : (
            <OppositeChat key={index} oppsiteUser={data?.pages[0].receiver} chat={msg.content} />
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

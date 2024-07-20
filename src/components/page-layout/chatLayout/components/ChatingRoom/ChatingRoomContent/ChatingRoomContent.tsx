import { useEffect, useState } from "react";

import { Client, Message } from "@stomp/stompjs";
import classNames from "classnames/bind";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/ChatingRoomContent.module.scss";
import ChatArrow from "@/icons/chat_arrow.svg";
import useUserInfoStore from "@/stores/kakaoInnfo";

import { useAccodionContext } from "../../chatLayout";

const cn = classNames.bind(styles);

interface MessageType {
  content: string;
}

interface ReceivedMessage {
  content: string;
  senderId: string;
}

export default function ChatingRoomContent() {
  const { chatingRoomNumber } = useAccodionContext();
  const { userInfo } = useUserInfoStore();
  const { register, handleSubmit, reset } = useForm<MessageType>();
  const [messages, setMessages] = useState<ReceivedMessage[]>([]);
  const [messageSent, setMessageSent] = useState(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  const onSubmit: SubmitHandler<MessageType> = (data) => {
    const message = {
      content: data.content,
      alarmType: "CHAT",
    };

    if (data.content.trim() && stompClient) {
      stompClient.publish({
        destination: `/api/app/chat/${chatingRoomNumber}`,
        body: JSON.stringify(message),
      });
      setMessageSent(true);
      reset();
    }
  };

  useEffect(() => {
    const client = new Client({
      brokerURL: `wss://buddybridge.13.209.34.25.sslip.io/socket/connect`,
      connectHeaders: {},
      onConnect: () => {
        client.subscribe(`/api/app/chat/${chatingRoomNumber}`, (message: Message) => {
          const { content, senderId } = JSON.parse(message.body) as ReceivedMessage;
          setMessages((prevMessages) => [...prevMessages, { content, senderId }]);
          setMessageSent(false);
        });
      },
      onDisconnect: () => {
        console.log("Disconnected");
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [chatingRoomNumber]);

  console.log(messages);

  return (
    <div className={cn("container")}>
      <div className={cn("chatingBox")}>1</div>
      <form className={cn("form")} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={cn("input")}
          placeholder="메시지를 입력하세요."
          {...register("content", { required: true })}
        />
        <button>
          <ChatArrow />
        </button>
      </form>
    </div>
  );
}

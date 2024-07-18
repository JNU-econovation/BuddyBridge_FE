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

export default function ChatingRoomContent({ stompClient }: { stompClient: Client | null }) {
  const { chatingRoomNumber } = useAccodionContext();
  const { userInfo } = useUserInfoStore();
  const { register, handleSubmit, reset } = useForm<MessageType>();
  const [messages, setMessages] = useState<ReceivedMessage[]>([]);
  const [messageSent, setMessageSent] = useState(false); // 메시지 전송 상태 추가

  const onSubmit: SubmitHandler<MessageType> = (data) => {
    const message = {
      senderId: userInfo?.memberId,
      content: data.content,
      messageType: "CHAT",
    };

    if (data.content.trim() && stompClient) {
      stompClient.publish({
        destination: `/api/app/chat/${chatingRoomNumber}`,
        body: JSON.stringify(message),
      });
      setMessageSent(true); // 메시지를 전송한 후 상태 업데이트
      reset();
    }
  };

  useEffect(() => {
    if (stompClient) {
      const subscription = stompClient.subscribe(`/api/app/chat/${chatingRoomNumber}`, (message: Message) => {
        const { content, senderId } = JSON.parse(message.body) as ReceivedMessage;
        console.log(content);
        setMessages((prevMessages) => [...prevMessages, { content, senderId }]);
        setMessageSent(false); // 메시지를 수신한 후 상태 업데이트
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient, userInfo?.memberId, messageSent, chatingRoomNumber]);

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

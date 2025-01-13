import { createContext, useContext, useState } from "react";

import classNames from "classnames/bind";

import { useRouter } from "next/router";

import styles from "@/components/page-layout/chatLayout/components/chatLayout.module.scss";

import ChatingRoom from "./ChatingRoom/ChatingRoom";
import ChatList from "./ChatList/ChatList";
import MyInfo from "./ChatList/MyInfo/MyInfo";

const cn = classNames.bind(styles);

interface ChatContextType {
  chatingRoomNumber: number | undefined;
  chattingRoomType: "DONE" | "PENDING" | "FAILED" | "VOLUNTEERING_COMPLETED" | "VOLUNTEERING_VERIFIED";
  setChattingRoomType: (
    chatingRoomNumber: "DONE" | "PENDING" | "FAILED" | "VOLUNTEERING_COMPLETED" | "VOLUNTEERING_VERIFIED",
  ) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw Error("(!) Chat 컨텍스트를 호출할 수 없는 범위 입니다.");
  }

  return context;
};

export default function ChatLayout() {
  const router = useRouter();
  const chatingRoomNumber = Number(router.query["id"]);
  const [chattingRoomType, setChattingRoomType] = useState<
    "DONE" | "PENDING" | "FAILED" | "VOLUNTEERING_COMPLETED" | "VOLUNTEERING_VERIFIED"
  >("PENDING");
  const [matchingState, setMatchingState] = useState("ALL");

  return (
    <ChatContext.Provider value={{ chatingRoomNumber, chattingRoomType, setChattingRoomType }}>
      <div className={cn("container")}>
        <MyInfo />
        <ChatList matchingState={matchingState} setMatchingState={setMatchingState} />
        <ChatingRoom matchingState={matchingState} />
      </div>
    </ChatContext.Provider>
  );
}

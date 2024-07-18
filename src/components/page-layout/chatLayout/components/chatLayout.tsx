import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

import classNames from "classnames/bind";

import styles from "@/components/page-layout/chatLayout/components/chatLayout.module.scss";

import ChatingRoom from "./ChatingRoom/ChatingRoom";
import ChatList from "./ChatList/ChatList";

const cn = classNames.bind(styles);

interface ChatContextType {
  chatingRoomNumber: number | null;
  setChatingRoomNumber: (chatingRoomNumber: number | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useAccodionContext = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw Error("(!) Chat 컨텍스트를 호출할 수 없는 범위 입니다.");
  }

  return context;
};

export default function ChatLayout() {
  const [chatingRoomNumber, setChatingRoomNumber] = useState<null | number>(null);

  return (
    <ChatContext.Provider value={{ chatingRoomNumber, setChatingRoomNumber }}>
      <div className={cn("container")}>
        <div className={cn("box")}>
          <ChatList />
          <ChatingRoom />
        </div>
      </div>
    </ChatContext.Provider>
  );
}

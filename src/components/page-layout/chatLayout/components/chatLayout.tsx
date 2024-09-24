import { createContext, useContext, useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import styles from "@/components/page-layout/chatLayout/components/chatLayout.module.scss";
import { ROUTE } from "@/constants/route";

import ChatingRoom from "./ChatingRoom/ChatingRoom";
import ChatList from "./ChatList/ChatList";
import getMyInfo from "../../myPageEditLayout/apis/getMyInfo";

const cn = classNames.bind(styles);

interface ChatContextType {
  chatingRoomNumber: number | undefined;
  setChatingRoomNumber: (chatingRoomNumber: number | undefined) => void;
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
  const [chatingRoomNumber, setChatingRoomNumber] = useState<undefined | number>(Number(router.query["id"]));
  const { data, isFetching } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getMyInfo(),
  });

  useEffect(() => {
    if (!data && !isFetching) {
      router.push(ROUTE.LOGIN);
    }
  }, [data, router, isFetching]);

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

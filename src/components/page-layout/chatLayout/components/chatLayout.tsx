import { useState } from "react";

import classNames from "classnames/bind";

import styles from "@/components/page-layout/chatLayout/components/chatLayout.module.scss";

import ChatingRoom from "./ChatingRoom/ChatingRoom";
import ChatList from "./ChatList/ChatList";
import MyInfo from "./ChatList/MyInfo/MyInfo";

const cn = classNames.bind(styles);

export default function ChatLayout() {
  const [matchingState, setMatchingState] = useState<"ALL" | "PENDING" | "DONE">("ALL");

  return (
    <div className={cn("container")}>
      <MyInfo />
      <ChatList matchingState={matchingState} setMatchingState={setMatchingState} />
      <ChatingRoom matchingState={matchingState} />
    </div>
  );
}

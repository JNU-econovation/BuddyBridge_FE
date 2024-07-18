import { useState } from "react";

import classNames from "classnames/bind";

import styles from "@/components/page-layout/chatLayout/components/ChatList/ChatList.module.scss";

import ChatListContent from "./ChatListContent/ChatListContent";
import ChatListHeader from "../ChatList/ChatListHeader/ChatListHeader";

const cn = classNames.bind(styles);

export default function ChatList() {
  const [matchingState, setMatchingState] = useState("all");

  return (
    <div className={cn("container")}>
      <ChatListHeader matchingState={matchingState} setMatchingState={setMatchingState} />
      <ChatListContent />
    </div>
  );
}

import classNames from "classnames/bind";

import styles from "@/components/page-layout/chatLayout/components/ChatList/ChatList.module.scss";

import ChatListContent from "./ChatListContent/ChatListContent";
import ChatListHeader from "../ChatList/ChatListHeader/ChatListHeader";

const cn = classNames.bind(styles);

interface ChatListProps {
  matchingState: string;
  setMatchingState: (matchingState: string) => void;
}

export default function ChatList({ matchingState, setMatchingState }: ChatListProps) {
  return (
    <div className={cn("container")}>
      <ChatListHeader matchingState={matchingState} setMatchingState={setMatchingState} />
      <ChatListContent matchingState={matchingState} />
    </div>
  );
}

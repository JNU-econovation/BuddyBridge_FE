import { useEffect } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useInView } from "react-intersection-observer";

import Chat from "@/components/common/Chat/Chat";
import styles from "@/components/page-layout/chatLayout/components/ChatList/ChatListContent/ChatListContent.module.scss";

import getAllChatList from "../../../apis/getAllChatList";

const cn = classNames.bind(styles);

interface ChatType {
  lastMessage: string;
  matchingId: number;
  lastMessageTime: string;
  postType: string;
  receiver: {
    receiverId: number;
    receiverName: string;
    receiverProfileImg: string;
  };
}

export default function ChatListContent() {
  const [lastRef, inView] = useInView();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["chatList"],
    queryFn: ({ pageParam }) => getAllChatList(6, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      lastPage.nextPage ? lastPage.cursor : undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className={cn("container")}>
      {data?.pages[0].matchings?.map((chat: ChatType) => (
        <Chat
          img={chat?.receiver?.receiverProfileImg}
          content={chat?.lastMessage}
          date={chat?.lastMessageTime}
          name={chat?.receiver?.receiverName}
          type={chat?.postType}
          key={chat?.matchingId}
          id={chat?.matchingId}
        />
      ))}
      <div ref={lastRef}></div>
    </div>
  );
}

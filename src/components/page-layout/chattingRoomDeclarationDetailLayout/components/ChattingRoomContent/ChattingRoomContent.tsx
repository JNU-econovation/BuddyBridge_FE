import { useEffect, useRef, useState } from "react";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useInView } from "react-intersection-observer";

import { useRouter } from "next/router";

import getLogIn from "@/components/common/Header/apis/getLogIn";
import MyChat from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/MyChat/MyChat";
import OppositeChat from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/OppositeChat/OppositeChat";
import styles from "@/components/page-layout/chattingRoomDeclarationDetailLayout/components/ChattingRoomContent/ChattingRoomContent.module.scss";

import getChattingRoomContent from "../../apis/getChattingRoomContent";

const cn = classNames.bind(styles);

interface ReceivedMessage {
  content: string;
  senderId: number;
  createdAt: Date;
  messageType: string;
}

export default function ChattingRoomContent() {
  const [lastRef, inView] = useInView();
  const [receivedMessages, setReceivedMessages] = useState<ReceivedMessage[]>([]);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["userLogIn"],
    queryFn: () => getLogIn(),
  });

  const {
    data: chattingData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["adminChattingRoom", router.query.id],
    queryFn: ({ pageParam }) => getChattingRoomContent(5, pageParam, Number(router.query.id) as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      lastPage.nextPage ? lastPage.cursor : undefined,
    enabled: !!router.query.id,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    let chattingLists = chattingData?.pages.map((chatting) => chatting.chatMessages);

    chattingLists = chattingLists?.flat();

    setReceivedMessages(chattingLists?.reverse() as ReceivedMessage[]);
  }, [chattingData?.pages]);

  return (
    <div className={cn("container")}>
      <div className={cn("chattingBox")} ref={chatBoxRef}>
        <div ref={lastRef} className={cn("trigger")}></div>
        {receivedMessages?.map((msg, index) =>
          msg.messageType === "INFO" ? (
            <div className={cn("firstMessageContainer")} key={index}>
              <p className={cn("firstMessage")}>매칭이 생성되었습니다.</p>
            </div>
          ) : data?.memberId === msg.senderId ? (
            <MyChat date={msg.createdAt} chat={msg.content} key={index} />
          ) : (
            <OppositeChat
              date={msg.createdAt}
              key={index}
              oppsiteUser={chattingData?.pages[0].receiver}
              chat={msg.content}
            />
          ),
        )}
      </div>
    </div>
  );
}

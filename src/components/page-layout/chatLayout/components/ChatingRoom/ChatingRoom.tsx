import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoom.module.scss";

import ChattingRoomContent from "./ChatingRoomContent/ChatingRoomContent";
import ChatingRoomHeader from "./ChatingRoomHeader/ChatingRoomHeader";
import getAllChatList from "../../apis/getAllChatList";
import { useChatContext } from "../chatLayout";

const cn = classNames.bind(styles);

interface ChattingRoomProps {
  matchingState: string;
}

export default function ChatingRoom({ matchingState }: ChattingRoomProps) {
  const { chatingRoomNumber } = useChatContext();
  const [isHamburgerClick, setIsHamburgerClick] = useState(false);

  const { data, isError, isPending } = useQuery({
    queryKey: ["chatList"],
    queryFn: () => getAllChatList(1, 0, "ALL"),
  });

  if (isPending) {
    return <>...로딩중</>;
  }

  if (isError) {
    return <>...에러</>;
  }

  return (
    <>
      {chatingRoomNumber ? (
        <div className={cn("container")}>
          <ChatingRoomHeader setIsHamburgerClick={setIsHamburgerClick} />
          <ChattingRoomContent
            matchingState={matchingState}
            isHamburgerClick={isHamburgerClick}
            setIsHamburgerClick={setIsHamburgerClick}
          />
        </div>
      ) : (
        <div className={cn("noChatingRoom")}>
          {data.matchings.length === 0 ? (
            <div>
              <p>현재 채팅방이 하나도 없습니다 :( </p>
              <p>게시글 작성 또는 댓글 작성을 하러 가볼까요?</p>
            </div>
          ) : (
            "채팅방 목록에서 채팅방을 클릭해 보세요 :)"
          )}
        </div>
      )}
    </>
  );
}

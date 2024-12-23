import { useRef, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoom.module.scss";
import { ROUTE } from "@/constants/route";
import useOutsideClick from "@/hooks/useOutsideClick";
import ArrowDown from "@/icons/arrow_down.svg";
import Close from "@/icons/close.svg";

import ChatingRoomContent from "./ChatingRoomContent/ChatingRoomContent";
import ChatingRoomHeader from "./ChatingRoomHeader/ChatingRoomHeader";
import getAllChatList from "../../apis/getAllChatList";
import putMatchingStatus from "../../apis/putMatchingStatus";
import { useChatContext } from "../chatLayout";

const cn = classNames.bind(styles);

interface putMatchingtype {
  chatingRoomId: number;
  status: string;
}

export default function ChatingRoom() {
  const { chatingRoomNumber } = useChatContext();
  const [isHamburgerClick, setIsHamburgerClick] = useState(false);
  const [matchingState, setMatchingState] = useState(false);
  const stateChangeRoomRef = useRef(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isError, isPending } = useQuery({
    queryKey: ["chatList"],
    queryFn: () => getAllChatList(6, 0, "ALL"),
  });

  const chatAcceptMutation = useMutation({
    mutationFn: ({ chatingRoomId, status }: putMatchingtype) => putMatchingStatus(chatingRoomId, status),
    onSuccess: () => {
      router.push(ROUTE.HOME);
      queryClient.invalidateQueries({ queryKey: ["giverPost"] });
      queryClient.invalidateQueries({ queryKey: ["takerPost"] });
    },
  });

  const handleMatchingStateChangeClick = () => {
    setMatchingState((prev) => !prev);
  };

  useOutsideClick([stateChangeRoomRef], () => setIsHamburgerClick(false));

  const handleMatchingCompleteClick = () => {
    chatAcceptMutation.mutate({ chatingRoomId: chatingRoomNumber as number, status: "DONE" });
  };

  const handleMatchingIngClick = () => {
    chatAcceptMutation.mutate({ chatingRoomId: chatingRoomNumber as number, status: "PENDING" });
  };

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
          <ChatingRoomContent />
          {isHamburgerClick && (
            <div className={cn("chatingOutContainer")}>
              <div className={cn("grayContainer")}></div>
              <div className={cn("whiteContainer")} ref={stateChangeRoomRef}>
                <button className={cn("chatingRoomOutButton")}>채팅방 나가기</button>
                <button className={cn("stateChangeButton")} onClick={handleMatchingStateChangeClick}>
                  상태 변경
                  <ArrowDown className={cn({ arrowDown: matchingState })} width={20} height={20} />
                  {matchingState && (
                    <div className={cn("matchingStateContainer")}>
                      <button onClick={handleMatchingIngClick}>매칭중</button>
                      <button onClick={handleMatchingCompleteClick}>매칭완료</button>
                    </div>
                  )}
                </button>
                <Close className={cn("close")} onClick={() => setIsHamburgerClick(!isHamburgerClick)} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={cn("noChatingRoom")}>
          {data.matchings.length === 0 ? (
            <>
              <p>현재 채팅방이 하나도 없습니다 :( </p>
              <p>게시글 작성 또는 댓글 작성을 하러 가볼까요?</p>
            </>
          ) : (
            "채팅방 목록에서 채팅방을 클릭해 보세요 :)"
          )}
        </div>
      )}
    </>
  );
}

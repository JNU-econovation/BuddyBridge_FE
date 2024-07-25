import { useRef, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoom.module.scss";
import { ROUTE } from "@/constants/route";
import useOutsideClick from "@/hooks/useOutsideClick";
import ArrowDown from "@/icons/arrow_down.svg";
import Close from "@/icons/close.svg";

import ChatingRoomContent from "./ChatingRoomContent/ChatingRoomContent";
import ChatingRoomHeader from "./ChatingRoomHeader/ChatingRoomHeader";
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

  const handlematchingCompleteClick = () => {
    chatAcceptMutation.mutate({ chatingRoomId: chatingRoomNumber as number, status: "DONE" });
  };

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
                      <button>매칭중</button>
                      <button onClick={handlematchingCompleteClick}>매칭완료</button>
                    </div>
                  )}
                </button>
                <Close className={cn("close")} onClick={() => setIsHamburgerClick(!isHamburgerClick)} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={cn("noChatingRoom")}>채팅방을 클릭해주세요.</div>
      )}
    </>
  );
}

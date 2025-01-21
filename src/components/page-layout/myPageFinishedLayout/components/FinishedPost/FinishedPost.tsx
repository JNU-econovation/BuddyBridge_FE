import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames/bind";

import Link from "next/link";

import PostStatusLabel from "@/components/common/PostStatusLabel/PostStatusLabel";
import openToast from "@/components/common/Toast/features/openToast";
import postCertificationRequest from "@/components/page-layout/chatLayout/apis/postCertificationRequest";
import CompleteVolunteeringModal from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/CompleteVolunteeringModal/CompleteVolunteeringModal";
import GetNoVolunteeringModal from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/GetNoVolunteeringModal/GetNoVolunteeringModal";
import MyPageCertifyVolunteeringModal from "@/components/page-layout/myPageFinishedLayout/components/MyPageCertifyVolunteeringModal/MyPageCertifyVolunteeringModal";
import MyPageConfirmVolunteeringModal from "@/components/page-layout/myPageFinishedLayout/components/MyPageConfirmVolunteeringModal/MyPageConfirmVolunteeringModal";
import { ROUTE } from "@/constants/route";
import Calendar from "@/icons/calendar.svg";
import Clock from "@/icons/clock.svg";
import Location from "@/icons/location.svg";
import Arrow from "@/icons/thick_arrow.svg";
import { ErrorResponse } from "@/types/error";
import { formatDateString } from "@/utils";

import styles from "./FinishedPost.module.scss";

const cn = classNames.bind(styles);

interface FinishedPostProps {
  id: number;
  name: string;
  email: string;
  matchingId: number;
  title: string;
  postStatus: "RECRUITING" | "FINISHED";
  startDate: Date;
  endDate: Date;
  postType: "TAKER" | "GIVER";
  district: string;
  startTime: Date;
  endTime: Date;
  matchingStatus: string;
  memberRole: "TAKER" | "GIVER";
  canRequest: boolean;
}

export default function FinishedPost({
  endDate,
  id,
  email,
  name,
  matchingId,
  startDate,
  postStatus,
  title,
  postType,
  district,
  startTime,
  endTime,
  matchingStatus,
  memberRole,
  canRequest,
}: FinishedPostProps) {
  const [isConfirmVolunteeringModalOpen, setIsConfirmVolunteeringModalOpen] = useState(false);
  const [isCompleteVolunteeringModalOpen, setIsCompleteVolunteeringModalOpen] = useState(false);
  const [isGetNoVolunteeringModalOpen, setIsGetNoVolunteeringModalOpen] = useState(false);
  const [isCertifyVolunteeringModalOpen, setIsCertifyVolunteeringModalOpen] = useState(false);

  const postCertificationRequestMutation = useMutation({
    mutationFn: () => postCertificationRequest(matchingId),
    onSuccess: () => {
      openToast("success", "봉사 인증 요청이 완료되었습니다.");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        openToast("error", error.response.data.error.message);
      }
    },
  });

  const handleClickTakerDone = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsConfirmVolunteeringModalOpen((prev) => !prev);
  };
  const handleClickGiverVC = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCertifyVolunteeringModalOpen((prev) => !prev);
  };
  const handleClickGiverVV = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCertifyVolunteeringModalOpen((prev) => !prev);
  };
  const handleClickRequestBtn = () => {
    postCertificationRequestMutation.mutate();
  };

  return (
    <>
      <Link href={postType === "TAKER" ? `${ROUTE.HELP_ME}/${id}` : `${ROUTE.HELP_YOU}/${id}`} className={cn("Box")}>
        <div className={cn("leftBox")}>
          <div className={cn("titleBox")}>
            <span className={cn("postTypeLabel", { giverType: postType === "GIVER" })}>{`${
              postType === "TAKER" ? "도와줄래요?" : "도와줄게요"
            } ${id}`}</span>
            <div className={cn("title")}>
              <p className={cn("titleText")}>{title}</p>
              <PostStatusLabel postStatus={postStatus} />
            </div>
          </div>
          <div className={cn("detailBox")}>
            <div className={cn("districtBox")}>
              <Location />
              <p>{district}</p>
            </div>
            <div className={cn("dateBox")}>
              <Calendar />
              <p>{`${formatDateString(startDate)} ~ ${formatDateString(endDate)}`}</p>
            </div>
            <div className={cn("timeBox")}>
              <Clock />
              <p>{`${startTime} ~ ${endTime}`}</p>
            </div>
          </div>
        </div>
        {memberRole === "TAKER" && (
          <>
            {matchingStatus === "DONE" && (
              <button onClick={handleClickTakerDone} className={cn("takerDoneBtn")}>
                도움을 받았어요?
                <Arrow className={cn("arrowIcon")} />
              </button>
            )}
            {matchingStatus === "VOLUNTEERING_COMPLETED" && <div className={cn("takerVC")}>도움을 받았어요!</div>}
          </>
        )}
        {memberRole === "GIVER" && (
          <>
            {matchingStatus === "VOLUNTEERING_COMPLETED" && (
              <button onClick={handleClickGiverVC} className={cn("giverVCBtn")}>
                <span>도움을 주었나요?</span>
                <Arrow className={cn("arrowIcon")} />
              </button>
            )}
            {matchingStatus === "VOLUNTEERING_VERIFIED" && (
              <button onClick={handleClickGiverVV} className={cn("giverVVBtn")}>
                도움을 줬어요!
                <Arrow className={cn("arrowIcon")} />
              </button>
            )}
            {canRequest && (
              <button onClick={handleClickRequestBtn} className={cn("activeRequestBtn")}>
                도움완료 요청하기
                <Arrow className={cn("arrowIcon")} />
              </button>
            )}
          </>
        )}
      </Link>
      {isCompleteVolunteeringModalOpen && (
        <CompleteVolunteeringModal setState={setIsCompleteVolunteeringModalOpen} postId={id} postType={postType} />
      )}
      {isConfirmVolunteeringModalOpen && (
        <MyPageConfirmVolunteeringModal
          setState={setIsConfirmVolunteeringModalOpen}
          postId={id}
          matchingId={matchingId}
          postType={postType}
          setIsCompleteVolunteeringModalOpen={setIsCompleteVolunteeringModalOpen}
          setIsGetNoVolunteeringModalOpen={setIsGetNoVolunteeringModalOpen}
        />
      )}
      {isGetNoVolunteeringModalOpen && (
        <GetNoVolunteeringModal
          setState={setIsGetNoVolunteeringModalOpen}
          postId={id}
          postType={postType}
          nickName="nickName"
        />
      )}
      {isCertifyVolunteeringModalOpen && (
        <MyPageCertifyVolunteeringModal
          setState={setIsCertifyVolunteeringModalOpen}
          postId={id}
          postType={postType}
          email={email}
          name={name}
          matchingId={matchingId}
          matchingStatus={matchingStatus}
        />
      )}
    </>
  );
}

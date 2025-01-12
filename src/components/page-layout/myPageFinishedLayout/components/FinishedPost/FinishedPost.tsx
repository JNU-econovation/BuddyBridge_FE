import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Link from "next/link";
import { useRouter } from "next/router";

import PostStatusLabel from "@/components/common/PostStatusLabel/PostStatusLabel";
import { ROUTE } from "@/constants/route";
import Arrow from "@/icons/arrow.svg";
import Calendar from "@/icons/calendar.svg";
import Clock from "@/icons/clock.svg";
import Location from "@/icons/location.svg";
import { formatDateString } from "@/utils";

import styles from "./FinishedPost.module.scss";
//import postLikes from "../Post/apis/postLikes";

const cn = classNames.bind(styles);

interface FinishedPostProps {
  id: number;
  title: string;
  postStatus: "RECRUITING" | "FINISHED";
  startDate: Date;
  endDate: Date;
  postType: "TAKER" | "GIVER";
  district: string;
  startTime: Date;
  endTime: Date;
  matchingStatus: string;
}

export default function FinishedPost({
  endDate,
  id,
  startDate,
  postStatus,
  title,
  postType,
  district,
  startTime,
  endTime,
  matchingStatus,
}: FinishedPostProps) {
  const router = useRouter();
  const memberRole = router.query.memberRole;

  const handleClickTakerDone  = () => {};
  const handleClickTakerVC  = () => {};
  const handleClickGiverVC  = () => {};
  const handleClickGiverVV  = () => {};
  //
  //   const [isHeartClick, setIsHeartClick] = useState(isLiked);

  //   const { mutate } = useMutation({
  //     mutationFn: () => postLikes(id),
  //     onSuccess: () => {
  //       window.location.reload();
  //     },
  //   });

  //   const handleHeartClick = () => {
  //     setIsHeartClick((prev) => !prev);
  //     mutate();
  //   };

  return (
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
              <Arrow />
            </button>
          )}
          {matchingStatus === "VOLUNTEERING_COMPLETED" && (
            <button onClick={handleClickTakerVC} className={cn("takerVCBtn")}>
              도움을 받았어요!
            </button>
          )}
        </>
      )}
      {memberRole === "GIVER" && (
        <>
          {matchingStatus === "VOLUNTEERING_COMPLETED" && (
            <button onClick={handleClickGiverVC} className={cn("giverVCBtn")}>
              도움을 주었나요?
              <Arrow />
            </button>
          )}
          {matchingStatus === "VOLUNTEERING_VERIFIED" && (
            <button onClick={handleClickGiverVV} className={cn("giverVVBtn")}>
              도움을 주었어요!
            </button>
          )}
        </>
      )}
    </Link>
  );
}

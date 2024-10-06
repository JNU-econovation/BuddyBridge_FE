import { MouseEvent, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Link from "next/link";

import styles from "@/components/common/Post/Post.module.scss";
import PostData from "@/components/page-layout/HomeLayout/types";
import { ROUTE } from "@/constants/route";
import Calendar from "@/icons/calendar.svg";
import Clock from "@/icons/clock.svg";
import Heart from "@/icons/heart.svg";
import Location from "@/icons/location.svg";
import Personnel from "@/icons/personnel.svg";
import RedHeart from "@/icons/red_heart.svg";
import { formatDateString, formatTimeString } from "@/utils";

import postLikes from "./apis/postLikes";
import PostLabel from "./PostLabel/PostLabel";

const cn = classNames.bind(styles);

interface PostProps {
  data: PostData;
}

export default function Post({ data }: PostProps) {
  const {
    postType,
    title,
    startDate,
    endDate,
    matchingDoneCount,
    headcount,
    author,
    assistanceType,
    district,
    assistanceStartTime,
    assistanceEndTime,
    scheduleType,
    id,
    postStatus,
    disabilityType,
    isLiked,
  } = data;

  const { mutate } = useMutation({
    mutationFn: () => postLikes(id),
  });

  const [isHeartClick, setIsHeartClick] = useState(isLiked);

  const handleHeartClick = (event: MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    setIsHeartClick((prev) => !prev);
    mutate();
  };

  return (
    <Link
      href={postType === "TAKER" ? `${ROUTE.HELP_ME}/${id}` : `${ROUTE.HELP_YOU}/${id}`}
      className={cn("cardContainer", {
        taker: postType === "TAKER",
        giver: postType === "GIVER",
      })}
    >
      <div className={cn("contentContainer")}>
        <p
          className={cn("progress", {
            taker: postType === "TAKER",
            giver: postType === "GIVER",
          })}
        >
          {postStatus === "RECRUITING" ? "매칭중" : "매칭완료"}
        </p>
        {isHeartClick ? (
          <RedHeart onClick={handleHeartClick} width={32} height={32} className={cn("heart")} />
        ) : (
          <Heart onClick={handleHeartClick} width={32} height={32} className={cn("heart")} />
        )}
        <div className={cn("contentBox")}>
          <div className={cn("box")}>
            <p className={cn("title")}>{title}</p>
            <div className={cn("detailBox")}>
              <div className={cn("districtBox")}>
                <Location />
                <p className={cn("district")}>{district}</p>
              </div>
              <div className={cn("calendarBox")}>
                <Calendar />
                <p className={cn("calendar")}>{`${formatDateString(startDate)} ~ ${formatDateString(endDate)}`}</p>
              </div>
              <div className={cn("clockBox")}>
                <div className={cn("clockImgBox")}>
                  <Clock />
                </div>
                <p className={cn("clock")}>{`${scheduleType}, ${formatTimeString(
                  assistanceStartTime,
                )} ~ ${formatTimeString(assistanceEndTime)}`}</p>
              </div>
              <div className={cn("headcountBox")}>
                <Personnel />
                <p className={cn("headcount")}>{`${matchingDoneCount}명 / ${headcount}명`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className={cn("postId")}>{id}</p>
      <div className={cn("postLabelBox")}>
        <PostLabel text={assistanceType} />
        {disabilityType && <PostLabel text={disabilityType} />}
      </div>
    </Link>
  );
}

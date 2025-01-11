import { useState, useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Link from "next/link";
import { useRouter } from "next/router";

import { ROUTE } from "@/constants/route";
import Calendar from "@/icons/calendar.svg";
import Clock from "@/icons/clock.svg";
import Location from "@/icons/location.svg";
import RedHeart from "@/icons/red_heart.svg";
import { formatDateString } from "@/utils";

import styles from "./LikesPost.module.scss";
import postLikes from "../Post/apis/postLikes";
import PostStatusLabel from "../PostStatusLabel/PostStatusLabel";

const cn = classNames.bind(styles);

interface LikesPostProps {
  id: number;
  title: string;
  postStatus: "RECRUITING" | "FINISHED";
  startDate: Date;
  endDate: Date;
  postType: "TAKER" | "GIVER";
  district: string;
  startTime: Date;
  endTime: Date;
  isLiked: boolean;
}

export default function LikesPost({ endDate, id, startDate, postStatus, title, postType, district, startTime, endTime, isLiked }: LikesPostProps) {

  const router = useRouter();
  const [isHeartClick, setIsHeartClick] = useState(isLiked);

  const { mutate } = useMutation({
    mutationFn: () => postLikes(id),
    onSuccess: () => {
      window.location.reload();
    }
  });

  const handleHeartClick = () => {
    setIsHeartClick((prev) => !prev)
    mutate();
  };

  return (
    <Link href={postType === "TAKER" ? `${ROUTE.HELP_ME}/${id}` : `${ROUTE.HELP_YOU}/${id}`} className={cn("Box")}>
      <div className={cn("leftBox")}>
        <div className={cn("titleBox")}>
          <span className={cn("postTypeLabel",{giverType:postType==="GIVER"})}>{`${postType === "TAKER" ? "도와줄래요?": "도와줄게요"} ${id}`}</span>
          <div className={cn("title")}>
            <p className={cn("titleText")}>{title}</p>
            <PostStatusLabel postStatus={postStatus} />
          </div>
        </div>
        <div className={cn("detailBox")}>
          <div className={cn("districtBox")}>
            <Location/>
            <p>{district}</p>
          </div>
          <div className={cn("dateBox")}>
            <Calendar/>
            <p>{`${formatDateString(startDate)} ~ ${formatDateString(endDate)}`}</p>
          </div>
          <div className={cn("timeBox")}>
            <Clock/>
            <p>{`${startTime} ~ ${endTime}`}</p>
          </div>
        </div>
      </div>
      <button 
        onClick= {(e) =>{
          e.preventDefault();
          handleHeartClick();
        }} 
        className={cn("heartBtn")}
      >
        <RedHeart width={32} height={32} />
      </button>
    </Link>
  );
}

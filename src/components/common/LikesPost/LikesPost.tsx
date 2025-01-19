import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames/bind";

import Link from "next/link";

import { ROUTE } from "@/constants/route";
import Calendar from "@/icons/calendar.svg";
import Clock from "@/icons/clock.svg";
import Location from "@/icons/location.svg";
import PinkHeart from "@/icons/pink_heart.svg";
import { ErrorResponse } from "@/types/error";
import { formatDateString } from "@/utils";

import styles from "./LikesPost.module.scss";
import postLikes from "../Post/apis/postLikes";
import PostStatusLabel from "../PostStatusLabel/PostStatusLabel";
import openToast from "../Toast/features/openToast";

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
  pageId: number;
}

export default function LikesPost({
  endDate,
  id,
  startDate,
  postStatus,
  title,
  postType,
  district,
  startTime,
  endTime,
  isLiked,
  pageId,
}: LikesPostProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => postLikes(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LikesList", pageId, postType] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        openToast("error", error.response.data.error.message);
      }
    },
  });

  return (
    <Link href={postType === "TAKER" ? `${ROUTE.HELP_ME}/${id}` : `${ROUTE.HELP_YOU}/${id}`} className={cn("Box")}>
      <div className={cn("leftBox")}>
        <div className={cn("titleBox")}>
          <span className={cn("postTypeLabel", { giverType: postType === "GIVER" })}>{`${
            postType === "TAKER" ? "도와줄래요?" : "도와줄게요!"
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
      <button
        onClick={(e) => {
          e.preventDefault();
          mutate();
        }}
        className={cn("heartBtn")}
      >
        <PinkHeart width={32} height={32} />
      </button>
    </Link>
  );
}

import { MouseEvent } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames/bind";

import Link from "next/link";

import styles from "@/components/common/Post/Post.module.scss";
import { ROUTE } from "@/constants/route";
import Calendar from "@/icons/calendar.svg";
import Clock from "@/icons/clock.svg";
import Heart from "@/icons/heart.svg";
import Location from "@/icons/location.svg";
import RedHeart from "@/icons/red_heart.svg";
import { PostType } from "@/types/post";
import { formatDateString } from "@/utils";

import postLikes from "./apis/postLikes";
import PostLabel from "./PostLabel/PostLabel";
import openToast from "../Toast/features/openToast";

const cn = classNames.bind(styles);

interface PostProps {
  data: PostType;
}

interface ErrorResponse {
  error: {
    message: string;
  };
}

export default function Post({ data }: PostProps) {
  const queryClient = useQueryClient();

  const {
    assistance: { assistanceEndTime, assistanceStartTime, assistanceType },
    disabilityType,
    district,
    id,
    isLiked,
    postStatus,
    postType,
    schedule: { endDate, scheduleType, startDate },
    title,
  } = data;

  const { mutate } = useMutation({
    mutationFn: () => postLikes(id),
    onMutate: async () => {
      if (localStorage.getItem("accessToken")) {
        await queryClient.cancelQueries({ queryKey: ["takerPost"] });

        const previousTodos = queryClient.getQueryData(["takerPost"]);

        queryClient.setQueryData(["takerPost"], (postList: PostType[]) =>
          postList.map((item) => {
            if (item.id === id) {
              return { ...item, isLiked: !item.isLiked };
            }
            return item;
          }),
        );
        return { previousTodos };
      }
    },
    onError: (error: AxiosError<ErrorResponse>, newTodo, context) => {
      queryClient.setQueryData(["takerPost"], context?.previousTodos);
      if (error.response?.status === 401) {
        openToast("warn", "로그인이 필요한 서비스입니다.");
      } else {
        openToast("warn", "에러가 발생하였습니다.");
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["takerPost"] });
    },
  });

  const handleHeartClick = (event: MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
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
        {isLiked ? (
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
                <p className={cn("clock")}>{`${scheduleType}, ${assistanceStartTime} ~ ${assistanceEndTime}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className={cn("postId")}>{id}</p>
      <div className={cn("postLabelBox")}>
        <PostLabel text={assistanceType} />
        {disabilityType !== "없음" && <PostLabel text={disabilityType} />}
      </div>
    </Link>
  );
}

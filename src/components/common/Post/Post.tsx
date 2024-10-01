import { MouseEvent, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Link from "next/link";

import styles from "@/components/common/Post/Post.module.scss";
import PostData from "@/components/page-layout/HomeLayout/types";
import { ROUTE } from "@/constants/route";
import Heart from "@/icons/heart.svg";
import RedHeart from "@/icons/red_heart.svg";
import { formatDateString } from "@/utils";

import postLikes from "./apis/postLikes";

const cn = classNames.bind(styles);

interface PostProps {
  data: PostData;
}

export default function Post({ data }: PostProps) {
  const {
    postType,
    title,
    author,
    assistanceType,
    district,
    startTime,
    endTime,
    scheduleType,
    id,
    postStatus,
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
      <p className={cn("postId")}>{id}</p>
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
          <div className={cn("Box")}>
            <p className={cn("title")}>{title}</p>
            <p className={cn("hr")} />
            <div className={cn("detailBox")}>
              <p>{`일시 | ${formatDateString(startTime)} ~ ${formatDateString(endTime)}`}</p>
              <p>{`활동 | ${scheduleType}`}</p>
              <p>{`장소 | ${district}`}</p>
            </div>
          </div>
          <div className={cn("hashtagBox")}>
            <p>{`# ${assistanceType}`}</p>
            {author?.disabilityType && <p>{`# ${author?.disabilityType}`}</p>}
          </div>
        </div>
      </div>
    </Link>
  );
}

import { useState } from "react";

import classNames from "classnames/bind";

import Link from "next/link";

import styles from "@/components/common/Post/Post.module.scss";
import { ROUTE } from "@/constants/route";
import Heart from "@/icons/heart.svg";
import RedHeart from "@/icons/red_haert.svg";

const cn = classNames.bind(styles);

interface PostProps {
  data: {
    title: string;
    disabilityType: string;
    assistanceType: string;
    district: string;
    startTime: string;
    endTime: string;
    scheduleType: string;
    postId: number;
    postType: string;
  };
}

export default function Post({ data }: PostProps) {
  const [isHeartClick, setIsHeartClick] = useState(false);
  const { postType, title, disabilityType, assistanceType, district, startTime, endTime, scheduleType, postId } = data;

  const handleHeartClick = () => {
    setIsHeartClick((prev) => !prev);
  };

  return (
    <Link
      href={postType === "taker" ? `${ROUTE.HELP_ME}/${postId}` : `${ROUTE.GIVER}/${postId}`}
      className={cn("cardContainer", {
        taker: postType === "taker",
        giver: postType === "giver",
      })}
    >
      <div className={cn("contentContainer")}>
        <p
          className={cn("progress", {
            taker: postType === "taker",
            giver: postType === "giver",
          })}
        >
          매칭중
        </p>
        <Heart width={32} height={32} className={cn("heart")} />
        <p className={cn("order")}>{postId}</p>
        <div className={cn("contentBox")}>
          <div className={cn("Box")}>
            <p className={cn("title")}>{title}</p>
            <p className={cn("hr")} />
            <div className={cn("detailBox")}>
              <p>{`일시 | ${startTime} ~ ${endTime}`}</p>
              <p>{`활동 | ${scheduleType}`}</p>
              <p>{`장소 | ${district}`}</p>
            </div>
          </div>
          <div className={cn("hashtagBox")}>
            <p>{`# ${assistanceType}`}</p>
            <p>{`# ${disabilityType}`}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

import { useState } from "react";

import classNames from "classnames/bind";

import Link from "next/link";

import styles from "@/components/common/Post/Post.module.scss";
import PostData from "@/components/page-layout/HomeLayout/types";
import { ROUTE } from "@/constants/route";
import Heart from "@/icons/heart.svg";
import RedHeart from "@/icons/red_haert.svg";

const cn = classNames.bind(styles);

interface PostProps {
  data: PostData;
}

function formatDateString(dateString: string) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

export default function Post({ data }: PostProps) {
  const [isHeartClick, setIsHeartClick] = useState(false);
  const { postType, title, author, assistanceType, district, startTime, endTime, scheduleType, id } = data;

  const handleHeartClick = () => {
    setIsHeartClick((prev) => !prev);
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
          매칭중
        </p>
        <Heart width={32} height={32} className={cn("heart")} />
        <p className={cn("order")}>{id}</p>
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
            <p>{`# ${author?.disabilityType}`}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

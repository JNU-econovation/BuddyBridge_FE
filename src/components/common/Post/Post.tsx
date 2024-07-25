import { useState } from "react";

import classNames from "classnames/bind";

import Link from "next/link";

import styles from "@/components/common/Post/Post.module.scss";
import PostData from "@/components/page-layout/HomeLayout/types";
import { ROUTE } from "@/constants/route";
import Heart from "@/icons/heart.svg";
import RedHeart from "@/icons/red_haert.svg";
import { formatDateString } from "@/utils";

const cn = classNames.bind(styles);

interface PostProps {
  data: PostData;
}

export default function Post({ data }: PostProps) {
  const [isHeartClick, setIsHeartClick] = useState(false);
  const { postType, title, author, assistanceType, district, startTime, endTime, scheduleType, id, postStatus } = data;

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
          {postStatus === "RECRUITING" ? "매칭중" : "매칭완료"}
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
            {author?.disabilityType && <p>{`# ${author?.disabilityType}`}</p>}
          </div>
        </div>
      </div>
    </Link>
  );
}

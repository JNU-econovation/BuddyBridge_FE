import classNames from "classnames/bind";

import Link from "next/link";

import { ROUTE } from "@/constants/route";
import Calendar from "@/icons/calendar.svg";
import Clock from "@/icons/clock.svg";
import Location from "@/icons/location.svg";
import { PostType } from "@/types/post";
import { formatDateString } from "@/utils";

import styles from "./MyWritePost.module.scss";
import PostStatusLabel from "../PostStatusLabel/PostStatusLabel";

const cn = classNames.bind(styles);

export interface MyWritePostProps {
  post: PostType;
}

export default function MyWritePost({ post }: MyWritePostProps) {
  const {
    assistance: { assistanceType },
    disabilityType,
    id,
    postStatus,
    postType,
    district,
    schedule: { endDate, startDate },
    assistance: { assistanceStartTime: startTime, assistanceEndTime: endTime},
    title,
  } = post;

  return (
    <Link href={`${postType === "TAKER" ? ROUTE.HELP_ME : ROUTE.HELP_YOU}/${id}`} className={cn("container")}>
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
      <div className={cn("postTagBox")}>
        <div className={cn("postTag")}>{disabilityType}</div>
        <div className={cn("postTag")}>{assistanceType}도움</div>
      </div>
    </Link>
  );
}

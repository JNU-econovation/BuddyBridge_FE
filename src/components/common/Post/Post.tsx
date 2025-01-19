import classNames from "classnames/bind";

import Link from "next/link";

import styles from "@/components/common/Post/Post.module.scss";
import { ROUTE } from "@/constants/route";
import Calendar from "@/icons/calendar.svg";
import Clock from "@/icons/clock.svg";
import Location from "@/icons/location.svg";
import { PostType } from "@/types/post";
import { formatDateString } from "@/utils";

import PostLabel from "./PostLabel/PostLabel";

const cn = classNames.bind(styles);

interface PostProps {
  data: PostType;
  children?: React.ReactNode;
}

export function Post({ data, children }: PostProps) {
  const {
    assistance: { assistanceEndTime, assistanceStartTime, assistanceType },
    disabilityType,
    district,
    id,
    postStatus,
    postType,
    schedule: { endDate, scheduleType, startDate },
    title,
  } = data;

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
          {postStatus === "RECRUITING" ? "모집중" : "모집완료"}
        </p>
        {children}
        <div className={cn("contentBox")}>
          <div className={cn("box")}>
            <p className={cn("title")}>{title}</p>
            <div className={cn("hr")} />
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

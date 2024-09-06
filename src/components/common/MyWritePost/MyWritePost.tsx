import classNames from "classnames/bind";

import { formatDateString } from "@/utils";

import styles from "./MyWritePost.module.scss";

const cn = classNames.bind(styles);

export interface MyWritePostProps {
  post: {
    id: number;
    title: string;
    postStatus: string;
    startTime: string;
    endTime: string;
    postType: string;
    assistanceType: string;
    disabilityType: string;
  };
}

export default function MyWritePost({ post }: MyWritePostProps) {
  const { assistanceType, disabilityType, endTime, id, postStatus, postType, startTime, title } = post;
  const postTypeKr = postType === "TAKER" ? "도와줄래요?" : "도와줄게요!";
  const postStatusKr = postStatus === "RECRUITING" ? "매칭중" : "매칭완료";

  return (
    <div className={cn("container")}>
      <div className={cn("leftBox")}>
        <div className={cn("titleBox")}>
          <p className={cn("title")}>{title}</p>
          <p
            className={cn("postStatus", {
              matching: postStatus === "RECRUITING",
              matched: postStatus === "FINISHED",
            })}
          >
            [{postStatusKr}]
          </p>
        </div>
        <p className={cn("date")}>
          일시 | {formatDateString(startTime)} ~ {formatDateString(endTime)}
        </p>
      </div>
      <div className={cn("rightBox")}>
        <p className={cn("postType")}>{`${postTypeKr} ${id}`}</p>
        <p className={cn("type")}>
          {`#${assistanceType}`}
          {disabilityType ? ` #${disabilityType}` : ""}
        </p>
      </div>
    </div>
  );
}

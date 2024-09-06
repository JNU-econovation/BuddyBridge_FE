import classNames from "classnames/bind";

import { formatAllDateExpectSecondsString } from "@/utils";

import styles from "./MyWriteComment.module.scss";

const cn = classNames.bind(styles);

export interface MyWriteCommentProps {
  comment: {
    content: string;
    commentId: number;
    postId: number;
    postTitle: string;
    postStatus: string;
    postType: string;
    disabilityType: string | null;
    assistanceType: string;
    postCreatedAt: string;
  };
}

export default function MyWriteComment({ comment }: MyWriteCommentProps) {
  const { assistanceType, disabilityType, content, postCreatedAt, postId, postStatus, postTitle, postType } = comment;
  const postTypeKr = postType === "TAKER" ? "도와줄래요?" : "도와줄게요!";
  const postStatusKr = postStatus === "RECRUITING" ? "매칭중" : "매칭완료";

  return (
    <div className={cn("container")}>
      <div className={cn("leftBox")}>
        <div className={cn("titleBox")}>
          <p className={cn("title")}>{content}</p>
          <p
            className={cn("postStatus", {
              matching: postStatus === "RECRUITING",
              matched: postStatus === "FINISHED",
            })}
          >
            [{postStatusKr}]
          </p>
        </div>
        <div className={cn("dateBox")}>
          <p className={cn("postTitle")}>{postTitle}</p>
          <p className={cn("date")}>{formatAllDateExpectSecondsString(postCreatedAt)}</p>
        </div>
      </div>
      <div className={cn("rightBox")}>
        <p className={cn("postType")}>{`${postTypeKr} ${postId}`}</p>
        <p className={cn("type")}>
          {`#${assistanceType}`}
          {disabilityType ? ` #${disabilityType}` : ""}
        </p>
      </div>
    </div>
  );
}

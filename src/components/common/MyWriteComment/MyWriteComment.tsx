import classNames from "classnames/bind";

import Link from "next/link";

import { ROUTE } from "@/constants/route";
import { CommentType } from "@/types/comment";
import { formatAllDateExpectSecondsString } from "@/utils";

import styles from "./MyWriteComment.module.scss";

const cn = classNames.bind(styles);

export interface MyWriteCommentProps {
  comment: CommentType;
}

export default function MyWriteComment({ comment }: MyWriteCommentProps) {
  const { assistanceType, content, postCreatedAt, postId, postStatus, postTitle, postType } = comment;
  
  return (
    <Link href={`${postType === "TAKER" ? ROUTE.HELP_ME : ROUTE.HELP_YOU}/${postId}`} className={cn("container")}>
      <div className={cn("leftBox")}>
        <div className={cn("titleBox")}>
          <p className={cn("titleText")}>{content}</p>
        </div>
        <div className={cn("detailBox")}>
          <span className={cn("postTypeLabel",{giverType:postType==="GIVER"})}>
            {`${postType === "TAKER" ? "도와줄래요?": "도와줄게요"} ${postId}`}
          </span>
          <p className={cn("postTitle")}>{postTitle}</p>
          <p className={cn("date")}>{formatAllDateExpectSecondsString(postCreatedAt)}</p>
        </div>
      </div>
      <div className={cn("postTagBox")}>
        <div className={cn("postTag")}>{assistanceType}도움</div>
      </div>
    </Link>
  );
}

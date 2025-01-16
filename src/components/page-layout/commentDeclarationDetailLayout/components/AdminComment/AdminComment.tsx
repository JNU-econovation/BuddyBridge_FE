import classNames from "classnames/bind";

import Image from "next/image";

import styles from "@/components/page-layout/commentDeclarationDetailLayout/components/AdminComment/AdminComment.module.scss";
import { formatAllDateExpectSecondsString, formatDateString, formatHourMinute } from "@/utils";

const cn = classNames.bind(styles);

interface AdminCommentProps {
  comment: {
    author: {
      age: number;
      gender: string;
      memberId: number;
      nickname: string;
      profileImg: string;
    };
    commentId: number;
    content: string;
    createdAt: Date;
    modifiedAt: null | Date;
    postId: number;
  };
}

export default function AdminComment({ comment }: AdminCommentProps) {
  return (
    <div className={cn("container")}>
      <Image src={comment.author.profileImg} className={cn("img")} alt="프로필 이미지" width={40} height={40} />
      <div className={cn("contentContainer")}>
        <div className={cn("titleBox")}>
          <p className={cn("nickname")}>{comment.author.nickname}</p>
          <p className={cn("date")}>{`${formatAllDateExpectSecondsString(comment.createdAt)}`}</p>
        </div>
        <p className={cn("content")}>{comment.content}</p>
      </div>
    </div>
  );
}

import classNames from "classnames/bind";

import styles from "./MyWriteList.module.scss";
import MyWriteComment, { MyWriteCommentProps } from "../../MyWriteComment/MyWriteComment";
import MyWritePost, { MyWritePostProps } from "../../MyWritePost/MyWritePost";
import { MyWriteListBoxProps } from "../MyWriteListBox";

const cn = classNames.bind(styles);

export default function MyWriteList({ postData, commentData, filter }: MyWriteListBoxProps) {
  return (
    <div className={cn("WriteBox")}>
      {filter === "게시물" &&
        postData?.content?.map((post: MyWritePostProps["post"]) => <MyWritePost key={post.id} post={post} />)}
      {filter === "댓글" &&
        commentData?.content?.map((comment: MyWriteCommentProps["comment"]) => (
          <MyWriteComment key={comment.commentId} comment={comment} />
        ))}
    </div>
  );
}

import classNames from "classnames/bind";

import { PostType } from "@/types/post";

import styles from "./MyWriteList.module.scss";
import MyWriteComment, { MyWriteCommentProps } from "../../MyWriteComment/MyWriteComment";
import MyWritePost, { MyWritePostProps } from "../../MyWritePost/MyWritePost";
import { MyWriteListBoxProps } from "../MyWriteListBox";

const cn = classNames.bind(styles);

interface MyWriteListProps extends Pick<MyWriteListBoxProps, "postData" | "commentData" | "filter"> {}

export default function MyWriteList({ postData, commentData, filter }: MyWriteListProps) {
  return (
    <div className={cn("WriteBox")}>
      {filter === "게시물" && postData.content.map((post: PostType) => <MyWritePost key={post.id} post={post} />)}
      {filter === "댓글" &&
        commentData?.content?.map((comment: MyWriteCommentProps["comment"]) => (
          <MyWriteComment key={comment.commentId} comment={comment} />
        ))}
    </div>
  );
}

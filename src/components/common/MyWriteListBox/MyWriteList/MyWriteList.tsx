import classNames from "classnames/bind";

import { CommentType } from "@/types/comment";
import { PostType } from "@/types/post";

import styles from "./MyWriteList.module.scss";
import MyWriteComment, { MyWriteCommentProps } from "../../MyWriteComment/MyWriteComment";
import MyWritePost, { MyWritePostProps } from "../../MyWritePost/MyWritePost";
import { MyWriteListBoxProps } from "../MyWriteListBox";

const cn = classNames.bind(styles);

interface MyWriteListProps
  extends Pick<
    MyWriteListBoxProps,
    "deleteMode" | "selectedContents" | "setSelectedContents" | "postData" | "commentData" | "filter"
  > {}

export default function MyWriteList({
  deleteMode,
  selectedContents,
  setSelectedContents,
  postData,
  commentData,
  filter,
}: MyWriteListProps) {
  const handleSelectContent = (id: number) => {
    setSelectedContents((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <div className={cn("WriteBox")}>
      {filter === "post" &&
        postData?.content?.map((post: PostType) => (
          <div key={post.id} className={cn("contentBox")}>
            {deleteMode && (
              <label className={cn("checkbox")}>
                <input
                  type="checkbox"
                  checked={selectedContents.includes(post.id)}
                  onChange={() => handleSelectContent(post.id)}
                  className={cn("hiddenCheckbox")}
                />
                <span className={cn("displayCheckbox")}></span>
              </label>
            )}
            <MyWritePost key={post.id} post={post} />
          </div>
        ))}
      {filter === "comment" &&
        commentData?.content?.map((comment: CommentType) => (
          <div key={comment.commentId} className={cn("contentBox")}>
            {deleteMode && (
              <label className={cn("checkbox")}>
                <input
                  type="checkbox"
                  checked={selectedContents.includes(comment.commentId)}
                  onChange={() => handleSelectContent(comment.commentId)}
                  className={cn("hiddenCheckbox")}
                />
                <span className={cn("displayCheckbox")}></span>
              </label>
            )}
            <MyWriteComment key={comment.commentId} comment={comment} />
          </div>
        ))}
    </div>
  );
}

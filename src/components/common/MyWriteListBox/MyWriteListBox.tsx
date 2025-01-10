import classNames from "classnames/bind";

import { CommentType } from "@/types/comment";
import { MyWritePostResponse } from "@/types/post";

import MyWriteList from "./MyWriteList/MyWriteList";
import styles from "./MyWriteListBox.module.scss";
import PaginationBox from "./PaginationBox/PaginationBox";
import SelectFilter from "./SelectFilter/SelectFilter";

const cn = classNames.bind(styles);

export interface MyWriteListBoxProps {
  postData: MyWritePostResponse["data"];
  commentData: {
    totalElements: number;
    last: boolean;
    content: CommentType[];
  };
  filter: string;
  pageId: string;
  postType: string;
}

export default function MyWriteListBox({ postData, commentData, filter, pageId, postType }: MyWriteListBoxProps) {
  return (
    <>
      <div className={cn("myWritePostBox")}>
        <SelectFilter postType={postType} filter={filter} pageId={pageId} />
        <MyWriteList commentData={commentData} postData={postData} filter={filter} />
      </div>
      <PaginationBox
        postType={postType}
        commentData={commentData}
        filter={filter}
        pageId={pageId}
        postData={postData}
      />
    </>
  );
}

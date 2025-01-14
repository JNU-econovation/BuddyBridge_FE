import classNames from "classnames/bind";

import { CommentType } from "@/types/comment";
import { MyWritePostResponse } from "@/types/post";

import MyWriteList from "./MyWriteList/MyWriteList";
import styles from "./MyWriteListBox.module.scss";
import PaginationBox from "./PaginationBox/PaginationBox";

const cn = classNames.bind(styles);

export interface MyWriteListBoxProps {
  deleteMode: boolean;
  selectedContents: number[];
  setSelectedContents: React.Dispatch<React.SetStateAction<number[]>>;
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

export default function MyWriteListBox({
  deleteMode,
  selectedContents,
  setSelectedContents,
  postData,
  commentData,
  filter,
  pageId,
  postType,
}: MyWriteListBoxProps) {
  return (
    <>
      <div className={cn("myWritePostBox")}>
        <MyWriteList
          deleteMode={deleteMode}
          selectedContents={selectedContents}
          setSelectedContents={setSelectedContents}
          commentData={commentData}
          postData={postData}
          filter={filter}
        />
      </div>
      <div className={cn("paginationBox")}>
        <PaginationBox
          postType={postType}
          commentData={commentData}
          filter={filter}
          pageId={pageId}
          postData={postData}
        />
      </div>
    </>
  );
}

import classNames from "classnames/bind";

import MyWriteList from "./MyWriteList/MyWriteList";
import styles from "./MyWriteListBox.module.scss";
import PaginationBox from "./PaginationBox/PaginationBox";
import SelectFilter from "./SelectFilter/SelectFilter";
import { MyWriteCommentProps } from "../MyWriteComment/MyWriteComment";
import { MyWritePostProps } from "../MyWritePost/MyWritePost";

const cn = classNames.bind(styles);

export interface MyWriteListBoxProps {
  postData: {
    totalElements: number;
    last: false;
    content: MyWritePostProps["post"][];
  };
  commentData: {
    totalElements: number;
    last: false;
    content: MyWriteCommentProps["comment"][];
  };
  filter: string;
  pageId: string;
}

export default function MyWriteListBox({ postData, commentData, filter, pageId }: MyWriteListBoxProps) {
  return (
    <>
      <div className={cn("myWritePostBox")}>
        <SelectFilter postType="taker" filter={filter} pageId={pageId} />
        <MyWriteList commentData={commentData} postData={postData} filter={filter} pageId={pageId} />
      </div>
      <PaginationBox postType="taker" commentData={commentData} filter={filter} pageId={pageId} postData={postData} />
    </>
  );
}

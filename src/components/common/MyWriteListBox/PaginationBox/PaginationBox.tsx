import classNames from "classnames/bind";

import { useRouter } from "next/router";

import { CommentType } from "@/types/comment";
import { MyWritePostResponse } from "@/types/post";

import styles from "./PaginationBox.module.scss";
import Pagination from "../../Pagenation/Pagenation";
//import { MyWriteListBoxProps } from "../MyWriteListBox";

const cn = classNames.bind(styles);

interface PaginationBoxProps {
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

export default function PaginationBox({ postData, commentData, filter, pageId, postType }: PaginationBoxProps) {
  const router = useRouter();
  const params = new URLSearchParams(router.query as any);

  const setPage = (newPage: number) => {
    const pathName = router.pathname;
    params.set("pageId", newPage.toString());
    router.replace({
      pathname: pathName,
      query: { ...Object.fromEntries(params.entries()) },
    });
  };

  return (
    <div className={cn("paginationBox")}>
      {filter === "post" && (
        <Pagination
          type={postType}
          currentPage={Number(pageId)}
          itemsPerPage={4}
          totalItems={postData?.totalElements}
          setPage={setPage}
        />
      )}
      {filter === "comment" && (
        <Pagination
          type={postType}
          currentPage={Number(pageId)}
          itemsPerPage={4}
          totalItems={commentData?.totalElements}
          setPage={setPage}
        />
      )}
    </div>
  );
}

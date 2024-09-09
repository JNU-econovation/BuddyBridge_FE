import classNames from "classnames/bind";

import { useRouter } from "next/router";

import styles from "./PaginationBox.module.scss";
import Pagination from "../../Pagenation/Pagenation";
import { MyWriteListBoxProps } from "../MyWriteListBox";

const cn = classNames.bind(styles);

interface PaginationBoxProps extends MyWriteListBoxProps {
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
      {filter === "게시물" && (
        <Pagination
          type={postType}
          currentPage={Number(pageId)}
          itemsPerPage={4}
          totalItems={postData?.totalElements}
          setPage={setPage}
        />
      )}
      {filter === "댓글" && (
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

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import Pagination from "@/components/common/Pagenation/Pagenation";

import styles from "./MyLikesListBox.module.scss";
import getMyLikes from "../../apis/getMyLikes";
import MyLikesList from "../MyLikesList/MyLikesList";
import PostTypeFilter, { PostTypeFilterProps } from "../PostTypeFilter/PostTypeFilter";

const cn = classNames.bind(styles);

export default function MyLikesListBox() {
  const router = useRouter();
  const postType = (router.query.postType as PostTypeFilterProps["postType"]) || "TAKER";
  const pageId = router.query.pageId || "1";
  const params = new URLSearchParams(router.query as any);

  const { data: likesList } = useQuery({
    queryKey: ["LikesList", pageId, postType],
    queryFn: () => getMyLikes(`${pageId}`, postType),
    enabled: !!postType,
  });

  const setPage = (newPage: number) => {
    const pathName = router.pathname;
    params.set("pageId", newPage.toString());
    router.replace({
      pathname: pathName,
      query: { ...Object.fromEntries(params.entries()) },
    });
  };

  return (
    <>
      <div className={cn("myLikesListBox")}>
        <PostTypeFilter pageId={`${pageId}`} postType={`${postType}`} />
        <MyLikesList likesList={likesList?.content} />
      </div>
      <div className={cn("paginationBox")}>
        <Pagination
          type={postType}
          currentPage={Number(pageId)}
          itemsPerPage={4}
          totalItems={Number(likesList?.totalElements)}
          setPage={setPage}
        />
      </div>
    </>
  );
}

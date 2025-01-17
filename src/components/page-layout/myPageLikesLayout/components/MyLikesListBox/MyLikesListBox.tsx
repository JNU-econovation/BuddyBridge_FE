import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import Pagination from "@/components/common/Pagenation/Pagenation";
import { ROUTE } from "@/constants/route";

import styles from "./MyLikesListBox.module.scss";
import getMyLikes from "../../apis/getMyLikes";
import MyLikesList from "../MyLikesList/MyLikesList";
import PostTypeFilter, { PostTypeFilterProps } from "../PostTypeFilter/PostTypeFilter";

const cn = classNames.bind(styles);

export default function MyLikesListBox() {
  const router = useRouter();
  const postType = (router.query.postType as PostTypeFilterProps["postType"]) || "TAKER";
  const pageId = Number(router.query.pageId) || 1;
  const params = new URLSearchParams(router.query as any);

  const {
    data: likesList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["LikesList", pageId, postType],
    queryFn: () => getMyLikes(pageId - 1, postType),
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

  if (isLoading || !likesList) return <div>로딩...</div>;

  if (isError) return <div>에러...</div>;

  return (
    <div className={cn("myPageLikesList")}>
      <PostTypeFilter queryKey="Likes" route={ROUTE.MY_PAGE_Likes} pageId={`${pageId}`} postType={`${postType}`} />
      <div className={cn("myLikesListBox")}>
        <MyLikesList likesList={likesList.content} />
        <div className={cn("paginationBox")}>
          <Pagination
            currentPage={Number(pageId)}
            itemsPerPage={4}
            totalItems={Number(likesList?.totalElements)}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}

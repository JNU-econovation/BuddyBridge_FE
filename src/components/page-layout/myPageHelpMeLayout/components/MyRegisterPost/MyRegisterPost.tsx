import { useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Image from "next/image";
import { useRouter } from "next/router";

import MyWriteComment, { MyWriteCommentProps } from "@/components/common/MyWriteComment/MyWriteComment";
import MyWritePost, { MyWritePostProps } from "@/components/common/MyWritePost/MyWritePost";
import Pagination from "@/components/common/Pagenation/Pagenation";
import { ROUTE } from "@/constants/route";
import useUserInfoStore from "@/stores/kakaoInnfo";

import styles from "./MyRegisterPost.module.scss";
import getMyComment from "../../apis/getMyComment";
import getMyPost from "../../apis/getMyPost";

const cn = classNames.bind(styles);

export default function MyRegisterPost() {
  const { userInfo } = useUserInfoStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const filter = router.query.state === "댓글" ? "댓글" : "게시물";
  const pageId = router.query.pageId || 1;
  const params = new URLSearchParams(router.query as any);

  const { data: postData } = useQuery({
    queryKey: ["postData", pageId],
    queryFn: () => getMyPost(pageId as string, "TAKER"),
    enabled: !!pageId && filter === "게시물",
  });

  const { data: commentData } = useQuery({
    queryKey: ["commentData", pageId],
    queryFn: () => getMyComment(pageId as string, "TAKER"),
    enabled: !!pageId && filter === "댓글",
  });

  const handlePostClick = () => {
    router.push(`${ROUTE.MY_PAGE_HELP_ME}?state=게시글`);
    queryClient.invalidateQueries({ queryKey: ["postData", pageId] });
  };

  const handleCommentClick = () => {
    router.push(`${ROUTE.MY_PAGE_HELP_ME}?state=댓글`);
    queryClient.invalidateQueries({ queryKey: ["commentData", pageId] });
  };

  const setPage = (newPage: number) => {
    const pathName = router.pathname;
    params.set("pageId", newPage.toString());
    router.replace({
      pathname: pathName,
      query: { ...Object.fromEntries(params.entries()) },
    });
  };

  return (
    <div className={cn("container")}>
      <p className={cn("title")}>내 정보</p>
      <div className={cn("myInfoContainer")}>
        <div className={cn("myInfoBox")}>
          <Image
            className={cn("profileImg")}
            width={50}
            height={50}
            src={userInfo?.profileImageUrl as string}
            alt="프로필 이미지"
          />
          <p className={cn("userName")}>
            {userInfo?.name} / {userInfo?.nickname}
          </p>
        </div>
        <div className={cn("myRegisterPostBox")}>
          <div className={cn("stateBox")}>
            <button onClick={handlePostClick} className={cn("post", { pick: filter === "게시물" })}>
              게시물
            </button>
            <button onClick={handleCommentClick} className={cn("comment", { pick: filter === "댓글" })}>
              댓글
            </button>
          </div>
          <div className={cn("WriteBox")}>
            {filter === "게시물" &&
              postData?.content?.map((post: MyWritePostProps["post"]) => <MyWritePost key={post.id} post={post} />)}
            {filter === "댓글" &&
              commentData?.content?.map((comment: MyWriteCommentProps["comment"]) => (
                <MyWriteComment key={comment.commentId} comment={comment} />
              ))}
          </div>
        </div>
        <div className={cn("paginationBox")}>
          {filter === "게시물" && (
            <Pagination
              type="taker"
              currentPage={Number(pageId)}
              itemsPerPage={4}
              totalItems={postData?.totalElements}
              setPage={setPage}
            />
          )}
          {filter === "댓글" && (
            <Pagination
              type="taker"
              currentPage={Number(pageId)}
              itemsPerPage={4}
              totalItems={commentData?.totalElements}
              setPage={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

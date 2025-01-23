import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import AdminNav from "@/components/common/AdminNav/AdminNav";
import DeclarationDetail from "@/components/common/DeclarationDetail/DeclarationDetail";
import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/commentDeclarationDetailLayout/components/commentDeclarationDetailLayout.module.scss";
import { ROUTE } from "@/constants/route";

import AdminComment from "./AdminComment/AdminComment";
import getMyInfo from "../../myPageEditLayout/apis/getMyInfo";
import PostContent from "../../postDeclarationDetailLayout/components/PostContent/PostContent";
import getCommentDetail from "../apis/getCommentDetail";

const cn = classNames.bind(styles);

export default function CommentDeclarationDetailLayout() {
  const router = useRouter();

  const { data: myInfoData, isFetching } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getMyInfo(),
  });

  const { data, isError, isPending } = useQuery({
    queryKey: ["adminComment", router.query.id],
    queryFn: () => getCommentDetail(Number(router.query.id)),
    enabled: !!router.query.id,
  });

  useEffect(() => {
    if (!myInfoData && !isFetching) {
      router.push(ROUTE.LOGIN);
      openToast("error", "로그인을 해주세요.");
    }
  }, [myInfoData, router, isFetching]);

  if (isError) {
    return <>에러</>;
  }

  if (isPending) {
    return <>...로딩중</>;
  }

  const {
    comment,
    post: { post, author },
  } = data;

  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <AdminNav />
        <div className={cn("adminContainer")}>
          <DeclarationDetail />
          <div className={cn("detailContainer")}>
            <PostContent author={author} post={post} />
            <AdminComment comment={comment} />
          </div>
        </div>
      </div>
    </div>
  );
}

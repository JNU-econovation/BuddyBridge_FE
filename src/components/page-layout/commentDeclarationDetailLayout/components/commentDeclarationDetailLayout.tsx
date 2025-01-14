import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import AdminNav from "@/components/common/AdminNav/AdminNav";
import DeclarationDetail from "@/components/common/DeclarationDetail/DeclarationDetail";
import styles from "@/components/page-layout/commentDeclarationDetailLayout/components/commentDeclarationDetailLayout.module.scss";

import AdminComment from "./AdminComment/AdminComment";
import PostContent from "../../postDeclarationDetailLayout/components/PostContent/PostContent";
import getCommentDetail from "../apis/getCommentDetail";

const cn = classNames.bind(styles);

export default function CommentDeclarationDetailLayout() {
  const router = useRouter();

  const { data, isError, isPending } = useQuery({
    queryKey: ["adminPost"],
    queryFn: () => getCommentDetail(Number(router.query.id)),
    enabled: !!router.query.id,
  });

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

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import AdminNav from "@/components/common/AdminNav/AdminNav";
import DeclarationDetail from "@/components/common/DeclarationDetail/DeclarationDetail";
import styles from "@/components/page-layout/postDeclarationDetailLayout/components/postDeclarationDetailLayout.module.scss";

import PostContent from "./PostContent/PostContent";
import getPostDetail from "../apis/getPostDetail";

const cn = classNames.bind(styles);

export default function PostDeclarationDetailLayout() {
  const router = useRouter();

  const { data, isError, isPending } = useQuery({
    queryKey: ["adminPost", router.query.id],
    queryFn: () => getPostDetail(Number(router.query.id)),
    enabled: !!router.query.id,
  });

  if (isError) {
    return <>에러</>;
  }

  if (isPending) {
    return <>...로딩중</>;
  }

  const { author, post } = data;

  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <AdminNav />
        <div className={cn("adminContainer")}>
          <DeclarationDetail />
          <PostContent author={author} post={post} />
        </div>
      </div>
    </div>
  );
}

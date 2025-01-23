import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import AdminNav from "@/components/common/AdminNav/AdminNav";
import DeclarationDetail from "@/components/common/DeclarationDetail/DeclarationDetail";
import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/postDeclarationDetailLayout/components/postDeclarationDetailLayout.module.scss";
import { ROUTE } from "@/constants/route";

import PostContent from "./PostContent/PostContent";
import getMyInfo from "../../myPageEditLayout/apis/getMyInfo";
import getPostDetail from "../apis/getPostDetail";

const cn = classNames.bind(styles);

export default function PostDeclarationDetailLayout() {
  const router = useRouter();

  const { data: myInfoData, isFetching } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getMyInfo(),
  });

  const { data, isError, isPending } = useQuery({
    queryKey: ["adminPost", router.query.id],
    queryFn: () => getPostDetail(Number(router.query.id)),
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

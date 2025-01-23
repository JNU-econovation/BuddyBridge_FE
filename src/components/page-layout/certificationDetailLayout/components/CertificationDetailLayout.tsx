import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import AdminNav from "@/components/common/AdminNav/AdminNav";
import CertificationDetail from "@/components/common/CertificationDetail/CertificationDetail";
import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/certificationDetailLayout/components/CertificationDetailLayout.module.scss";
import { ROUTE } from "@/constants/route";

import getMyInfo from "../../myPageEditLayout/apis/getMyInfo";
import PostContent from "../../postDeclarationDetailLayout/components/PostContent/PostContent";
import getCertificationDetail from "../apis/getCertificationDetail";

const cn = classNames.bind(styles);

export default function CertificationDetailLayout() {
  const router = useRouter();

  const { data: myInfoData, isFetching } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getMyInfo(),
  });

  const { data, error, isPending } = useQuery({
    queryKey: ["certificationDetail"],
    queryFn: () => getCertificationDetail(Number(router.query.id)),
    enabled: !!router.query.id,
  });

  useEffect(() => {
    if (error?.message === "접근 권한이 없습니다.") {
      openToast("error", error?.message);
      router.push(ROUTE.HOME);
    }
  }, [error, router]);

  useEffect(() => {
    if (!myInfoData && !isFetching) {
      router.push(ROUTE.LOGIN);
      openToast("error", "로그인을 해주세요.");
    }
  }, [myInfoData, router, isFetching]);

  if (isPending) return <>...로딩</>;

  const {
    post: { post, author },
    certification,
  } = data;

  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <AdminNav />
        <div className={cn("adminContainer")}>
          <CertificationDetail volunteeringDetail={certification} />
          <div className={cn("detailContainer")}>
            <PostContent author={author} post={post} />
          </div>
        </div>
      </div>
    </div>
  );
}

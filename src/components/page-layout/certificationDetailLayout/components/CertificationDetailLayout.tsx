import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import AdminNav from "@/components/common/AdminNav/AdminNav";
import CertificationDetail from "@/components/common/CertificationDetail/CertificationDetail";
import styles from "@/components/page-layout/certificationDetailLayout/components/CertificationDetailLayout.module.scss";

import PostContent from "../../postDeclarationDetailLayout/components/PostContent/PostContent";
import getCertificationDetail from "../apis/getCertificationDetail";

const cn = classNames.bind(styles);

export default function CertificationDetailLayout() {
  const router = useRouter();

  const { data, isError, isPending } = useQuery({
    queryKey: ["certificationDetail"],
    queryFn: () => getCertificationDetail(Number(router.query.id)),
    enabled: !!router.query.id,
  });

  if (isError) {
    return <>에러</>;
  }

  if (isPending) {
    return <>...로딩중</>;
  }

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

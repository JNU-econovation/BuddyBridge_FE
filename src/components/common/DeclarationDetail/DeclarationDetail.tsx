import { useEffect } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/components/common/DeclarationDetail/DeclarationDetail.module.scss";
import deleteDeclaration from "@/components/page-layout/declarationLayout/apis/deleteDeclaration";
import { ROUTE } from "@/constants/route";
import Cancel from "@/icons/cancel.svg";

import getDetailDeclaration from "./apis/getDetailDeclaration";
import openToast from "../Toast/features/openToast";

const cn = classNames.bind(styles);

export default function DeclarationDetail() {
  const router = useRouter();

  const { data, error, isPending } = useQuery({
    queryKey: ["detailDeclaration", router.query.id],
    queryFn: () => getDetailDeclaration(Number(router.query.id)),
    enabled: !!router.query.id,
  });

  const deleteDeclarationMutation = useMutation({
    mutationFn: (id: number) => deleteDeclaration(id),
    onSuccess: () => {
      router.push(ROUTE.ADMIN_DECLARATION);
      openToast("success", "삭제되었습니다.");
    },
  });

  const handleCommentDeleteClick = () => {
    deleteDeclarationMutation.mutate(Number(router.query.id));
  };

  useEffect(() => {
    if (error?.message === "접근 권한이 없습니다.") {
      openToast("error", error?.message);
      router.push(ROUTE.HOME);
    }
  }, [error, router]);

  if (isPending) return <>...로딩</>;

  return (
    <div className={cn("container")}>
      <div className={cn("headerBox")}>
        <Link href={ROUTE.ADMIN_DECLARATION}>&larr; 신고내용</Link>
        <div className={cn("headerDetailBox")}>
          <div className={cn("reporterBox")}>
            <p className={cn("reporterTitle")}>신고자</p>
            <p className={cn("boundary")}>|</p>
            <p className={cn("reporter")}>{data.reporterName}</p>
          </div>
          <div className={cn("reporterDateBox")}>
            <p className={cn("reporterDateTitle")}>신고 일시</p>
            <p className={cn("boundary")}>|</p>
            <p className={cn("reporterDate")}>{data.reportDate}</p>
          </div>
        </div>
      </div>
      <div className={cn("reportContentBox")}>
        <div className={cn("reportedBox")}>
          <p className={cn("reportedTitle")}>신고 대상자</p>
          <p className={cn("boundary")}>|</p>
          <p className={cn("reportedName")}>{data.reportedName}</p>
        </div>
        <div className={cn("postBox")}>
          <p className={cn("postTitle")}>게시글 정보</p>
          <p className={cn("boundary")}>|</p>
          <p className={cn("post")}>{data.postId}</p>
        </div>
        <div className={cn("reportedContentBox")}>
          <p className={cn("reportedContentTitle")}>신고 대상 내용</p>
          <p className={cn("boundary")}>|</p>
          <p className={cn("reportedContent")}>{data.reportedContent}</p>
        </div>
        <div className={cn("reportTypeBox")}>
          <p className={cn("reportTypeTitle")}>신고 유형</p>
          <p className={cn("reportType")}>{data.reportType}</p>
        </div>
        <div className={cn("reportReasonBox")}>
          <p className={cn("reportReasonTitle")}>신고 내용</p>
          <p className={cn("reportReason")}>{data.reportReason}</p>
        </div>
        <div className={cn("btnContainer")}>
          <div className={cn("btnBox")}>
            <button onClick={handleCommentDeleteClick} className={cn("deleteBtn")}>
              삭제하기
            </button>
            <button className={cn("blackListBtn")}>
              블랙리스트
              <Cancel />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

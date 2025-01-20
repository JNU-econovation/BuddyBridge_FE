import { useEffect, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import AdminNav from "@/components/common/AdminNav/AdminNav";
import Pagination from "@/components/common/Pagenation/Pagenation";
import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/certificationLayout/components/certificationLayout.module.scss";
import { ROUTE } from "@/constants/route";

import CertificationContent, { CertificationContentProps } from "./CertificationContent/CertificationContent";
import deleteCertification from "../apis/deleteCertification";
import getCertifications from "../apis/getCertifications";
import postCertification from "../apis/postCertification";

const cn = classNames.bind(styles);

interface CertificationErrorResponse {
  error: {
    message: string;
  };
}

export default function CertificationLayout() {
  const [checkId, setCheckId] = useState(0);
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = new URLSearchParams(router.query as any);

  const currentPage = Number(params.get("page")) || 0;

  const { data, error, isPending } = useQuery({
    queryKey: ["certification", currentPage > 0 ? currentPage : 1],
    queryFn: () => getCertifications(currentPage, 6),
    enabled: currentPage >= 0,
  });

  const deleteCertificationMutation = useMutation({
    mutationFn: (id: number) => deleteCertification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certification", currentPage > 0 ? currentPage : 1] });
      openToast("success", "삭제되었습니다.");
    },
  });

  const postCertificationMutation = useMutation({
    mutationFn: (id: number) => postCertification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certification", currentPage > 0 ? currentPage : 1] });
      openToast("success", "봉사 시간 부여가 완료되었습니다.");
      setCheckId(0);
    },
    onError: (error: AxiosError<CertificationErrorResponse>) => {
      if (error.response) {
        openToast("error", error.response.data.error.message);
      }
    },
  });

  useEffect(() => {
    if (error?.message === "접근 권한이 없습니다.") {
      openToast("error", error?.message);
      router.push(ROUTE.HOME);
    }
  }, [error, router]);

  if (isPending) return <>...로딩</>;

  const handleCertificationDeleteClick = () => {
    deleteCertificationMutation.mutate(checkId);
  };

  const handleCertificationPostClick = () => {
    postCertificationMutation.mutate(checkId);
  };

  const setPage = (newPage: number) => {
    const pathName = router.pathname;
    params.set("page", newPage.toString());
    router.replace({
      pathname: pathName,
      query: { ...Object.fromEntries(params.entries()) },
    });
    queryClient.invalidateQueries({ queryKey: ["certification", currentPage > 0 ? currentPage : 1] });
  };

  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <AdminNav />
        <div className={cn("adminContainer")}>
          <p className={cn("adminTitle")}>봉사 인증 관리</p>
          <div className={cn("tableContainer")}>
            <div className={cn("tableHeader")}>
              <div className={cn("btnContainer")}>
                <button className={cn("deleteBtn")} onClick={() => handleCertificationDeleteClick()}>
                  삭제하기
                </button>
                <button className={cn("grantVolunteer")} onClick={() => handleCertificationPostClick()}>
                  봉사 시간 부여
                </button>
              </div>
            </div>
            <div className={cn("tableBox")}>
              <div className={cn("tableTitle")}>
                <div className={cn("blank")} />
                <p className={cn("volunteer")}>봉사자</p>
                <p className={cn("volunteerPostInfo")}>봉사 게시글 정보</p>
                <p className={cn("volunteerEmail")}>봉사자 메일</p>
                <p className={cn("volunteerGrant")}>봉사 시간 부여 여부</p>
                <p className={cn("writeDate")}>작성일</p>
              </div>
              <ul className={cn("tableContentList")}>
                {data?.content.map((item: CertificationContentProps) => (
                  <CertificationContent
                    key={item.certificationId}
                    certificationId={item.certificationId}
                    postId={item.postId}
                    volunteerEmail={item.volunteerEmail}
                    certificationCreatedDate={item.certificationCreatedDate}
                    isCertified={item.isCertified}
                    volunteerName={item.volunteerName}
                    reporter={item.reporter}
                    postType={item.postType}
                    checkId={checkId}
                    setCheckId={setCheckId}
                    isBlackListed={item.isBlackListed}
                  />
                ))}
              </ul>
            </div>
            <div className={cn("paginationBox")}>
              <Pagination
                currentPage={currentPage > 0 ? currentPage : 1}
                itemsPerPage={6}
                totalItems={data?.totalElements}
                setPage={setPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

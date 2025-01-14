import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import AdminNav from "@/components/common/AdminNav/AdminNav";
import Pagination from "@/components/common/Pagenation/Pagenation";
import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/certificationLayout/components/certificationLayout.module.scss";

import CertificationContent, { CertificationContentProps } from "./CertificationContent/CertificationContent";

const cn = classNames.bind(styles);

export default function CertificationLayout() {
  const [checkId, setCheckId] = useState(0);
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = new URLSearchParams(router.query as any);

  const currentPage = Number(params.get("page")) || 0;

  // const { data } = useQuery({
  //   queryKey: ["declaration", type, currentPage > 0 ? currentPage : 1],
  //   queryFn: () => getDeclaration(type, currentPage, 5),
  //   enabled: currentPage >= 0,
  // });

  // const deleteDeclarationMutation = useMutation({
  //   mutationFn: (id: number) => deleteDeclaration(id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["declaration", type, currentPage > 0 ? currentPage : 1] });
  //     openToast("success", "삭제되었습니다.");
  //   },
  // });

  // const handleCommentDeleteClick = () => {
  //   deleteDeclarationMutation.mutate(checkId);
  // };

  const data = {
    content: [
      {
        id: 3,
        postId: 9,
        reportContent: "댓글 - ㅎㅇ",
        reportDate: new Date("2025-01-01"),
        reportType: "Done",
        reported: "심민보",
        reporter: "ss",
        checkId: 1,
        setCheckId: (id: number) => {},
      },
    ],
    totalElements: 1,
  };

  const setPage = (newPage: number) => {
    const pathName = router.pathname;
    params.set("page", newPage.toString());
    router.replace({
      pathname: pathName,
      query: { ...Object.fromEntries(params.entries()) },
    });
    // queryClient.invalidateQueries({ queryKey: ["declaration", type, currentPage > 0 ? currentPage : 1] });
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
                <button className={cn("deleteBtn")}>삭제하기</button>
                <button className={cn("grantVolunteer")}>봉사 시간 부여</button>
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
                    key={item.id}
                    id={item.id}
                    postId={item.postId}
                    reportContent={item.reportContent}
                    reportDate={item.reportDate}
                    reportType={item.reportType}
                    reported={item.reported}
                    reporter={item.reporter}
                    checkId={checkId}
                    setCheckId={setCheckId}
                  />
                ))}
              </ul>
            </div>
            <div className={cn("paginationBox")}>
              <Pagination
                currentPage={currentPage + 1}
                itemsPerPage={7}
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

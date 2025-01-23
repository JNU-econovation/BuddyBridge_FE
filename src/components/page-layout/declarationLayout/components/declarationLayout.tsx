import { useEffect, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import AdminNav from "@/components/common/AdminNav/AdminNav";
import Pagination from "@/components/common/Pagenation/Pagenation";
import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/declarationLayout/components/declarationLayout.module.scss";
import { ROUTE } from "@/constants/route";
import Cancel from "@/icons/cancel.svg";
import { ErrorResponse } from "@/types/error";

import DeclarationContent, { DeclarationContentProps } from "./DeclarationContent/DeclarationContent";
import deleteDeclaration from "../apis/deleteDeclaration";
import getDeclaration from "../apis/getDeclaration";
import postBlackList from "../apis/postBlackList";

const cn = classNames.bind(styles);

export default function DeclarationLayout() {
  const [type, setType] = useState<"all" | "posts" | "comments" | "matchings">("all");
  const [checkId, setCheckId] = useState({
    id: 0,
    reportedId: 0,
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = new URLSearchParams(router.query as any);

  const currentPage = Number(params.get("page")) || 0;

  const { data, isPending, error } = useQuery({
    queryKey: ["declaration", type, currentPage > 0 ? currentPage : 1],
    queryFn: () => getDeclaration(type, currentPage, 6),
    enabled: currentPage >= 0,
  });

  const deleteDeclarationMutation = useMutation({
    mutationFn: (id: number) => deleteDeclaration(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["declaration", type, currentPage > 0 ? currentPage : 1] });
      openToast("success", "삭제되었습니다.");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        openToast("error", error.response.data.error.message);
      }
    },
  });

  const postBlackListMutation = useMutation({
    mutationFn: (id: number) => postBlackList(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["declaration", type, currentPage > 0 ? currentPage : 1] });
      openToast("success", "블랙리스트에 추가되었습니다.");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        openToast("error", error.response.data.error.message);
      }
    },
  });

  const handleDeleteClick = () => {
    deleteDeclarationMutation.mutate(checkId.id);
  };

  const handleBlackListClick = () => {
    postBlackListMutation.mutate(checkId.reportedId);
  };

  const setPage = (newPage: number) => {
    const pathName = router.pathname;
    params.set("page", newPage.toString());
    router.replace({
      pathname: pathName,
      query: { ...Object.fromEntries(params.entries()) },
    });
    queryClient.invalidateQueries({ queryKey: ["declaration", type, currentPage > 0 ? currentPage : 1] });
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
      <div className={cn("box")}>
        <AdminNav />
        <div className={cn("adminContainer")}>
          <p className={cn("adminTitle")}>신고 관리</p>
          <div className={cn("tableContainer")}>
            <div className={cn("tableHeader")}>
              <div className={cn("typeContainer")}>
                <button className={cn("all", { selected: type === "all" })} onClick={() => setType("all")}>
                  전체
                </button>
                <button className={cn("post", { selected: type === "posts" })} onClick={() => setType("posts")}>
                  게시글
                </button>
                <button
                  className={cn("comment", { selected: type === "comments" })}
                  onClick={() => setType("comments")}
                >
                  댓글
                </button>
                <button
                  className={cn("chattingRoom", { selected: type === "matchings" })}
                  onClick={() => setType("matchings")}
                >
                  채팅방
                </button>
              </div>
              <div className={cn("btnContainer")}>
                <button onClick={handleDeleteClick} className={cn("deleteBtn")}>
                  삭제하기
                </button>
                <button onClick={handleBlackListClick} className={cn("blackListBtn")}>
                  블랙리스트
                  <Cancel />
                </button>
              </div>
            </div>
            <div className={cn("tableBox")}>
              <div className={cn("tableTitle")}>
                <div className={cn("blank")} />
                <p className={cn("reporter")}>신고 대상자</p>
                <p className={cn("postInfo")}>게시글 정보</p>
                <p className={cn("declarationContent")}>신고 대상 내용</p>
                <p className={cn("declarationType")}>신고 유형</p>
                <p className={cn("declarationPeople")}>신고자</p>
                <p className={cn("declarationDate")}>신고일</p>
              </div>
              <ul className={cn("tableContentList")}>
                {data?.content.map((item: DeclarationContentProps) => (
                  <DeclarationContent
                    key={item.id}
                    id={item.id}
                    postId={item.postId}
                    reportContent={item.reportContent}
                    reportDate={item.reportDate}
                    reportType={item.reportType}
                    reportedName={item.reportedName}
                    reporterName={item.reporterName}
                    reportedId={item.reportedId}
                    checkId={checkId}
                    setCheckId={setCheckId}
                    isBlackListed={item.isBlackListed}
                    postType={item.postType}
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

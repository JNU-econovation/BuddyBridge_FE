import { useEffect, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames/bind";
import { ro } from "date-fns/locale";

import { useRouter } from "next/router";

import AdminNav from "@/components/common/AdminNav/AdminNav";
import Pagination from "@/components/common/Pagenation/Pagenation";
import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/userAdminLayout/components/userAdminLayout.module.scss";
import { ROUTE } from "@/constants/route";

import UserContent, { UserContentProps } from "./UserContent/UserContent";
import deleteUser from "../apis/deleteUser";
import getUsers from "../apis/getUsers";

const cn = classNames.bind(styles);

interface ErrorResponse {
  error: {
    message: string;
  };
}

export default function UserAdminLayout() {
  const [checkId, setCheckId] = useState<number[]>([]);
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = new URLSearchParams(router.query as any);

  const currentPage = Number(params.get("page")) || 1;

  const { data, isPending, error } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: () => getUsers(currentPage, 6),
    enabled: !!currentPage,
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: number[]) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", currentPage] });
      openToast("success", "삭제되었습니다.");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        openToast("error", error.response.data.error.message);
      }
    },
  });

  const handleUserDeleteClick = () => {
    deleteUserMutation.mutate(checkId);
  };

  const setPage = (newPage: number) => {
    const pathName = router.pathname;
    params.set("page", newPage.toString());
    router.replace({
      pathname: pathName,
      query: { ...Object.fromEntries(params.entries()) },
    });
    queryClient.invalidateQueries({ queryKey: ["users", currentPage] });
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
          <p className={cn("adminTitle")}>사용자 관리</p>
          <div className={cn("tableContainer")}>
            <div className={cn("tableHeader")}>
              <button className={cn("deleteBtn")} onClick={() => handleUserDeleteClick()}>
                삭제하기
              </button>
            </div>
            <div className={cn("tableBox")}>
              <div className={cn("tableTitle")}>
                <div className={cn("blank")} />
                <p className={cn("userName")}>사용자</p>
                <p className={cn("userNickname")}>닉네임</p>
                <p className={cn("gender")}>성별</p>
                <p className={cn("age")}>(만)나이</p>
                <p className={cn("disabilityType")}>장애유형</p>
                <p className={cn("email")}>메일</p>
                <p className={cn("reportedCount")}>신고 횟수</p>
              </div>
              <ul className={cn("tableContentList")}>
                {data?.content.map((item: UserContentProps) => (
                  <UserContent
                    key={item.id}
                    age={item.age}
                    disabilityType={item.disabilityType}
                    email={item.email}
                    gender={item.gender}
                    id={item.id}
                    name={item.name}
                    nickname={item.nickname}
                    reportedCount={item.reportedCount}
                    checkId={checkId}
                    setCheckId={setCheckId}
                    isBlackListed={item.isBlackListed}
                  />
                ))}
              </ul>
            </div>
            <div className={cn("paginationBox")}>
              <Pagination
                currentPage={currentPage}
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

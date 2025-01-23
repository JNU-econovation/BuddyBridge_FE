import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import AdminNav from "@/components/common/AdminNav/AdminNav";
import DeclarationDetail from "@/components/common/DeclarationDetail/DeclarationDetail";
import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/chattingRoomDeclarationDetailLayout/components/chattingRoomDeclarationDetailLayout.module.scss";
import { ROUTE } from "@/constants/route";

import ChattingRoomContent from "./ChattingRoomContent/ChattingRoomContent";
import getMyInfo from "../../myPageEditLayout/apis/getMyInfo";

const cn = classNames.bind(styles);

export default function ChattingRoomDeclarationDetailLayout() {
  const router = useRouter();

  const { data: myInfoData, isFetching } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getMyInfo(),
  });

  useEffect(() => {
    if (!myInfoData && !isFetching) {
      router.push(ROUTE.LOGIN);
      openToast("error", "로그인을 해주세요.");
    }
  }, [myInfoData, router, isFetching]);

  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <AdminNav />
        <div className={cn("adminContainer")}>
          <DeclarationDetail />
          <ChattingRoomContent />
        </div>
      </div>
    </div>
  );
}

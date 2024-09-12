import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/myPageLayout/components/myPageLayout.module.scss";
import { ROUTE } from "@/constants/route";

import MyInfo from "./MyInfo/MyInfo";
import MyPageNav from "./MyPageNav/MyPageNav";
import getMyInfo from "../../myPageEditLayout/apis/getMyInfo";

const cn = classNames.bind(styles);

export default function MyPageLayout() {
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
      <MyPageNav />
      <MyInfo />
    </div>
  );
}

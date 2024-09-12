import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/myPageEditLayout/components/myPageEditLayout.module.scss";
import MyRegisterPost from "@/components/page-layout/myPageHelpMeLayout/components/MyRegisterPost/MyRegisterPost";
import MyPageNav from "@/components/page-layout/myPageLayout/components/MyPageNav/MyPageNav";
import { ROUTE } from "@/constants/route";

import getMyInfo from "../../myPageEditLayout/apis/getMyInfo";

const cn = classNames.bind(styles);

export default function MyPageHelpYouLayout() {
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
      <MyRegisterPost postType="GIVER" />
    </div>
  );
}

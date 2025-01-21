import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import openToast from "@/components/common/Toast/features/openToast";
import MyPageNav from "@/components/page-layout/myPageLayout/components/MyPageNav/MyPageNav";
import styles from "@/components/page-layout/myPageLikesLayout/components/myPageLikesLayout.module.scss";
import { ROUTE } from "@/constants/route";

import MyLikesListBox from "./MyLikesListBox/MyLikesListBox";
import getMyInfo from "../../myPageEditLayout/apis/getMyInfo";

const cn = classNames.bind(styles);

export default function MyPageLikesLayout() {
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
      <MyLikesListBox />
    </div>
  );
}

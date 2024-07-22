import { useEffect } from "react";

import classNames from "classnames/bind";

import { useRouter } from "next/router";

import styles from "@/components/page-layout/myPageLayout/components/myPageLayout.module.scss";
import { ROUTE } from "@/constants/route";
import useUserInfoStore from "@/stores/kakaoInnfo";

import MyInfo from "./MyInfo/MyInfo";
import MyPageNav from "./MyPageNav/MyPageNav";

const cn = classNames.bind(styles);

export default function MyPageLayout() {
  const { userInfo } = useUserInfoStore();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push(ROUTE.LOGIN);
    }
  }, [userInfo, router]);

  return (
    <div className={cn("container")}>
      <MyPageNav />
      <MyInfo />
    </div>
  );
}

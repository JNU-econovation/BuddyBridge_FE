import classNames from "classnames/bind";

import { useRouter } from "next/router";

import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/myPageLayout/components/myPageLayout.module.scss";
import { ROUTE } from "@/constants/route";
import useUserInfoStore from "@/stores/kakaoInnfo";

import MyInfo from "./MyInfo/MyInfo";
import MyPageNav from "./MyPageNav/MyPageNav";

const cn = classNames.bind(styles);

export default function MyPageLayout() {
  const { userInfo } = useUserInfoStore();
  const router = useRouter();

  if (!userInfo) {
    router.push(ROUTE.LOGIN);
  }

  return (
    <div className={cn("container")}>
      <MyPageNav />
      <MyInfo />
    </div>
  );
}

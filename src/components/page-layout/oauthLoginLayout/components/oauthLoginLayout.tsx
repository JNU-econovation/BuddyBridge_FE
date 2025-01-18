import { useEffect } from "react";

import classNames from "classnames/bind";

import { useRouter } from "next/router";

import Loader from "@/components/common/Loader/Loader";
import styles from "@/components/page-layout/oauthLoginLayout/components/oauthLoginLayout.module.scss";
import { ROUTE } from "@/constants/route";

const cn = classNames.bind(styles);

export default function OauthLoginLayout() {
  const router = useRouter();

  useEffect(() => {
    const { accessToken, refreshToken } = router.query;

    if (accessToken && refreshToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.setItem("accessToken", `${accessToken}`);
      localStorage.setItem("refreshToken", `${refreshToken}`);

      router.push(ROUTE.HOME);
    }
  }, [router.query, router]);

  return (
    <div className={cn("container")}>
      <Loader />
    </div>
  );
}

import { useEffect } from "react";

import classNames from "classnames/bind";

import Banner from "@/components/page-layout/HomeLayout/components/Banner/Banner";
import styles from "@/components/page-layout/HomeLayout/components/HomeLayout.module.scss";
import PostList from "@/components/page-layout/HomeLayout/components/PostList/PostList";
import HomeProps from "@/components/page-layout/HomeLayout/types/index";
import useUserInfoStore from "@/stores/kakaoInnfo";

const cn = classNames.bind(styles);

export default function HomeLayout({ user, cookie }: HomeProps) {
  const { setUserInfo } = useUserInfoStore();

  if (cookie) {
    document.cookie = cookie;
  }

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, [user, setUserInfo]);

  return (
    <>
      <Banner />
      <PostList />
    </>
  );
}

import { useEffect } from "react";

import Banner from "@/components/page-layout/HomeLayout/components/Banner/Banner";
import PostList from "@/components/page-layout/HomeLayout/components/PostList/PostList";
import HomeProps from "@/components/page-layout/HomeLayout/types/index";
import useUserInfoStore from "@/stores/kakaoInnfo";

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

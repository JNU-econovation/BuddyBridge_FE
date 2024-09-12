import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/router";

import Banner from "@/components/page-layout/HomeLayout/components/Banner/Banner";
import PostList from "@/components/page-layout/HomeLayout/components/PostList/PostList";
import useUserInfoStore from "@/stores/kakaoInnfo";

import getKakaoInfo from "../apis/getKakaoInfo";

export default function HomeLayout() {
  const router = useRouter();
  const { code } = router.query;

  const { setUserInfo, setCode } = useUserInfoStore();

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getKakaoInfo(code as string),
    enabled: !!code,
  });

  useEffect(() => {
    if (data) {
      setUserInfo(data);
      setCode(code as string);
    }
  }, [data, code, setUserInfo, setCode]);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <Banner />
      <PostList />
    </>
  );
}

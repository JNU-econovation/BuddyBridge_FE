import { useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";

import Banner from "@/components/page-layout/HomeLayout/components/Banner/Banner";
import PostList from "@/components/page-layout/HomeLayout/components/PostList/PostList";

export default function HomeLayout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  if (router.query.accessToken && router.query.refreshToken) {
    localStorage.setItem("accessToken", `${router.query.accessToken}`);
    localStorage.setItem("refreshToken", `${router.query.refreshToken}`);
    queryClient.invalidateQueries({ queryKey: ["userLogIn"] });
    queryClient.invalidateQueries({ queryKey: ["giverPost"] });
    queryClient.invalidateQueries({ queryKey: ["takerPost"] });
  }

  return (
    <>
      <Banner />
      <PostList />
    </>
  );
}

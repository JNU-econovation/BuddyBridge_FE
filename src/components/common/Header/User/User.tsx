import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import Login from "@/components/common/Header/User/Login/Login";
import NotLogin from "@/components/common/Header/User/NotLogin/NotLogin";
import useUserInfoStore from "@/stores/kakaoInnfo";

import getLogIn from "../apis/getLogIn";

export default function User() {
  const { userInfo } = useUserInfoStore();
  let accessToken;

  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }

  const { data, isError, refetch } = useQuery({
    queryKey: ["userLogIn"],
    queryFn: () => getLogIn(),
    enabled: !!accessToken,
  });

  useEffect(() => {
    refetch();
  }, [userInfo, refetch]);

  if (!accessToken) {
    <NotLogin />;
  }

  if (isError) {
    return <NotLogin />;
  }

  return data ? <Login name={data?.nickname} /> : <NotLogin />;
}

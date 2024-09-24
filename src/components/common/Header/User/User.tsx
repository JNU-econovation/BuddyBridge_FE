import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import Login from "@/components/common/Header/User/Login/Login";
import NotLogin from "@/components/common/Header/User/NotLogin/NotLogin";
import useUserInfoStore from "@/stores/kakaoInnfo";

import getLogIn from "../apis/getLogIn";

export default function User() {
  const { userInfo } = useUserInfoStore();

  const { data, isError, refetch } = useQuery({
    queryKey: ["userLogIn"],
    queryFn: () => getLogIn(),
  });

  useEffect(() => {
    refetch();
  }, [userInfo, refetch]);

  if (isError) {
    return <NotLogin />;
  }

  return data ? <Login name={data?.nickname} /> : <NotLogin />;
}

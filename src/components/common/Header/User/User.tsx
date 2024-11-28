import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import Login from "@/components/common/Header/User/Login/Login";
import NotLogin from "@/components/common/Header/User/NotLogin/NotLogin";

import getLogIn from "../apis/getLogIn";

export default function User() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAccessToken(localStorage.getItem("accessToken"));
    }
  }, []);

  const { data, isError } = useQuery({
    queryKey: ["userLogIn"],
    queryFn: () => getLogIn(),
  });

  if (!accessToken) {
    <NotLogin />;
  }

  if (isError) {
    return <NotLogin />;
  }

  return data ? <Login name={data?.nickname} /> : <NotLogin />;
}

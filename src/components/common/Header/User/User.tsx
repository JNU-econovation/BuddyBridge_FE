import { useQuery } from "@tanstack/react-query";

import Login from "@/components/common/Header/User/Login/Login";
import NotLogin from "@/components/common/Header/User/NotLogin/NotLogin";

import getLogIn from "../apis/getLogIn";

export default function User() {
  let accessToken;

  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }

  const { data, isError } = useQuery({
    queryKey: ["userLogIn"],
    queryFn: () => getLogIn(),
    enabled: !!accessToken,
  });

  if (!accessToken) {
    <NotLogin />;
  }

  if (isError) {
    return <NotLogin />;
  }

  return data ? <Login name={data?.nickname} /> : <NotLogin />;
}

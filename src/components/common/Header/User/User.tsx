import { useQuery } from "@tanstack/react-query";

import Login from "@/components/common/Header/User/Login/Login";
import NotLogin from "@/components/common/Header/User/NotLogin/NotLogin";

import getLogIn from "../apis/getLogIn";

export default function User() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userLogIn"],
    queryFn: () => getLogIn(),
  });

  if (isLoading) {
    return <>...로딩중</>;
  }

  if (isError) {
    return <NotLogin />;
  }

  console.log(data);

  return data ? <Login name={data?.nickname} /> : <NotLogin />;
}

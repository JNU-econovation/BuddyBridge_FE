import { useQuery } from "@tanstack/react-query";

import Login from "@/components/common/Header/User/Login/Login";
import NotLogin from "@/components/common/Header/User/NotLogin/NotLogin";
import getKakaoInfo from "@/components/page-layout/HomeLayout/apis/getKakaoInfo";
import useUserInfoStore from "@/stores/kakaoInnfo";

import Loader from "../../Loader/Loader";

export default function User() {
  const { code } = useUserInfoStore();

  const { data, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: () => getKakaoInfo(code as string),
    enabled: !!code,
  });

  if (isFetching) {
    return <Loader />;
  }

  return data?.nickname ? <Login name={data.nickname} /> : <NotLogin />;
}

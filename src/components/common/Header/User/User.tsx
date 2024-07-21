import { useQuery } from "@tanstack/react-query";

import Login from "@/components/common/Header/User/Login/Login";
import NotLogin from "@/components/common/Header/User/NotLogin/NotLogin";
import getKakaoInfo from "@/components/page-layout/HomeLayout/apis/getKakaoInfo";
import useUserInfoStore from "@/stores/kakaoInnfo";

export default function User() {
  const { code } = useUserInfoStore();

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getKakaoInfo(code as string),
    enabled: !!code,
  });

  return data?.nickname ? <Login name={data.nickname} /> : <NotLogin />;
}

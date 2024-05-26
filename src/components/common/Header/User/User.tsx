import useUserInfoStore from "@/stores/kakaoInnfo";

import NotLogin from "@/components/common/Header/User/NotLogin/NotLogin";
import Login from "@/components/common/Header/User/Login/Login";

export default function User() {
  const { userInfo } = useUserInfoStore();

  return userInfo ? <Login name={userInfo.nickname} /> : <NotLogin />;
}

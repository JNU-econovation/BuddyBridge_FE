import Login from "@/components/common/Header/User/Login/Login";
import NotLogin from "@/components/common/Header/User/NotLogin/NotLogin";
import useUserInfoStore from "@/stores/kakaoInnfo";

export default function User() {
  const { userInfo } = useUserInfoStore();

  return userInfo ? <Login name={userInfo.nickname} /> : <NotLogin />;
}

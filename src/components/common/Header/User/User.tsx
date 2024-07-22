import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Login from "@/components/common/Header/User/Login/Login";
import NotLogin from "@/components/common/Header/User/NotLogin/NotLogin";
import styles from "@/components/common/Header/User/User.module.scss";
import getKakaoInfo from "@/components/page-layout/HomeLayout/apis/getKakaoInfo";
import useUserInfoStore from "@/stores/kakaoInnfo";

import Loader from "../../Loader/Loader";

const cn = classNames.bind(styles);

export default function User() {
  const { code } = useUserInfoStore();

  const { data, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: () => getKakaoInfo(code as string),
    enabled: !!code,
  });

  if (isFetching) {
    return <Loader className={cn("loaderContainer")} />;
  }

  return data?.nickname ? <Login name={data.nickname} /> : <NotLogin />;
}

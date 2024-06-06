import styles from "@/pages/login/login.module.scss";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

const cn = classNames.bind(styles);

import BuddyBridge from "@/icons/buddy_bridge.svg";
import Logo from "@/images/logo.svg";
import Kakao from "@/icons/kakao.svg";
import { ROUTE } from "@/constants/route";

export default function LoginLayout() {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_Rest_api_key}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  const router = useRouter();

  const handleLogoClick = () => {
    router.push(ROUTE.HOME);
  };

  return (
    <div className={cn("container")}>
      <div className={cn("content")}>
        <div className={cn("logoContainer")}>
          <div className={cn("logoTitleContainer")}>
            <BuddyBridge width={360} height={66} onClick={handleLogoClick} className={cn("logoImg")} />
            <p>장애인 봉사 플랫폼</p>
          </div>
          <div className={cn("logo")}>
            <Logo width={315} height={190} />
          </div>
        </div>
        <div className={cn("loginContainer")}>
          <p className={cn("login")}>로그인</p>
          <div className={cn("kakaoLoginContainer")}>
            <p>카카오톡으로 로그인</p>
            <button className={cn("kakaoLogin")} onClick={handleLogin}>
              <Kakao />
              <p>카카오 로그인</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

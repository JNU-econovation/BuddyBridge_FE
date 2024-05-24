import styles from "@/pages/login/login.module.scss";
import classNames from "classnames/bind";

import BuddyBridge from "@/icons/buddy_bridge.svg";
import Logo from "@/images/logo.svg";
import Kakao from "@/icons/kakao.svg";
import { useRouter } from "next/router";

const cn = classNames.bind(styles);

export default function Login() {
  const router = useRouter();
  const Rest_api_key = "debec636d22fb3515bf28a05e30c5af2";
  const redirect_uri = "http://localhost:3000/";
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div className={cn("container")}>
      <div className={cn("content")}>
        <div className={cn("logoContainer")}>
          <div className={cn("logoTitleContainer")}>
            <BuddyBridge width={360} height={66} />
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

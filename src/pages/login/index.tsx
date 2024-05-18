import styles from "@/pages/login/login.module.scss";
import classNames from "classnames/bind";

import BuddyBridge from "@/icons/buddy_bridge.svg";
import Logo from "@/images/logo.svg";
import Kakao from "@/icons/kakao.svg";

import { signIn } from "next-auth/react";

const cn = classNames.bind(styles);

export default function Login() {
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
            <button className={cn("kakaoLogin")} onClick={() => signIn("kakao", { callbackUrl: "/" })}>
              <Kakao />
              <p>카카오 로그인</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

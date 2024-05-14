import styles from "@/pages/login/login.module.scss";
import classNames from "classnames/bind";

import BuddyBridge from "@/icons/buddy_bridge.svg";
import Logo from "@/images/logo.svg";
import KakaoLogin from "@/icons/kakao_login.png";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

const cn = classNames.bind(styles);

export default function Login() {
  return (
    <div className={cn("container")}>
      <div className={cn("content")}>
        <div className={cn("logoContainer")}>
          <div className={cn("logoTitleContainer")}>
            <BuddyBridge />
            <p>장애인 봉사 플랫폼</p>
          </div>
          <div className={cn("logo")}>
            <Logo />
          </div>
        </div>
        <div className={cn("loginContainer")}>
          <p className={cn("login")}>로그인</p>
          <div className={cn("kakaoLoginContainer")}>
            <p>카카오톡으로 로그인</p>
            <button className={cn("kakaoLogin")} onClick={() => signIn("kakao", { callbackUrl: "/" })}>
              <Image src={KakaoLogin} alt="카카오 로그인" fill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

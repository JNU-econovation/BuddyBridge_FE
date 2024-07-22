import classNames from "classnames/bind";

import { useRouter } from "next/router";

import styles from "@/components/page-layout/loginLayout/components/loginLayout.module.scss";
import { ROUTE } from "@/constants/route";
import Kakao from "@/icons/kakao.svg";
import LoginImg from "@/images/loginImg.svg";

const cn = classNames.bind(styles);

export default function LoginLayout() {
  const router = useRouter();
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_Rest_api_key}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  const handleTestLogin = () => {
    router.push(`${ROUTE.HOME}?code=1`);
  };

  return (
    <main className={cn("main")}>
      <div className={cn("container")}>
        <div className={cn("logoBox")}>
          <p className={cn("logoContent")}>
            안녕하세요. 누구나 온기를 전하도록 이어주는
            <br />
            버디브릿지입니다.
          </p>
          <LoginImg width={400} height={400} />
        </div>
        <article className={cn("loginContainer")}>
          <div className={cn("loginBox")}>
            <div className={cn("loginTitleBox")}>
              <p className={cn("loginEnglishTitle")}>BUDDY BRIDGE LOGIN</p>
              <p className={cn("loginKoreanTitle")}>버디브릿지 로그인</p>
            </div>
            <div className={cn("kakaoLoginBox")}>
              <p>카카오톡으로 로그인</p>
              <button onClick={handleLogin} className={cn("kakaoButton")}>
                <Kakao className={cn("kakao")} />
                <p className={cn("kakaoLogin")}>카카오 로그인</p>
              </button>
              <button onClick={handleTestLogin} className={cn("testLoginButton")}>
                테스트 로그인1
              </button>
            </div>
          </div>
          <p className={cn("loginInfo")}>※ 사용자의 신원을 보장하기 위해 카카오 로그인만 제공합니다. </p>
        </article>
      </div>
    </main>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Link from "next/link";

import styles from "@/components/page-layout/loginLayout/components/loginLayout.module.scss";
import { ROUTE } from "@/constants/route";
import Kakao from "@/icons/kakao.svg";
import Message from "@/icons/message.svg";
import Password from "@/icons/password.svg";
import LoginImg from "@/images/loginImg.svg";

const cn = classNames.bind(styles);

const loginSchema = z.object({
  email: z.string().email("유효한 이메일을 입력해주세요."),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .regex(/[a-z]/, "비밀번호에는 최소 1개의 소문자가 포함되어야 합니다.")
    .regex(/[0-9]/, "비밀번호에는 최소 1개의 숫자가 포함되어야 합니다.")
    .regex(/[\W_]/, "비밀번호에는 최소 1개의 특수문자가 포함되어야 합니다."),
});

interface LoginInfo {
  email: string;
  password: string;
}

export default function LoginLayout() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInfo>({ resolver: zodResolver(loginSchema), mode: "onChange" });

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_Rest_api_key}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  const handleLoginClick = (data: LoginInfo) => {
    const content = {
      email: data.email,
      password: data.password,
    };
    console.log(content);
  };

  return (
    <article className={cn("loginContainer")}>
      <div className={cn("loginBox")}>
        <div className={cn("loginTitleBox")}>
          <p className={cn("loginEnglishTitle")}>BUDDY BRIDGE LOGIN</p>
          <p className={cn("loginKoreanTitle")}>버디브릿지 로그인</p>
        </div>
        <div className={cn("loginFormBox")}>
          <form className={cn("formContainer")} onSubmit={handleSubmit(handleLoginClick)}>
            <div className={cn("userInfoBox")}>
              <div className={cn("emailContainer")}>
                <div className={cn("emailBox")}>
                  <input className={cn("email")} placeholder="이메일을 입력해주세요." {...register("email")} />
                  <Message className={cn("messageIcon")} />
                </div>
                {errors.email && <p className={cn("errorMessage")}>{errors.email.message}</p>}
              </div>
              <div className={cn("passwordContainer")}>
                <div className={cn("passwordBox")}>
                  <input
                    type="password"
                    className={cn("password")}
                    placeholder="비밀번호를 입력해주세요."
                    {...register("password")}
                  />
                  <Password className={cn("passwordIcon")} />
                </div>
                {errors.password && <p className={cn("errorMessage")}>{errors.password.message}</p>}
              </div>
            </div>
            <div className={cn("buttonBox")}>
              <button type="submit" className={cn("loginBtn", { active: isValid })}>
                로그인
              </button>
              <Link href={ROUTE.SIGN_UP} type="button" className={cn("signUpBtn")}>
                이메일 회원가입
              </Link>
            </div>
          </form>
        </div>
        <div className={cn("kakaoLoginBox")}>
          <p className={cn("kakaoLoginHeader")}>카카오톡으로 로그인</p>
          <button onClick={handleLogin} className={cn("kakaoButton")}>
            <Kakao className={cn("kakao")} />
            <p className={cn("kakaoLogin")}>카카오 로그인</p>
          </button>
        </div>
      </div>
      <p className={cn("loginInfo")}>※ 사용자의 신원을 보장하기 위해 카카오 로그인만 제공합니다. </p>
    </article>
  );
}

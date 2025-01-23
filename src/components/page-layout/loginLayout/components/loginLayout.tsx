import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Link from "next/link";
import { useRouter } from "next/router";

import Loader from "@/components/common/Loader/Loader";
import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/loginLayout/components/loginLayout.module.scss";
import { ROUTE } from "@/constants/route";
import Email from "@/icons/email.svg";
import Kakao from "@/icons/kakao.svg";
import Password from "@/icons/password.svg";
import { ErrorResponse } from "@/types/error";

import postLogin from "../apis/postLogin";

const cn = classNames.bind(styles);

const loginSchema = z.object({
  email: z.string().email("유효한 이메일을 입력해주세요."),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .regex(/^[^\u3131-\u3163\uac00-\ud7a3]+$/, "비밀번호에는 한글을 포함할 수 없습니다.")
    .max(18, "비밀번호는 최대 16자입니다.")
    .regex(/[a-z]/, "비밀번호에는 최소 1개의 소문자가 포함되어야 합니다.")
    .regex(/[0-9]/, "비밀번호에는 최소 1개의 숫자가 포함되어야 합니다.")
    .regex(/[\W_]/, "비밀번호에는 최소 1개의 특수문자가 포함되어야 합니다."),
});

interface LoginInfoForm {
  email: string;
  password: string;
}

interface LoginInfo {
  body: {
    email: string;
    password: string;
  };
}

export default function LoginLayout() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInfoForm>({ resolver: zodResolver(loginSchema), mode: "onChange" });

  const login = useMutation({
    mutationFn: ({ body }: LoginInfo) => postLogin({ body }),
    onSuccess: (response) => {
      window.localStorage.setItem("accessToken", response.data.accessToken);
      window.localStorage.setItem("refreshToken", response.data.refreshToken);
      router.push(ROUTE.HOME);
      openToast("success", "로그인이 완료되었습니다.");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data.error.invalidParams) {
        openToast("error", error.response.data.error.invalidParams[0].message);
      } else if (error.response?.data.error.message) {
        openToast("error", error.response.data.error.message);
      } else {
        openToast("error", "에러가 발생했습니다.");
      }
    },
  });

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  const handleLoginClick = (data: LoginInfo["body"]) => {
    const body = {
      email: data.email,
      password: data.password,
    };

    login.mutate({ body });
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
                  <Email className={cn("emailIcon")} />
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
                {login.isPending ? <Loader /> : "로그인"}
              </button>
              <Link href={ROUTE.SIGN_UP} type="button" className={cn("signUpBtn")}>
                이메일 회원가입
              </Link>
              <Link href={ROUTE.ADMIN_LOGIN} className={cn("adminLogin")}>
                관리자로 로그인
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
    </article>
  );
}

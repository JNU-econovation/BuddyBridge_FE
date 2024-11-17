import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { ko } from "date-fns/locale";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/router";

import CustomDatePicker from "@/components/common/DatePicker/DatePicker";
import { GENDER } from "@/components/common/DropDown/constants";
import Dropdown from "@/components/common/DropDown/DropDown";
import styles from "@/components/page-layout/signUpLayout/components/signUpLayout.module.scss";
import { ROUTE } from "@/constants/route";
import DropDownImg from "@/icons/dropdown.svg";
import Email from "@/icons/email.svg";
import Name from "@/icons/name.svg";
import Password from "@/icons/password.svg";

import postSignUp from "../apis/postSignUp";

const cn = classNames.bind(styles);

const signUpSchema = z.object({
  name: z.string().min(1, "이름은 최소 1자 이상이어야 합니다."),
  gender: z.string().min(1, "성별을 선택해야 합니다."),
  birthDate: z
    .date()
    .optional()
    .refine((date) => date !== undefined, {
      message: "날짜를 선택해주세요",
    }),
  email: z.string().email("유효한 이메일을 입력해주세요."),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .regex(/[a-z]/, "비밀번호에는 최소 1개의 소문자가 포함되어야 합니다.")
    .regex(/[0-9]/, "비밀번호에는 최소 1개의 숫자가 포함되어야 합니다.")
    .regex(/[\W_]/, "비밀번호에는 최소 1개의 특수문자가 포함되어야 합니다."),
  agree1: z.literal(true, {
    errorMap: () => ({ message: "첫번째 동의 항목에 동의해야 합니다." }),
  }),
  agree2: z.literal(true, {
    errorMap: () => ({ message: "두번째 동의 항목에 동의해야 합니다." }),
  }),
  agree3: z.literal(true, {
    errorMap: () => ({ message: "세번째 동의 항목에 동의해야 합니다." }),
  }),
});

interface SignUpInfoForm {
  name: string;
  gender: string;
  birthDate: Date;
  email: string;
  password: string;
  agree1: boolean;
  agree2: boolean;
  agree3: boolean;
}

interface SignUpInfo {
  body: {
    name: string;
    gender: string;
    birthDate: Date;
    email: string;
    password: string;
  };
}

export default function SignUpLayout() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    control,
    formState: { errors, isValid },
  } = useForm<SignUpInfoForm>({ resolver: zodResolver(signUpSchema), mode: "onChange" });

  const signUp = useMutation({
    mutationFn: ({ body }: SignUpInfo) => postSignUp({ body }),
    onSuccess: () => {
      router.push(ROUTE.LOGIN);
    },
  });

  const handleSignUpClick = (data: SignUpInfoForm) => {
    const body: SignUpInfo["body"] = {
      name: data.name,
      gender: data.gender,
      birthDate: data.birthDate,
      email: data.email,
      password: data.password,
    };

    const confirmMessage = "한 번 가입시 변경할 수 없으니 꼭 확인해주세요.";
    const isConfirmed = window.confirm(confirmMessage);

    if (isConfirmed) {
      signUp.mutate({ body }); // body를 사용
    }
  };

  return (
    <article className={cn("signUpContainer")}>
      <p className={cn("title")}>이메일 회원가입</p>
      <form className={cn("formContainer")} onSubmit={handleSubmit(handleSignUpClick)}>
        <div className={cn("inputContainer")}>
          <div className={cn("nameContainer")}>
            <label className={cn("nameLabel")}>이름</label>
            <div className={cn("nameBox")}>
              <input placeholder="이름을 입력해주세요." className={cn("nameInput")} {...register("name")} />
              <Name className={cn("nameIcon")} />
            </div>
            {errors.name && <p className={cn("errorMessage")}>{errors.name.message}</p>}
          </div>
          <div className={cn("genderContainer")}>
            <label className={cn("genderLabel")}>성별</label>
            <Dropdown
              classNames={cn("genderDropDown")}
              placeholder="성별을 선택해 주세요"
              options={GENDER}
              onSelection={(option) => {
                setValue("gender", option);
                clearErrors("gender");
              }}
              {...register("gender")}
            />
            {errors.gender && <p className={cn("errorMessage")}>{errors.gender.message}</p>}
          </div>
          <div className={cn("birthDayContainer")}>
            <label className={cn("birthDayLabel")}>생년월일</label>
            <div className={cn("birthDayBox")}>
              <Controller
                name="birthDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomDatePicker
                    locale={ko}
                    selected={field.value}
                    onChange={field.onChange}
                    dateFormat="yyyy년 MM월 dd일"
                    customInputRef={field.ref}
                    classNames={cn("birthDay")}
                    placeholder="생년월일을 선택해 주세요."
                  />
                )}
              />
              <DropDownImg className={cn("dropDownImg")} />
            </div>
            {errors.birthDate && <p className={cn("errorMessage")}>{errors.birthDate.message}</p>}
          </div>
          <div className={cn("emailContainer")}>
            <label className={cn("emailLabel")}>이메일</label>
            <div className={cn("emailBox")}>
              <input
                placeholder="VMS 가입 이메일을 입력해주세요."
                className={cn("emailInput")}
                {...register("email")}
              />
              <Email className={cn("emailIcon")} />
            </div>
            {errors.email && <p className={cn("errorMessage")}>{errors.email.message}</p>}
          </div>
          <div className={cn("passwordContainer")}>
            <label className={cn("passwordLabel")}>비밀번호</label>
            <div className={cn("passwordBox")}>
              <input
                placeholder="영문자, 숫자, 특수 문자 포함 8 ~ 16자"
                className={cn("passwordInput")}
                {...register("password")}
              />
              <Password className={cn("passwordIcon")} />
            </div>
            {errors.password && <p className={cn("errorMessage")}>{errors.password.message}</p>}
          </div>
        </div>
        <div className={cn("agreeContainer")}>
          <p className={cn("agreeTitle")}>동의 항목</p>
          <div className={cn("agreeBox")}>
            <div className={cn("checkBox")}>
              <input type="checkbox" id="agree1" {...register("agree1")} />
              <label htmlFor="agree1">VMS 가입한 이메일과 동일합니다. </label>
            </div>
            <div className={cn("checkBox")}>
              <input type="checkbox" id="agree2" {...register("agree2")} />
              <label htmlFor="agree2">이름, 성별, 출생연도는 한 번 가입시 변경할 수 없습니다.</label>
            </div>
            <div className={cn("checkBox")}>
              <input type="checkbox" id="agree3" {...register("agree3")} />
              <label htmlFor="agree3">부적절한 게시글 및 댓글은 작성이 제한되며, 삭제 될 수 있습니다. </label>
            </div>
            {errors.agree1 && <p className={cn("errorMessage")}>{errors.agree1.message}</p>}
            {errors.agree2 && <p className={cn("errorMessage")}>{errors.agree2.message}</p>}
            {errors.agree3 && <p className={cn("errorMessage")}>{errors.agree3.message}</p>}
          </div>
        </div>
        <button type="submit" className={cn("signUpBtn", { active: isValid })}>
          회원가입
        </button>
      </form>
    </article>
  );
}

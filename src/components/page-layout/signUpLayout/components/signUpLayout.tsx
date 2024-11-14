import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames/bind";
import { ko } from "date-fns/locale";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import CustomDatePicker from "@/components/common/DatePicker/DatePicker";
import { GENDER } from "@/components/common/DropDown/constants";
import Dropdown from "@/components/common/DropDown/DropDown";
import styles from "@/components/page-layout/signUpLayout/components/signUpLayout.module.scss";
import DropDownImg from "@/icons/dropdown.svg";
import Email from "@/icons/email.svg";
import Name from "@/icons/name.svg";
import Password from "@/icons/password.svg";

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

interface SignUpInfo {
  name: string;
  gender: string;
  birthDay: Date;
  email: string;
  password: string;
}

export default function SignUpLayout() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm<SignUpInfo>({ resolver: zodResolver(loginSchema), mode: "onChange" });

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_Rest_api_key}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  const handleLoginClick = (data: SignUpInfo) => {
    const content = {
      email: data.email,
      password: data.password,
    };
    console.log(content);
  };

  return (
    <article className={cn("signUpContainer")}>
      <p className={cn("title")}>이메일 회원가입</p>
      <form className={cn("formContainer")}>
        <div className={cn("inputContainer")}>
          <div className={cn("nameContainer")}>
            <label className={cn("nameLabel")}>이름</label>
            <div className={cn("nameBox")}>
              <input placeholder="이름을 입력해주세요." className={cn("nameInput")} />
              <Name className={cn("nameIcon")} />
            </div>
          </div>
          <div className={cn("genderContainer")}>
            <label className={cn("genderLabel")}>성별</label>
            <Dropdown
              classNames={cn("genderDropDown")}
              placeholder="성별을 선택해 주세요"
              options={GENDER}
              onSelection={(option) => setValue("gender", option)}
              {...register("gender", { required: true })}
            />
          </div>
          <div className={cn("birthDayContainer")}>
            <label className={cn("birthDayLabel")}>생년월일</label>
            <div className={cn("birthDayBox")}>
              <Controller
                name="birthDay"
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
          </div>
          <div className={cn("emailContainer")}>
            <label className={cn("emailLabel")}>이메일</label>
            <div className={cn("emailBox")}>
              <input placeholder="VMS 가입 이메일을 입력해주세요." className={cn("emailInput")} />
              <Email className={cn("emailIcon")} />
            </div>
          </div>
          <div className={cn("passwordContainer")}>
            <label className={cn("passwordLabel")}>비밀번호</label>
            <div className={cn("passwordBox")}>
              <input placeholder="영문자, 숫자, 특수 문자 포함 8 ~ 16자" className={cn("passwordInput")} />
              <Password className={cn("passwordIcon")} />
            </div>
          </div>
        </div>
        <div className={cn("agreeContainer")}>
          <p className={cn("agreeTitle")}>동의 항목</p>
          <div className={cn("agreeBox")}>
            <div className={cn("checkBox")}>
              <input type="checkbox" id="agree1" />
              <label htmlFor="agree1">VMS 가입한 이메일과 동일합니다. </label>
            </div>
            <div className={cn("checkBox")}>
              <input type="checkbox" id="agree2" />
              <label htmlFor="agree2">이름, 성별, 출생연도는 한 번 가입시 변경할 수 없습니다.</label>
            </div>
            <div className={cn("checkBox")}>
              <input type="checkbox" id="agree3" />
              <label htmlFor="agree3">부적절한 게시글 및 댓글은 작성이 제한되며, 삭제 될 수 있습니다. </label>
            </div>
          </div>
        </div>
        <button className={cn("signUpBtn")}>회원가입</button>
      </form>
    </article>
  );
}

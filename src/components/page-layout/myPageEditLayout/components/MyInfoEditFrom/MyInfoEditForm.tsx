import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Image from "next/image";
import { useRouter } from "next/router";

import Button from "@/components/common/Button/Button";
import { DISABILITY } from "@/components/common/DropDown/constants";
import DropDown from "@/components/common/DropDown/DropDown";
import styles from "@/components/page-layout/myPageEditLayout/components/MyInfoEditFrom/MyInfoEditForm.module.scss";
import { ROUTE } from "@/constants/route";
import EditBtn from "@/icons/edit.svg";

import getMyInfo from "../../apis/getMyInfo";
import patchMyInfo from "../../apis/putMyInfo";

const cn = classNames.bind(styles);

export interface FormType {
  disabilityType: string;
  nickname: string;
  name?: string;
  profileImageUrl?: string;
  email?: string;
  age?: string;
  gender: string;
}

interface ErrorResponse {
  error: {
    message: string;
  };
}

const nickNameSchema = z.object({
  nickname: z
    .string()
    .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
    .max(10, "닉네임은 최대 10자까지만 가능합니다.")
    .regex(/^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9]*$/, "공백 및 특수 문자는 불가능합니다."),
  disabilityType: z.string().optional(),
});

export default function MyInfoEditForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: myInfoData } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getMyInfo,
  });

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm<FormType>({
    resolver: zodResolver(nickNameSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (myInfoData?.disabilityType) {
      setValue("disabilityType", myInfoData.disabilityType);
    }
    if (myInfoData?.nickname) {
      setValue("nickname", myInfoData.nickname);
    }
  }, [myInfoData, setValue]);

  const uploadMyInfo = useMutation({
    mutationFn: (content: FormType) => patchMyInfo(content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      router.push(ROUTE.MY_PAGE);
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data) {
        setError("nickname", { message: error.response.data.error.message });
      }
    },
  });

  const handleUpdateInfo = (data: FormType) => {
    const content = {
      name: myInfoData.name,
      nickname: data.nickname,
      profileImageUrl: myInfoData.profileImageUrl,
      email: myInfoData.email,
      age: myInfoData.age,
      gender: myInfoData.gender,
      disabilityType: data.disabilityType,
    };
    uploadMyInfo.mutate(content);
  };

  return (
    <div className={cn("container")}>
      <form className={cn("form")} onSubmit={handleSubmit(handleUpdateInfo)}>
        <p className={cn("title")}>내 정보 수정</p>
        <div className={cn("imgContainer")}>
          <Image alt="프로필" src={myInfoData?.profileImageUrl} width={100} height={100} className={cn("img")} />
          <EditBtn width={27} height={27} className={cn("imgEditBtn")} />
        </div>
        <div className={cn("contentContainer")}>
          <div className={cn("nameContainer")}>
            <p className={cn("nameTitle")}>이름</p>
            <p className={cn("name")}>{myInfoData?.name}</p>
          </div>
          <div className={cn("nicknameContainer")}>
            <p className={cn("nicknameTitle")}>닉네임</p>
            <input className={cn("nickname")} {...register("nickname")} defaultValue={myInfoData?.nickname} />
            {errors.nickname && <p className={cn("errorMessage")}>{errors.nickname.message}</p>}
          </div>
          <div className={cn("ageContainer")}>
            <p className={cn("ageTitle")}>나이</p>
            <p className={cn("age")}>{myInfoData?.age}세</p>
          </div>
          <div className={cn("genderContainer")}>
            <p className={cn("genderTitle")}>성별</p>
            <p className={cn("gender")}>{myInfoData?.gender}</p>
          </div>
        </div>
        <div className={cn("disabilityTypeContainer")}>
          <p className={cn("disabilityTypeTitle")}>장애유형</p>
          <DropDown
            options={DISABILITY}
            onSelection={(option) => setValue("disabilityType", option)}
            {...register("disabilityType", { required: true })}
          />
        </div>
        <div className={cn("emailContainer")}>
          <p className={cn("emailTitle")}>이메일</p>
          <p className={cn("email")}>{myInfoData?.email}</p>
        </div>
        <div className={cn("buttonContainer")}>
          <Button className={cn("button", { active: isValid })}>저장하기</Button>
        </div>
      </form>
    </div>
  );
}

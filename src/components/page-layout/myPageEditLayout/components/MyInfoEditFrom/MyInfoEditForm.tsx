import { useEffect } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";

import Image from "next/image";
import { useRouter } from "next/router";

import { DISABILITY } from "@/components/common/DropDown/constants";
import DropDown from "@/components/common/DropDown/DropDown";
import getKakaoInfo from "@/components/page-layout/HomeLayout/apis/getKakaoInfo";
import styles from "@/components/page-layout/myPageEditLayout/components/MyInfoEditFrom/MyInfoEditForm.module.scss";
import { ROUTE } from "@/constants/route";
import useUserInfoStore from "@/stores/kakaoInnfo";

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

export default function MyInfoEditForm() {
  const router = useRouter();
  const { code } = useUserInfoStore();
  const queryClient = useQueryClient();

  const { data: myInfoData } = useQuery({
    queryKey: ["info", code],
    queryFn: getMyInfo,
  });

  const { register, handleSubmit, setValue } = useForm<FormType>();

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
      queryClient.invalidateQueries({ queryKey: ["info", code] });
      router.push(ROUTE.MY_PAGE);
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
      <p className={cn("title")}>내 정보</p>
      <form className={cn("form")} onSubmit={handleSubmit(handleUpdateInfo)}>
        <div className={cn("imgContainer")}>
          <Image alt="프로필" src={myInfoData?.profileImageUrl} width={60} height={60} className={cn("img")} />
        </div>
        <div className={cn("contentContainer")}>
          <div className={cn("nameContainer")}>
            <p className={cn("nameTitle")}>이름</p>
            <p className={cn("name")}>{myInfoData?.name}</p>
          </div>
          <div className={cn("nicknameContainer")}>
            <p className={cn("nicknameTitle")}>닉네임</p>
            <input
              className={cn("nickname")}
              {...register("nickname", { required: true })}
              defaultValue={myInfoData?.nickname}
            />
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
        <div className={cn("buttonContainer")}>
          <button className={cn("button")}>저장하기</button>
        </div>
      </form>
    </div>
  );
}

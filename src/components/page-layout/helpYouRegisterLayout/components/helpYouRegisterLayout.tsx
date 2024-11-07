import { useEffect } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { ko } from "date-fns/locale";
import { Controller, useForm } from "react-hook-form";

import { useRouter } from "next/router";

import Button from "@/components/common/Button/Button";
import CustomDatePicker from "@/components/common/DatePicker/DatePicker";
import { ASSISTANCE, DISABILITY, PLACE } from "@/components/common/DropDown/constants";
import Dropdown from "@/components/common/DropDown/DropDown";
import Input from "@/components/common/Input/Input";
import Label from "@/components/common/Label/Label";
import RadioInput from "@/components/common/RadioInput/RadioInput";
import Textarea from "@/components/common/Textarea/Textarea";
import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/helpYouRegisterLayout/components/helpYouRegisterLayout.module.scss";
import { ROUTE } from "@/constants/route";
import DropDownImg from "@/icons/dropdown.svg";

import postHelpMeReister from "../../helpMeRegisterLayout/apis/postHelpMeRegister";
import { helpMeFormData } from "../../helpMeRegisterLayout/types";
import getMyInfo from "../../myPageEditLayout/apis/getMyInfo";

const cn = classNames.bind(styles);

export default function HelpYouRegisterLayout() {
  const router = useRouter();

  const { data: myInfoData, isFetching } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getMyInfo(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isValid },
  } = useForm<helpMeFormData>({
    mode: "onChange",
  });

  const uploadHelpMeMutation = useMutation({
    mutationFn: (content: helpMeFormData) => postHelpMeReister(content),
    onSuccess: () => {
      router.push(ROUTE.HELP_YOU);
    },
  });

  const handleHelpYouUpload = (data: helpMeFormData) => {
    const content = {
      title: data.title,
      assistanceType: data.assistanceType,
      startDate: data.startDate,
      endDate: data.endDate,
      scheduleType: data.scheduleType,
      scheduleDetails: data.scheduleDetails,
      district: data.district,
      content: data.content,
      postType: "GIVER",
      gender: data.gender,
      age: Number(data.age),
      disabilityType: data.disabilityType,
      headcount: Number(data.headcount),
      assistanceStartTime: `${data.assistanceStartTime}:00`,
      assistanceEndTime: `${data.assistanceEndTime}:00`,
    };
    uploadHelpMeMutation.mutate(content);
  };

  useEffect(() => {
    if (!myInfoData && !isFetching) {
      router.push(ROUTE.LOGIN);
      openToast("error", "로그인을 해주세요.");
    }
  }, [myInfoData, router, isFetching]);

  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <p className={cn("title")}>도와줄게요! 리스트 작성</p>
        <form className={cn("form")} onSubmit={handleSubmit(handleHelpYouUpload)}>
          <div className={cn("titleContainer")}>
            <Label className={cn("label")} htmlFor="title">
              제목
            </Label>
            <Input
              className={cn("titleInput")}
              id="title"
              placeholder="구체적으로 줄 수 있는 도움을 적어주세요. 예) 대필, 조리봉사, 촬영 등"
              {...register("title", { required: true })}
            />
          </div>
          <div className={cn("genderAgeContainer")}>
            <div className={cn("genderContainer")}>
              <Label className={cn("label")} htmlFor="gender">
                성별
              </Label>
              <Controller
                name="gender"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <RadioInput postType="giver" {...field} firstValue="남성" secondValue="여성" />}
              />
            </div>
            <div className={cn("ageContainer")}>
              <Label className={cn("label")} htmlFor="age">
                나이
              </Label>
              <Input
                className={cn("ageInput")}
                id="age"
                placeholder="숫자만 입력"
                {...register("age", { required: true })}
              />
            </div>
            <div className={cn("disabilityContainer")}>
              <Label className={cn("label")} htmlFor="disabilityType">
                장애 유형
              </Label>
              <Dropdown
                options={DISABILITY}
                onSelection={(option) => setValue("disabilityType", option)}
                {...register("disabilityType", { required: true })}
              />
            </div>
            <div className={cn("helpTypeContainer")}>
              <Label className={cn("label")} htmlFor="assistanceType">
                도움 유형
              </Label>
              <Dropdown
                options={ASSISTANCE}
                onSelection={(option) => setValue("assistanceType", option)}
                {...register("assistanceType", { required: true })}
              />
            </div>
            <div className={cn("periodContainer")}>
              <Label className={cn("label")} htmlFor="scheduleType ">
                주기 구분
              </Label>
              <Controller
                name="scheduleType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioInput postType="giver" {...field} firstValue="정기" secondValue="비정기" />
                )}
              />
            </div>
            <Input
              className={cn("periodDetailInput")}
              id="scheduleDetail"
              placeholder="예) 1째주, 화목"
              {...register("scheduleDetails", { required: true })}
            />
          </div>
          <div className={cn("placeHeadcountContainer")}>
            <div className={cn("placeContainer")}>
              <Label className={cn("label")} htmlFor="district">
                장소
              </Label>
              <Dropdown
                options={PLACE}
                onSelection={(option) => setValue("district", option)}
                {...register("district", { required: true })}
              />
            </div>
            <div className={cn("headcountContainer")}>
              <Label className={cn("label")} htmlFor="headcount">
                모집 인원
              </Label>
              <Input
                className={cn("headcountInput")}
                id="headcount"
                placeholder="숫자만 입력"
                {...register("headcount", { required: true })}
              />
            </div>
          </div>
          <div className={cn("dateContainer")}>
            <Label className={cn("label")} htmlFor="date">
              기간
            </Label>
            <div className={cn("dateBox")}>
              <div className={cn("date")}>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomDatePicker
                      locale={ko}
                      selected={field.value}
                      onChange={field.onChange}
                      dateFormat="yyyy년 MM월 dd일"
                      customInputRef={field.ref}
                    />
                  )}
                />
                <DropDownImg className={cn("dropDownImg")} />
              </div>
              <p className={cn("wave")}>~</p>
              <div className={cn("date")}>
                <Controller
                  name="endDate"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <CustomDatePicker
                      locale={ko}
                      selected={field.value}
                      onChange={field.onChange}
                      dateFormat="yyyy년 MM월 dd일"
                      customInputRef={field.ref}
                    />
                  )}
                />
                <DropDownImg className={cn("dropDownImg")} />
              </div>
            </div>
          </div>
          <div className={cn("timeContainer")}>
            <Label className={cn("label")}>시간</Label>
            <Input
              className={cn("assistanceStartTime")}
              type="time"
              {...register("assistanceStartTime", { required: true })}
            />
            <p className={cn("wave")}>~</p>
            <Input
              className={cn("assistanceEndTime")}
              type="time"
              {...register("assistanceEndTime", { required: true })}
            />
          </div>
          <div className={cn("detailContainer")}>
            <Label className={cn("label")} htmlFor="content">
              내용
            </Label>
            <Textarea
              placeholder="도움이 가능한 정보 및 시간을 상세하게 적어주세요. ex, 매일 3시부터 5시까지 지역 이동이 가능합니다. 요리 가능합니다. 등 "
              id="content"
              className={cn("detailTextarea")}
              {...register("content", { required: true })}
            />
          </div>
          <Button className={cn("registerBox")} disabled={!isValid}>
            등록하기
          </Button>
        </form>
      </div>
    </div>
  );
}

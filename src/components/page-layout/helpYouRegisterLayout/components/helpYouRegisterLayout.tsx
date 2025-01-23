import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames/bind";
import { ko } from "date-fns/locale";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/router";

import Button from "@/components/common/Button/Button";
import CustomDatePicker from "@/components/common/DatePicker/DatePicker";
import { ASSISTANCE, PLACE } from "@/components/common/DropDown/constants";
import Dropdown from "@/components/common/DropDown/DropDown";
import Input from "@/components/common/Input/Input";
import Label from "@/components/common/Label/Label";
import Modal from "@/components/common/Modal/Modal";
import MyInfoCard from "@/components/common/MyInfoCard/MyInfoCard";
import RadioInput from "@/components/common/RadioInput/RadioInput";
import Textarea from "@/components/common/Textarea/Textarea";
import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/helpYouRegisterLayout/components/helpYouRegisterLayout.module.scss";
import { ROUTE } from "@/constants/route";
import Calendar from "@/icons/calendar.svg";
import RegisterArrow from "@/icons/send_arrow.svg";
import { ErrorResponse } from "@/types/error";

import postHelpMeRegister from "../../helpMeRegisterLayout/apis/postHelpMeRegister";
import { helpMeFormData } from "../../helpMeRegisterLayout/types";
import getMyInfo from "../../myPageEditLayout/apis/getMyInfo";

const cn = classNames.bind(styles);

const registerSchema = z
  .object({
    title: z.string().min(1, "제목 최소 1자 이상이어야 합니다.").max(30, "제목은 최대 30자입니다."),
    startDate: z
      .date()
      .optional()
      .refine((date) => date !== undefined, {
        message: "시작 기간을 선택해주세요",
      }),
    endDate: z
      .date()
      .optional()
      .refine((date) => date !== undefined, {
        message: "마무리 기간을 선택해주세요",
      }),
    assistanceStartTime: z.string().min(1, "시작 시간을 선택해주세요."),
    assistanceEndTime: z.string().min(1, "끝나는 시간을 선택해주세요."),
    scheduleType: z.string().min(1, "주기를 선택해주세요."),
    scheduleDetails: z.string().min(1, "상세 주기를 입력해주세요."),
    district: z.string().min(1, "장소를 선택해주세요."),
    assistanceType: z.string().min(1, "도움 유형을 선택해주세요."),
    content: z.string().min(1, "상세 내용을 입력해주세요.").max(500, "상세 내용은 최대 500자입니다."),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate <= data.endDate;
      }
      return true;
    },
    {
      message: "시작 기간은 마무리 기간을 초과할 수 없습니다.",
      path: ["startDate"],
    },
  )
  .refine(
    (data) => {
      const { assistanceStartTime, assistanceEndTime } = data;
      const startTime = new Date(`1970-01-01T${assistanceStartTime}:00`);
      const endTime = new Date(`1970-01-01T${assistanceEndTime}:00`);
      return startTime <= endTime;
    },
    {
      message: "시작 시간은 끝나는 시간보다 늦을 수 없습니다.",
      path: ["assistanceStartTime"],
    },
  );

export default function HelpYouRegisterLayout() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [content, setContent] = useState<helpMeFormData | null>(null);

  const { data: myInfoData, isFetching } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getMyInfo(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<helpMeFormData>({ resolver: zodResolver(registerSchema), mode: "onChange" });

  const title = watch("title", "");
  const contentText = watch("content", "");

  const uploadHelpYouMutation = useMutation({
    mutationFn: (content: helpMeFormData) => postHelpMeRegister(content),
    onSuccess: () => {
      router.push(ROUTE.HELP_YOU);
      openToast("error", "게시글 등록에 성공했습니다.");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data.error.invalidParams) {
        openToast("error", error.response.data.error.invalidParams[0].message);
      } else if (error.response?.data.error.message) {
        openToast("error", error.response.data.error.message);
      } else {
        openToast("error", "게시글 등록에 실패했습니다.");
      }
    },
  });

  const handleHelpMetUpload = (data: helpMeFormData) => {
    setIsModalOpen((prev) => !prev);

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
      gender: myInfoData.gender,
      age: Number(myInfoData.age),
      disabilityType: myInfoData.disabilityType,
      assistanceStartTime: data.assistanceStartTime,
      assistanceEndTime: data.assistanceEndTime,
    };

    setContent(content);
  };

  const onSubmit = handleSubmit(
    (data) => handleHelpMetUpload(data),
    () => {
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        openToast("error", "폼의 에러 메시지를 확인해주세요.");
      }
    },
  );

  useEffect(() => {
    if (!myInfoData && !isFetching) {
      router.push(ROUTE.LOGIN);
      openToast("error", "로그인을 해주세요.");
    }
  }, [myInfoData, router, isFetching]);

  return (
    <>
      <div className={cn("container")}>
        <div className={cn("box")}>
          <p className={cn("title")}>도와줄게요! 게시글 작성</p>
          <MyInfoCard />
          <form className={cn("form")} onSubmit={onSubmit}>
            <div className={cn("formContentBox")}>
              <div className={cn("titleContainer")}>
                <Label className={cn("label")} htmlFor="title">
                  제목
                </Label>
                <hr />
                <Input
                  className={cn("titleInput")}
                  id="title"
                  placeholder="구체적으로 줄 수 있는 도움을 적어주세요. 예) 대필, 조리봉사, 촬영 등"
                  {...register("title")}
                />
                <p className={cn("charCount")}>{title.length}/30</p>
                {errors.title && <p className={cn("errorMessage")}>{errors.title.message}</p>}
              </div>
              <div className={cn("dateContainer")}>
                <Label className={cn("label")} htmlFor="date">
                  기간
                </Label>
                <hr />
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
                          onChange={(date: Date) => {
                            if (date) {
                              const adjustedDate = new Date(date.setHours(12, 0, 0, 0));
                              field.onChange(adjustedDate);
                            }
                          }}
                          dateFormat="yyyy.MM.dd"
                          customInputRef={field.ref}
                          placeholder="0000.00.00"
                          classNames={cn("dateFont")}
                        />
                      )}
                    />
                    <Calendar className={cn("calendar")} />
                    {errors.startDate && <p className={cn("errorMessage")}>{errors.startDate.message}</p>}
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
                          onChange={(date: Date) => {
                            if (date) {
                              const adjustedDate = new Date(date.setHours(12, 0, 0, 0));
                              field.onChange(adjustedDate);
                            }
                          }}
                          dateFormat="yyyy.MM.dd"
                          customInputRef={field.ref}
                          placeholder="0000.00.00"
                          classNames={cn("dateFont")}
                        />
                      )}
                    />
                    <Calendar className={cn("calendar")} />
                    {errors.endDate && <p className={cn("errorMessage")}>{errors.endDate.message}</p>}
                  </div>
                </div>
              </div>
              <div className={cn("timeContainer")}>
                <Label className={cn("label")}>시간</Label>
                <hr />
                <div className={cn("timeBox")}>
                  <div className={cn("assistanceStartTimeBox")}>
                    <Input className={cn("assistanceStartTime")} type="time" {...register("assistanceStartTime")} />
                    {errors.assistanceStartTime && (
                      <p className={cn("errorMessage")}>{errors.assistanceStartTime.message}</p>
                    )}
                  </div>
                  <p className={cn("wave")}>~</p>
                  <div className={cn("assistanceEndTimeBox")}>
                    <Input className={cn("assistanceEndTime")} type="time" {...register("assistanceEndTime")} />
                    {errors.assistanceEndTime && (
                      <p className={cn("errorMessage")}>{errors.assistanceEndTime.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className={cn("periodContainer")}>
                <Label className={cn("label")} htmlFor="scheduleType">
                  주기 구분
                </Label>
                <hr />
                <div className={cn("periodBox")}>
                  <div className={cn("scheduleTypeBox")}>
                    <Controller
                      name="scheduleType"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <RadioInput
                          postType="giver"
                          classNames={cn("period")}
                          {...field}
                          firstValue="정기"
                          secondValue="비정기"
                        />
                      )}
                    />
                    {errors.scheduleType && <p className={cn("errorMessage")}>{errors.scheduleType.message}</p>}
                  </div>
                  <div className={cn("scheduleDetailsBox")}>
                    <Input
                      className={cn("periodDetailInput")}
                      id="scheduleDetails"
                      placeholder="예) 1째주, 화목"
                      {...register("scheduleDetails", { required: true })}
                    />
                    {errors.scheduleDetails && <p className={cn("errorMessage")}>{errors.scheduleDetails.message}</p>}
                  </div>
                </div>
              </div>
              <div className={cn("placeHelpTypeContainer")}>
                <Label className={cn("label")}>장소 & 장애유형</Label>
                <hr />
                <div className={cn("placeHelpTypeBox")}>
                  <div className={cn("placeBox")}>
                    <Dropdown
                      options={PLACE}
                      onSelection={(option) => setValue("district", option, { shouldValidate: true })}
                      placeholder="장소"
                      {...register("district", { required: true })}
                    />
                    {errors.district && <p className={cn("errorMessage")}>{errors.district.message}</p>}
                  </div>
                  <div className={cn("helpTypeBox")}>
                    <Dropdown
                      options={ASSISTANCE}
                      onSelection={(option) => setValue("assistanceType", option, { shouldValidate: true })}
                      placeholder="도움유형"
                      {...register("assistanceType", { required: true })}
                    />
                    {errors.assistanceType && <p className={cn("errorMessage")}>{errors.assistanceType.message}</p>}
                  </div>
                </div>
              </div>
              <div className={cn("detailContainer")}>
                <Label className={cn("label")} htmlFor="content">
                  상세 내용
                </Label>
                <hr />
                <Textarea
                  placeholder="도움이 가능한 정보 및 시간을 상세하게 적어주세요. ex, 매일 3시부터 5시까지 지역 이동이 가능합니다. 요리 가능합니다. 등 "
                  id="content"
                  className={cn("detailTextarea")}
                  {...register("content", { required: true })}
                />
                <p className={cn("charCount")}>{contentText.length}/500</p>
                {errors.content && <p className={cn("errorMessage")}>{errors.content.message}</p>}
              </div>
              <Button className={cn("registerBox", { active: isValid })}>
                등록하기
                <RegisterArrow className={cn("arrow")} />
              </Button>
            </div>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <ConfirmModal
          setState={setIsModalOpen}
          content={content as helpMeFormData}
          mutate={uploadHelpYouMutation.mutate}
        />
      )}
    </>
  );
}

interface ConfirmModalProps {
  setState: Dispatch<SetStateAction<boolean>>;
  content: helpMeFormData;
  mutate: (content: helpMeFormData) => void;
}

function ConfirmModal({ setState, content, mutate }: ConfirmModalProps) {
  const handleConfirm = () => {
    setState((prev) => !prev);
    mutate(content);
  };

  return (
    <Modal className={cn("modal")} setState={setState}>
      <div className={cn("textBox")}>
        <div className={cn("modalTitle")}>
          <p>부적절한 게시글의 경우</p>
          <p>작성이 제한되며, 신고 및 삭제 될 수 있습니다.</p>
        </div>
        <p className={cn("modalContent")}>모두의 따뜻한 Buddy Bridge 사용을 위해 노력하겠습니다. </p>
      </div>
      <button onClick={handleConfirm} className={cn("modalBtnContent")}>
        네, 확인했습니다.
      </button>
    </Modal>
  );
}

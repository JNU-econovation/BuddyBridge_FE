import { Dispatch, SetStateAction } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames/bind";
import { ko } from "date-fns/locale";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import CustomDatePicker from "@/components/common/DatePicker/DatePicker";
import DropDown from "@/components/common/DropDown/DropDown";
import Input from "@/components/common/Input/Input";
import Modal from "@/components/common/Modal/Modal";
import Textarea from "@/components/common/Textarea/Textarea";
import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/CertifyVolunteeringModal/CertifyVolunteeringModal.module.scss";
import Calendar from "@/icons/calendar.svg";
import Close from "@/icons/close.svg";

import getPostEnums from "./apis/getPostEnums";
import postCertificationsForm, { formType } from "./apis/postCertificationsForm";

const cn = classNames.bind(styles);

interface CertifyVolunteeringModalProps {
  setState: Dispatch<SetStateAction<boolean>>;
  postType: "TAKER" | "GIVER";
  postId: number;
  email: string;
  name: string;
  matchingId: number;
}

interface FormData {
  volunteerDate: Date;
  assistanceType: "학습" | "식사" | "이동" | "기타";
  startTime: Date;
  endTime: Date;
  content: string;
}

interface ErrorResponse {
  error: {
    message: string;
  };
}

const volunteerSchema = z.object({
  volunteerDate: z
    .date()
    .optional()
    .refine((date) => date !== undefined, {
      message: "봉사한 날짜를 선택해주세요",
    }),
  startTime: z.string().min(1, "시작 시간을 선택해주세요."),
  endTime: z.string().min(1, "끝나는 시간을 선택해주세요."),
  assistanceType: z.string().min(1, "도움 유형을 선택해주세요."),
  content: z.string().min(150, "150자 이상을 입력해주세요."),
});

export default function CertifyVolunteeringModal({
  setState,
  postId,
  postType,
  email,
  name,
  matchingId,
}: CertifyVolunteeringModalProps) {
  const { data, isError, isPending } = useQuery({
    queryKey: ["assistanceTypes"],
    queryFn: getPostEnums,
  });

  const certificationsFormMutation = useMutation({
    mutationFn: (body: formType) => postCertificationsForm(body, matchingId),
    onSuccess: () => {
      setState((prev) => !prev);
      openToast("success", "봉사 인증 폼 작성이 완료되었습니다.");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        setState((prev) => !prev);
        openToast("error", error.response.data.error.message);
      } else {
        setState((prev) => !prev);
        openToast("error", "에러가 발생했습니다.");
      }
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(volunteerSchema),
    mode: "onSubmit",
  });

  const handleVolunteerComplete = (data: FormData) => {
    certificationsFormMutation.mutate(data);
  };

  if (isError) {
    return <>에러</>;
  }

  if (isPending) {
    return <>...로딩중</>;
  }

  return (
    <Modal className={cn("modal")} setState={setState}>
      <header className={cn("header")}>Buddy Bridge 봉사 인증 폼 작성</header>
      <div className={cn("explanationBox")}>
        <header className={cn("explanationHeader")}>봉사 인증폼 제출</header>
        <div className={cn("explanationContent")}>
          <p>
            봉사를 완료한 봉사자가 작성하는 인증 폼입니다.
            <br />
            도움유형은 각 도움마다 최대 2시간만 인정 가능합니다.
          </p>
          <p>* 기타 도움의 경우, 복지관 측에 따라 봉사 인정 가능이 결정됩니다. </p>
        </div>
      </div>
      <form className={cn("form")} onSubmit={handleSubmit(handleVolunteerComplete)}>
        <div className={cn("nameBox")}>
          <p className={cn("nameTitle")}>1. 봉사자 이름</p>
          <p className={cn("name")}>{name}</p>
        </div>
        <div className={cn("emailBox")}>
          <p className={cn("emailTitle")}>2. 봉사자 이메일</p>
          <p className={cn("email")}>{email}</p>
        </div>
        <div className={cn("postBox")}>
          <p className={cn("postTitle")}>3. 봉사한 게시글</p>
          <div className={cn("postContentBox")}>
            <p className={cn("postType")}>{postType}</p>
            <p className={cn("postId")}>{postId}</p>
          </div>
        </div>
        <div className={cn("dateContainer")}>
          <p className={cn("dateTitle")}>4. 봉사 일자</p>
          <div className={cn("dateBox")}>
            <Calendar className={cn("calendar")} />
            <Controller
              name="volunteerDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomDatePicker
                  locale={ko}
                  selected={field.value}
                  onChange={field.onChange}
                  dateFormat="yyyy.MM.dd"
                  customInputRef={field.ref}
                  placeholder="봉사한 날짜를 선택해 주세요."
                  classNames={cn("volunteeringDate")}
                />
              )}
            />
            {errors.volunteerDate && <p className={cn("errorMessage")}>{errors.volunteerDate.message}</p>}
          </div>
        </div>
        <div className={cn("helpTypeTimeContainer")}>
          <p className={cn("timeTitle")}>5. 봉사 시간</p>
          <div className={cn("helpTypeTimeBox")}>
            <div className={cn("helpTypeBox")}>
              <DropDown
                options={data.assistanceTypes}
                onSelection={(option) =>
                  setValue("assistanceType", option as "학습" | "식사" | "이동" | "기타", { shouldValidate: true })
                }
                classNames={cn("helpType")}
                placeholder="도움 유형 선택"
                optionClassNames={cn("helpTypeOption")}
                {...register("assistanceType", { required: true })}
              />
              {errors.assistanceType && <p className={cn("errorMessage")}>{errors.assistanceType.message}</p>}
            </div>
            <div className={cn("assistanceStartTimeContainer")}>
              <div>
                <Input className={cn("assistanceStartTime")} type="time" {...register("startTime")} />
                {errors.startTime && <p className={cn("errorMessage")}>{errors.startTime.message}</p>}
              </div>
              <p className={cn("wave")}>~</p>
              <div>
                <Input className={cn("assistanceEndTime")} type="time" {...register("endTime")} />
                {errors.endTime && <p className={cn("errorMessage")}>{errors.endTime.message}</p>}
              </div>
            </div>
          </div>
        </div>
        <div className={cn("thoughtsContainer")}>
          <p className={cn("thoughtsTitle")}>6. 봉사 활동 내용 및 소감 </p>
          <header className={cn("thoughtsHeader")}>
            봉사 활동 내용 및 소감을 자유롭게 작성해 주세요. (150자 이상){" "}
          </header>
          <div className={cn("thoughtsContentBox")}>
            <Textarea
              placeholder="답변을 입력해 주세요."
              className={cn("thoughtsContent")}
              {...register("content", { required: true })}
            />
            {errors.content && <p className={cn("errorMessage")}>{errors.content.message}</p>}
          </div>
        </div>
        <button className={cn("completeVolunteeringBtn")}>봉사 인증 완료</button>
      </form>
      <Close className={cn("close")} onClick={() => setState((prev) => !prev)} />
    </Modal>
  );
}

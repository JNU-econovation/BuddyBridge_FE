import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

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
import Modal from "@/components/common/Modal/Modal";
import MyInfoCard from "@/components/common/MyInfoCard/MyInfoCard";
import RadioInput from "@/components/common/RadioInput/RadioInput";
import Textarea from "@/components/common/Textarea/Textarea";
import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/helpMeRegisterLayout/components/helpMeRegisterLayout.module.scss";
import { ROUTE } from "@/constants/route";
import Calendar from "@/icons/calendar.svg";
import RegisterArrow from "@/icons/send_arrow.svg";

import getMyInfo from "../../myPageEditLayout/apis/getMyInfo";
import postHelpMeRegister from "../apis/postHelpMeRegister";
import { helpMeFormData } from "../types";

const cn = classNames.bind(styles);

export default function HelpMeRegisterLayout() {
  const router = useRouter();
  const isMountedRef = useRef(false);
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
    formState: { isValid },
  } = useForm<helpMeFormData>({
    mode: "onChange",
  });

  const uploadHelpMeMutation = useMutation({
    mutationFn: (content: helpMeFormData) => postHelpMeRegister(content),
    onSuccess: () => {
      router.push(ROUTE.HELP_ME);
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
      postType: "TAKER",
      gender: myInfoData.gender,
      age: Number(myInfoData.age),
      disabilityType: myInfoData.disabilityType,
      assistanceStartTime: data.assistanceStartTime,
      assistanceEndTime: data.assistanceEndTime,
    };

    setContent(content);
  };

  useEffect(() => {
    if (myInfoData?.disabilityType === "없음" && !isMountedRef.current) {
      isMountedRef.current = true;
      router.push(ROUTE.MY_PAGE_EDIT);
      openToast("error", "장애 유형을 입력해주세요.");
      return;
    }
  }, [myInfoData, setValue, router]);

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
          <p className={cn("title")}>도와줄래요? 게시글 작성</p>
          <MyInfoCard />
          <form className={cn("form")} onSubmit={handleSubmit(handleHelpMetUpload)}>
            <div className={cn("formContentBox")}>
              <div className={cn("titleContainer")}>
                <Label className={cn("label")} htmlFor="title">
                  제목
                </Label>
                <hr />
                <Input
                  className={cn("titleInput")}
                  id="title"
                  placeholder="구체적으로 필요한 도움을 적어주세요. 예) 이동 도움 필요"
                  {...register("title")}
                />
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
                          onChange={field.onChange}
                          dateFormat="yyyy.MM.dd"
                          customInputRef={field.ref}
                          placeholder="0000.00.00"
                          classNames={cn("dateFont")}
                        />
                      )}
                    />
                    <Calendar className={cn("calendar")} />
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
                          dateFormat="yyyy.MM.dd"
                          customInputRef={field.ref}
                          placeholder="0000.00.00"
                          classNames={cn("dateFont")}
                        />
                      )}
                    />
                    <Calendar className={cn("calendar")} />
                  </div>
                </div>
              </div>
              <div className={cn("timeContainer")}>
                <Label className={cn("label")}>시간</Label>
                <hr />
                <div className={cn("timeBox")}>
                  <Input className={cn("assistanceStartTime")} type="time" {...register("assistanceStartTime")} />
                  <p className={cn("wave")}>~</p>
                  <Input className={cn("assistanceEndTime")} type="time" {...register("assistanceEndTime")} />
                </div>
              </div>
              <div className={cn("periodContainer")}>
                <Label className={cn("label")} htmlFor="scheduleType">
                  주기 구분
                </Label>
                <hr />
                <div className={cn("periodBox")}>
                  <Controller
                    name="scheduleType"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <RadioInput
                        postType="taker"
                        classNames={cn("period")}
                        {...field}
                        firstValue="정기"
                        secondValue="비정기"
                      />
                    )}
                  />
                  <Input
                    className={cn("periodDetailInput")}
                    id="scheduleDetails"
                    placeholder="예) 1째주, 화목"
                    {...register("scheduleDetails", { required: true })}
                  />
                </div>
              </div>
              <div className={cn("placeHelpTypeContainer")}>
                <Label className={cn("label")}>장소 & 장애유형</Label>
                <hr />
                <div className={cn("placeHelpTypeBox")}>
                  <div className={cn("placeBox")}>
                    <Dropdown
                      options={PLACE}
                      onSelection={(option) => setValue("district", option)}
                      placeholder="장소"
                      {...register("district", { required: true })}
                    />
                  </div>
                  <div className={cn("helpTypeBox")}>
                    <Dropdown
                      options={ASSISTANCE}
                      onSelection={(option) => setValue("assistanceType", option)}
                      placeholder="도움유형"
                      {...register("assistanceType", { required: true })}
                    />
                  </div>
                </div>
              </div>
              <div className={cn("detailContainer")}>
                <Label className={cn("label")} htmlFor="content">
                  상세 내용
                </Label>
                <hr />
                <Textarea
                  placeholder="도움이 필요한 정보를 상세하게 적어주세요. (인원/ 시간/ 세부 장소/ 도움 필요 내용)
ex, 2시에 전대치과병원에서 진료 이동 도움이 필요합니다."
                  id="content"
                  className={cn("detailTextarea")}
                  {...register("content", { required: true })}
                />
              </div>
              <Button className={cn("registerBox")} disabled={!isValid}>
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
          mutate={uploadHelpMeMutation.mutate}
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
        <p className={cn("modalTitle")}>
          <p>부적절한 게시글의 경우</p>
          <p>작성이 제한되며, 신고 및 삭제 될 수 있습니다.</p>
        </p>
        <p className={cn("modalContent")}>모두의 따뜻한 Buddy Bridge 사용을 위해 노력하겠습니다. </p>
      </div>
      <button onClick={handleConfirm} className={cn("modalBtnContent")}>
        네, 확인했습니다.
      </button>
    </Modal>
  );
}

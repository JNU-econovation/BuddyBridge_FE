import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/router";

import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/surveyLayout/components/surveyLayout.module.scss";
import { ROUTE } from "@/constants/route";
import { ErrorResponse } from "@/types/error";

import postSurvey from "../apis/postSurvey";

const cn = classNames.bind(styles);

export interface SurveyData {
  firstQuestion: "yse" | "no";
  firstQuestionAdditional: string;
  secondQuestion: "성능" | "디자인" | "기능 추가" | "기타";
  secondQuestionAdditional: string;
  thirdQuestion: "1점" | "2점" | "3점" | "4점" | "5점";
  thirdQuestionAdditional: string;
  fourthQuestion: "1점" | "2점" | "3점" | "4점" | "5점";
  fourthQuestionAdditional: string;
  fifthQuestion: "1점" | "2점" | "3점" | "4점" | "5점";
  fifthQuestionAdditional: string;
  sixthQuestion: "1점" | "2점" | "3점" | "4점" | "5점";
  sixthQuestionAdditional: string;
  seventhQuestion: "yes" | "no";
  seventhOneQuestion: string;
  participantEmail: string;
}

const surveySchema = z
  .object({
    firstQuestion: z
      .enum(["yes", "no"])
      .nullable()
      .refine((value) => value !== null, {
        message: "응답을 선택해주세요.",
      }),
    firstQuestionAdditional: z.string().min(1, "필수로 작성해주세요."),
    secondQuestion: z
      .enum(["성능", "디자인", "기능 추가", "기타"])
      .nullable()
      .refine((value) => value !== null, {
        message: "응답을 선택해주세요.",
      }),
    secondQuestionAdditional: z.string().min(1, "필수로 작성해주세요."),
    thirdQuestion: z
      .enum(["1점", "2점", "3점", "4점", "5점"])
      .nullable()
      .refine((value) => value !== null, {
        message: "응답을 선택해주세요.",
      }),
    thirdQuestionAdditional: z.string().optional(),
    fourthQuestion: z
      .enum(["1점", "2점", "3점", "4점", "5점"])
      .nullable()
      .refine((value) => value !== null, {
        message: "응답을 선택해주세요.",
      }),
    fourthQuestionAdditional: z.string().optional(),
    fifthQuestion: z
      .enum(["1점", "2점", "3점", "4점", "5점"])
      .nullable()
      .refine((value) => value !== null, {
        message: "응답을 선택해주세요.",
      }),
    fifthQuestionAdditional: z.string().optional(),
    sixthQuestion: z
      .enum(["1점", "2점", "3점", "4점", "5점"])
      .nullable()
      .refine((value) => value !== null, {
        message: "응답을 선택해주세요.",
      }),
    sixthQuestionAdditional: z.string().optional(),
    seventhQuestion: z
      .enum(["yes", "no"])
      .nullable()
      .refine((value) => value !== null, {
        message: "응답을 선택해주세요.",
      }),
    seventhOneQuestion: z.string().optional(),
    participantEmail: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.seventhQuestion === "yes" && !data.seventhOneQuestion) {
      ctx.addIssue({
        path: ["seventhOneQuestion"],
        code: z.ZodIssueCode.custom,
        message: "필수로 작성해주세요.",
      });
    }

    if (data.seventhOneQuestion === "yes" && !data.participantEmail) {
      ctx.addIssue({
        path: ["participantEmail"],
        code: z.ZodIssueCode.custom,
        message: "필수로 작성해주세요.",
      });
    }
  });

export default function SurveyLayout() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SurveyData>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      firstQuestion: undefined,
      firstQuestionAdditional: "",
      secondQuestion: undefined,
      secondQuestionAdditional: "",
      thirdQuestion: undefined,
      thirdQuestionAdditional: "",
      fourthQuestion: undefined,
      fourthQuestionAdditional: "",
      fifthQuestion: undefined,
      fifthQuestionAdditional: "",
      sixthQuestion: undefined,
      sixthQuestionAdditional: "",
      seventhQuestion: undefined,
      seventhOneQuestion: "",
      participantEmail: "",
    },
  });
  const [isClicked, setIsClicked] = useState({
    firstQuestion: false,
    secondQuestion: false,
    thirdQuestion: false,
    fourthQuestion: false,
    fifthQuestion: false,
    sixthQuestion: false,
    seventhQuestion: false,
    seventhOneQuestion: false,
  });

  const uploadHelpYouMutation = useMutation({
    mutationFn: (content: SurveyData) => postSurvey(content),
    onSuccess: () => {
      router.push(ROUTE.SURVEY_COMPLETE);
      openToast("success", "설문 조사가 완료되었습니다.");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data.error.invalidParams) {
        openToast("error", error.response.data.error.invalidParams[0].message);
      } else if (error.response?.data.error.message) {
        openToast("error", error.response.data.error.message);
      } else {
        openToast("error", "설문 조사 작성에 실패하였습니다.");
      }
    },
  });

  const handleSurveyUpload = (data: SurveyData) => {
    uploadHelpYouMutation.mutate(data);
  };

  return (
    <div className={cn("container")}>
      <form className={cn("form")} onSubmit={handleSubmit(handleSurveyUpload)}>
        <div className={cn("headerBox")}>
          <header className={cn("header")}>버디 브릿지 설문조사</header>
          <p className={cn("headerContent")}>본 설문은 사용자 만족도 조사입니다.</p>
          <p className={cn("headerContent")}>
            수집된 개인정보는 서비스 홍보 목적으로만 활용되며, 해당 목적이 완료된 후 즉시 안전하게 삭제됩니다.
          </p>
        </div>
        <div className={cn("questionBox")}>
          <header className={cn("questionHeader")}>1. 서비스에서 제공하는 기능이 충분하다고 생각하시나요?</header>
          <div className={cn("yesNoBox")}>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, firstQuestion: true })}
                type="radio"
                id="yes"
                {...register("firstQuestion")}
                value="yes"
              />
              <label htmlFor="yes" className={cn("label")}>
                예
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, firstQuestion: true })}
                type="radio"
                id="no"
                {...register("firstQuestion")}
                value="no"
              />
              <label htmlFor="no" className={cn("label")}>
                아니요
              </label>
            </div>
            {errors.firstQuestion && <p className={cn("errorMessage")}>{errors.firstQuestion.message}</p>}
          </div>
          {isClicked.firstQuestion && (
            <div className={cn("additionalQuestionBox")}>
              <p className={cn("additionalQuestion")}>추가로 필요한 기능이 있다면 무엇인가요?</p>
              <input
                type="text"
                {...register("firstQuestionAdditional")}
                placeholder="필수로 작성해주세요."
                className={cn("additionalQuestionInput")}
              />
              {errors.firstQuestionAdditional && (
                <p className={cn("errorMessage")}>{errors.firstQuestionAdditional.message}</p>
              )}
            </div>
          )}
        </div>
        <div className={cn("questionBox")}>
          <header className={cn("questionHeader")}>2. 서비스 개선이 필요하다고 느끼는 부분은 무엇인가요?</header>
          <div className={cn("multipleChoiceBox")}>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, secondQuestion: true })}
                type="radio"
                id="performance"
                {...register("secondQuestion")}
                value="성능"
              />
              <label htmlFor="performance" className={cn("label")}>
                성능
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, secondQuestion: true })}
                type="radio"
                id="design"
                {...register("secondQuestion")}
                value="디자인"
              />
              <label htmlFor="design" className={cn("label")}>
                디자인
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, secondQuestion: true })}
                type="radio"
                id="features"
                {...register("secondQuestion")}
                value="기능 추가"
              />
              <label htmlFor="features" className={cn("label")}>
                기능 추가
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, secondQuestion: true })}
                type="radio"
                id="etc"
                {...register("secondQuestion")}
                value="기타"
              />
              <label htmlFor="etc" className={cn("label")}>
                기타
              </label>
            </div>
            {errors.secondQuestion && <p className={cn("errorMessage")}>{errors.secondQuestion.message}</p>}
          </div>
          {isClicked.secondQuestion && (
            <div className={cn("additionalQuestionBox")}>
              <p className={cn("additionalQuestion")}>해당 부분을 선택하신 이유가 무엇인가요?</p>
              <input
                type="text"
                {...register("secondQuestionAdditional")}
                placeholder="필수로 작성해주세요."
                className={cn("additionalQuestionInput")}
              />
              {errors.secondQuestionAdditional && (
                <p className={cn("errorMessage")}>{errors.secondQuestionAdditional.message}</p>
              )}
            </div>
          )}
        </div>
        <div className={cn("questionBox")}>
          <header className={cn("questionHeader")}>
            3. 서비스 화면이 깔끔하고 필요한 정보를 잘 전달한다고 생각하시나요?
          </header>
          <div className={cn("multipleChoiceBox")}>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, thirdQuestion: true })}
                type="radio"
                id="thirdQuestionOnePoint"
                {...register("thirdQuestion")}
                value="1점"
              />
              <label htmlFor="thirdQuestionOnePoint" className={cn("label")}>
                1점
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                type="radio"
                onClick={() => setIsClicked({ ...isClicked, thirdQuestion: true })}
                id="thirdQuestionTwoPoint"
                {...register("thirdQuestion")}
                value="2점"
              />
              <label htmlFor="thirdQuestionTwoPoint" className={cn("label")}>
                2점
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, thirdQuestion: true })}
                type="radio"
                id="thirdQuestionThreePoint"
                {...register("thirdQuestion")}
                value="3점"
              />
              <label htmlFor="thirdQuestionThreePoint" className={cn("label")}>
                3점
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, thirdQuestion: true })}
                type="radio"
                id="thirdQuestionFourPoint"
                {...register("thirdQuestion")}
                value="4점"
              />
              <label htmlFor="thirdQuestionFourPoint" className={cn("label")}>
                4점
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, thirdQuestion: true })}
                type="radio"
                id="thirdQuestionFivePoint"
                {...register("thirdQuestion")}
                value="5점"
              />
              <label htmlFor="thirdQuestionFivePoint" className={cn("label")}>
                5점
              </label>
            </div>
            {errors.thirdQuestion && <p className={cn("errorMessage")}>{errors.thirdQuestion.message}</p>}
          </div>
          {isClicked.thirdQuestion && (
            <div className={cn("additionalQuestionBox")}>
              <p className={cn("additionalQuestion")}>이 점수를 선택하신 이유를 작성해 주세요.</p>
              <input
                type="text"
                {...register("thirdQuestionAdditional")}
                placeholder="작성해주시면 큰 도움이 됩니다."
                className={cn("additionalQuestionInput")}
              />
            </div>
          )}
        </div>
        <div className={cn("questionBox")}>
          <header className={cn("questionHeader")}>4. 봉사 인증 플로우 시스템이 사용하기 쉬웠나요?</header>
          <div className={cn("multipleChoiceBox")}>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, fourthQuestion: true })}
                type="radio"
                id="fourthQuestionOnePoint"
                {...register("fourthQuestion")}
                value="1점"
              />
              <label htmlFor="fourthQuestionOnePoint" className={cn("label")}>
                1점
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, fourthQuestion: true })}
                type="radio"
                id="fourthQuestionTwoPoint"
                {...register("fourthQuestion")}
                value="2점"
              />
              <label htmlFor="fourthQuestionTwoPoint" className={cn("label")}>
                2점
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, fourthQuestion: true })}
                type="radio"
                id="fourthQuestionThreePoint"
                {...register("fourthQuestion")}
                value="3점"
              />
              <label htmlFor="fourthQuestionThreePoint" className={cn("label")}>
                3점
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, fourthQuestion: true })}
                type="radio"
                id="fourthQuestionFourPoint"
                {...register("fourthQuestion")}
                value="4점"
              />
              <label htmlFor="fourthQuestionFourPoint" className={cn("label")}>
                4점
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, fourthQuestion: true })}
                type="radio"
                id="fourthQuestionFivePoint"
                {...register("fourthQuestion")}
                value="5점"
              />
              <label htmlFor="fourthQuestionFivePoint" className={cn("label")}>
                5점
              </label>
            </div>
            {errors.fourthQuestion && <p className={cn("errorMessage")}>{errors.fourthQuestion.message}</p>}
          </div>
          {isClicked.fourthQuestion && (
            <div className={cn("additionalQuestionBox")}>
              <p className={cn("additionalQuestion")}>이 점수를 선택하신 이유를 작성해 주세요.</p>
              <input
                type="text"
                {...register("fourthQuestionAdditional")}
                placeholder="작성해주시면 큰 도움이 됩니다."
                className={cn("additionalQuestionInput")}
              />
            </div>
          )}
        </div>
        <div className={cn("questionBox")}>
          <header className={cn("questionHeader")}>
            5. 필요한 장애 지원 인력을 찾는 과정이 이 서비스를 통해 얼마나 간편해졌다고 느끼셨나요?
          </header>
          <div className={cn("multipleChoiceBox")}>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, fifthQuestion: true })}
                type="radio"
                id="fifthQuestionOnePoint"
                {...register("fifthQuestion")}
                value="1점"
              />
              <label htmlFor="fifthQuestionOnePoint" className={cn("label")}>
                1점
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, fifthQuestion: true })}
                type="radio"
                id="fifthQuestionTwoPoint"
                {...register("fifthQuestion")}
                value="2점"
              />
              <label htmlFor="fifthQuestionTwoPoint" className={cn("label")}>
                2점
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, fifthQuestion: true })}
                type="radio"
                id="fifthQuestionThreePoint"
                {...register("fifthQuestion")}
                value="3점"
              />
              <label htmlFor="fifthQuestionThreePoint" className={cn("label")}>
                3점
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, fifthQuestion: true })}
                type="radio"
                id="fifthQuestionFourPoint"
                {...register("fifthQuestion")}
                value="4점"
              />
              <label htmlFor="fifthQuestionFourPoint" className={cn("label")}>
                4점
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                onClick={() => setIsClicked({ ...isClicked, fifthQuestion: true })}
                type="radio"
                id="fifthQuestionFivePoint"
                {...register("fifthQuestion")}
                value="5점"
              />
              <label htmlFor="fifthQuestionFivePoint" className={cn("label")}>
                5점
              </label>
            </div>
            {errors.fifthQuestion && <p className={cn("errorMessage")}>{errors.fifthQuestion.message}</p>}
          </div>
          {isClicked.fifthQuestion && (
            <div className={cn("additionalQuestionBox")}>
              <p className={cn("additionalQuestion")}>이 점수를 선택하신 이유를 작성해 주세요.</p>
              <input
                type="text"
                {...register("fifthQuestionAdditional")}
                placeholder="작성해주시면 큰 도움이 됩니다."
                className={cn("additionalQuestionInput")}
              />
            </div>
          )}
        </div>
        <div className={cn("questionBox")}>
          <header className={cn("questionHeader")}>6. 서비스의 전반적인 완성도를 평가해주세요.</header>
          <div className={cn("multipleChoiceBox")}>
            <div className={cn("labelBox")}>
              <input
                type="radio"
                onClick={() => setIsClicked({ ...isClicked, sixthQuestion: true })}
                id="sixthQuestionOnePoint"
                {...register("sixthQuestion")}
                value="1점"
              />
              <label htmlFor="sixthQuestionOnePoint" className={cn("label")}>
                1점
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                type="radio"
                onClick={() => setIsClicked({ ...isClicked, sixthQuestion: true })}
                id="sixthQuestionTwoPoint"
                {...register("sixthQuestion")}
                value="2점"
              />
              <label htmlFor="sixthQuestionTwoPoint" className={cn("label")}>
                2점
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                type="radio"
                onClick={() => setIsClicked({ ...isClicked, sixthQuestion: true })}
                id="sixthQuestionThreePoint"
                {...register("sixthQuestion")}
                value="3점"
              />
              <label htmlFor="sixthQuestionThreePoint" className={cn("label")}>
                3점
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                type="radio"
                onClick={() => setIsClicked({ ...isClicked, sixthQuestion: true })}
                id="sixthQuestionFourPoint"
                {...register("sixthQuestion")}
                value="4점"
              />
              <label htmlFor="sixthQuestionFourPoint" className={cn("label")}>
                4점
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                type="radio"
                onClick={() => setIsClicked({ ...isClicked, sixthQuestion: true })}
                id="sixthQuestionFivePoint"
                {...register("sixthQuestion")}
                value="5점"
              />
              <label htmlFor="sixthQuestionFivePoint" className={cn("label")}>
                5점
              </label>
            </div>
            {errors.sixthQuestion && <p className={cn("errorMessage")}>{errors.sixthQuestion.message}</p>}
          </div>
          {isClicked.sixthQuestion && (
            <div className={cn("additionalQuestionBox")}>
              <p className={cn("additionalQuestion")}>이 점수를 선택하신 이유를 작성해 주세요.</p>
              <input
                type="text"
                {...register("sixthQuestionAdditional")}
                placeholder="작성해주시면 큰 도움이 됩니다."
                className={cn("additionalQuestionInput")}
              />
            </div>
          )}
        </div>
        <div className={cn("questionBox")}>
          <header className={cn("questionHeader")}>
            7. 서비스가 현재 상태에서도 충분히 실사용 가능하다고 느끼셨나요?
          </header>
          <div className={cn("yesNoBox")}>
            <div className={cn("labelBox")}>
              <input
                type="radio"
                onClick={() => setIsClicked({ ...isClicked, seventhQuestion: true })}
                id="seventh-yes"
                {...register("seventhQuestion")}
                value="yes"
              />
              <label htmlFor="seventh-yes" className={cn("label")}>
                예
              </label>
            </div>
            <div className={cn("labelBox")}>
              <input
                type="radio"
                onClick={() => {
                  setIsClicked({ ...isClicked, seventhQuestion: false, seventhOneQuestion: false });
                }}
                id="seventh-no"
                {...register("seventhQuestion")}
                value="no"
              />
              <label htmlFor="seventh-no" className={cn("label")}>
                아니요
              </label>
            </div>
            {errors.seventhQuestion && <p className={cn("errorMessage")}>{errors.seventhQuestion.message}</p>}
          </div>
          {isClicked.seventhQuestion && (
            <div className={cn("additionalQuestionBox")}>
              <header className={cn("additionalQuestion")}>
                7-1 그렇다면, 귀하는 이 서비스를 실사용 해보실 의향이 있습니까?
              </header>
              <div className={cn("yesNoBox")}>
                <div className={cn("labelBox")}>
                  <input
                    onClick={() => setIsClicked({ ...isClicked, seventhOneQuestion: true })}
                    type="radio"
                    id="seventh-one-yes"
                    {...register("seventhOneQuestion")}
                    value="yes"
                  />
                  <label htmlFor="seventh-one-yes" className={cn("label")}>
                    예
                  </label>
                </div>
                <div className={cn("labelBox")}>
                  <input
                    onClick={() => setIsClicked({ ...isClicked, seventhOneQuestion: false })}
                    type="radio"
                    id="seventh-one-no"
                    {...register("seventhOneQuestion")}
                    value="no"
                  />
                  <label htmlFor="seventh-one-no" className={cn("label")}>
                    아니요
                  </label>
                </div>
                {errors.seventhOneQuestion && <p className={cn("errorMessage")}>{errors.seventhOneQuestion.message}</p>}
              </div>
            </div>
          )}
          {isClicked.seventhOneQuestion && (
            <div className={cn("additionalQuestionBox")}>
              <p className={cn("additionalQuestion")}>7-2 참여자의 이메일을 작성해주세요.</p>
              <input
                type="text"
                {...register("participantEmail")}
                placeholder="example@naver.com"
                className={cn("additionalQuestionInput")}
              />
              {errors.participantEmail && <p className={cn("errorMessage")}>{errors.participantEmail.message}</p>}
            </div>
          )}
        </div>
        <button type="submit" className={cn("submitBtn")}>
          제출하기
        </button>
      </form>
    </div>
  );
}

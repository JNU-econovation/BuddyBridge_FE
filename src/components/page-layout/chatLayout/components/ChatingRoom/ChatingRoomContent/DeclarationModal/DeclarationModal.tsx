import { Dispatch, SetStateAction } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { z } from "zod";

import DropDown from "@/components/common/DropDown/DropDown";
import Modal from "@/components/common/Modal/Modal";
import Textarea from "@/components/common/Textarea/Textarea";
import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/DeclarationModal/DeclarationModal.module.scss";
import Alert from "@/icons/alert.svg";
import Close from "@/icons/close.svg";

import getDeclarationType from "./apis/getDeclarationType";
import postMatchingsDeclaration from "./apis/postMatchingsDeclaration";

const cn = classNames.bind(styles);

interface DeclarationModalProps {
  setState: Dispatch<SetStateAction<boolean>>;
  postType: "TAKER" | "GIVER";
  postId: number;
  name: string;
  chattingRoomId: number;
}

interface FormData {
  reportType: "욕설/혐오/차별적 표현" | "불쾌한 표현" | "스팸/홍보/도배글" | "불법정보 포함" | "기타";
  reportReason: string;
}

interface ErrorType {
  response: {
    data: {
      error: {
        message: string;
      };
    };
  };
}

const declarationSchema = z.object({
  reportType: z.string().min(1, "신고할 유형을 선택해 주세요."),
  reportReason: z.string().min(1, "신고할 내용을 입력해 주세요."),
});

export default function DeclarationModal({ setState, postId, postType, name, chattingRoomId }: DeclarationModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(declarationSchema),
    mode: "onSubmit",
  });

  const { data, isError, isPending } = useQuery({
    queryKey: ["declaration"],
    queryFn: () => getDeclarationType(),
  });

  const uploadHelpYouMutation = useMutation({
    mutationFn: (content: FormData) => postMatchingsDeclaration(content, chattingRoomId),
    onSuccess: () => {
      setState((prev) => !prev);
      openToast("success", "신고가 완료되었습니다.");
    },
    onError: (error: ErrorType) => {
      openToast("warn", error.response.data.error.message);
      setState((prev) => !prev);
    },
  });

  const handleVolunteerComplete = (data: FormData) => {
    uploadHelpYouMutation.mutate(data);
  };

  if (isError) {
    return <>...에러</>;
  }

  if (isPending) {
    return <>...로딩중</>;
  }

  return (
    <Modal className={cn("modal")} setState={setState}>
      <div className={cn("headerBox")}>
        <header>신고하기</header>
        <Close className={cn("close")} onClick={() => setState((prev) => !prev)} />
      </div>
      <div className={cn("informationBox")}>
        <div className={cn("userInformationBox")}>
          <p className={cn("userInformationTitle")}>신고 대상자</p>
          <p className={cn("boundary")}>|</p>
          <p className={cn("userInformationContent")}>{name}</p>
        </div>
        <div className={cn("postInformationBox")}>
          <p className={cn("postInformationTitle")}>게시글 정보</p>
          <p className={cn("boundary")}>|</p>
          <p className={cn("postInformationContent")}>
            {postType === "GIVER" ? "도와줄게요! " : "도와줄래요? "}
            {postId}
          </p>
        </div>
      </div>
      <form className={cn("form")} onSubmit={handleSubmit(handleVolunteerComplete)}>
        <div className={cn("declarationTypeBox")}>
          <p className={cn("declarationTypeTitle")}>신고 유형</p>
          <DropDown
            options={data}
            onSelection={(option) =>
              setValue(
                "reportType",
                option as "욕설/혐오/차별적 표현" | "불쾌한 표현" | "스팸/홍보/도배글" | "불법정보 포함" | "기타",
                { shouldValidate: true },
              )
            }
            classNames={cn("declarationType")}
            optionClassNames={cn("declarationTypeOption")}
            placeholder="신고할 유형을 선택해 주세요."
            {...register("reportType", { required: true })}
          />
          {errors.reportType && <p className={cn("errorMessage")}>{errors.reportType.message}</p>}
        </div>
        <div className={cn("declarationContentBox")}>
          <p className={cn("declarationTitle")}>신고 내용</p>
          <Textarea
            placeholder="신고 이유 및 내용을 자세하게 설명해 주세요."
            className={cn("declarationContent")}
            {...register("reportReason", { required: true })}
          />{" "}
          {errors.reportReason && <p className={cn("errorMessage")}>{errors.reportReason.message}</p>}
        </div>
        <div className={cn("warningContainer")}>
          <div className={cn("warningBox")}>
            <div>
              <Alert />
            </div>
            <p>신고하는 것에 해당하는지와 신고 내용이 맞는지 다시 한 번 확인하여 주시기 바랍니다.</p>
          </div>
          <div className={cn("warningBox")}>
            <div>
              <Alert />
            </div>
            <p>신고를 제출하면 사실 관계 확인을 위해 신고자에게 객관적인 자료를 요청할 수 있습니다.</p>
          </div>
          <div className={cn("warningBox")}>
            <div>
              <Alert />
            </div>
            <p>
              신고자 정보 및 신고 내용은 신고 대상에게 공개되지 않으나, 사실 관계 확인에 꼭 필요한 신고 내용의 일부는
              언급될 수 있습니다.
            </p>
          </div>
          <div className={cn("warningBox")}>
            <div>
              <Alert />
            </div>
            <p>
              신고 대상은 Buddy Bridge 이용 약관에 따라 활동 제한 등 불이익을 받을 수 있으며, 사실 관계 확인 시 서로의
              과실일 경우 신고자 또한 활동 제한 등의 불이익을 받을 수 있습니다.
            </p>
          </div>
        </div>
        <button className={cn("declarationBtn")}>신고하기</button>
      </form>
    </Modal>
  );
}

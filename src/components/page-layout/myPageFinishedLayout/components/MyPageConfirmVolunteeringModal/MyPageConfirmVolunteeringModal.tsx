import { Dispatch, SetStateAction } from "react";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames/bind";

import Modal from "@/components/common/Modal/Modal";
import openToast from "@/components/common/Toast/features/openToast";
import putMatchingStatus from "@/components/page-layout/chatLayout/apis/putMatchingStatus";
import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/ConfirmVolunteeringModal/ConfirmVolunteeringModal.module.scss";
import Close from "@/icons/close.svg";

const cn = classNames.bind(styles);

interface PutMatchingType {
  matchingId: number;
  status: string;
}

interface ErrorType {
  error: {
    message: string;
  };
}

interface ConfirmVolunteeringModalProps {
  setState: Dispatch<SetStateAction<boolean>>;
  postType: "TAKER" | "GIVER";
  postId: number;
  matchingId: number;
  setIsCompleteVolunteeringModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsGetNoVolunteeringModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ConfirmVolunteeringModal({
  setState,
  matchingId,
  postId,
  postType,
  setIsCompleteVolunteeringModalOpen,
  setIsGetNoVolunteeringModalOpen,
}: ConfirmVolunteeringModalProps) {
  const matchingStatusMutation = useMutation({
    mutationFn: ({ matchingId, status }: PutMatchingType) => putMatchingStatus(matchingId, status),
    onSuccess: (variables) => {
      setState((prev) => !prev);
      if(variables.status === "MARK_AS_HELP_NOT_RECEIVED") {
        setIsGetNoVolunteeringModalOpen((prev) => !prev);
      } else {
        setIsCompleteVolunteeringModalOpen((prev) => !prev);
      }
      window.location.reload();
    },
    onError: (error: AxiosError<ErrorType>) => {
      if (error.response) {
        openToast("warn", error.response.data.error.message);
        setState((prev) => !prev);
      }
    },
  });

  const handleGetNoHelpBtnClick = () => {
    matchingStatusMutation.mutate({matchingId, status:"MARK_AS_HELP_NOT_RECEIVED"});
  };

  const handleGetHelpBtnClick = () => {
    matchingStatusMutation.mutate({matchingId, status:"MARK_AS_HELP_RECEIVED"});
  };

  return (
    <Modal className={cn("modal")} setState={setState}>
      <div className={cn("contentBox")}>
        <div className={cn("contentHeaderBox")}>
          <p className={cn("contentHeader")}>
            {postType === "GIVER" ? "도와줄게요! " : "도와줄래요? "}
            {postId}번
          </p>
          봉사 완료 하셨나요?
        </div>
        <p className={cn("content")}>‘도움을 받았어요’ 버튼을 누르면, 봉사자는 봉사 인증을 할 수 있습니다. </p>
      </div>
      <div className={cn("btnBox")}>
        <button className={cn("getNoHelpBtn")} onClick={handleGetNoHelpBtnClick}>
          도움을 받지 못했어요.
        </button>
        <button className={cn("getHelpBtn")} onClick={handleGetHelpBtnClick}>
          도움을 받았어요!
        </button>
      </div>
      <Close className={cn("close")} onClick={() => setState((prev) => !prev)} />
    </Modal>
  );
}

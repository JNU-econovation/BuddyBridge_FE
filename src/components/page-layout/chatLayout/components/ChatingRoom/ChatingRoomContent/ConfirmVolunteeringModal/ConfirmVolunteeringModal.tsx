import { Dispatch, SetStateAction } from "react";

import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Modal from "@/components/common/Modal/Modal";
import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/ConfirmVolunteeringModal/ConfirmVolunteeringModal.module.scss";
import Close from "@/icons/close.svg";

const cn = classNames.bind(styles);

interface PutMatchingType {
  chattingRoomId: number;
  status: string;
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

interface VolunteeringMutationOptions {
  onSuccess?: () => void;
  onError?: (error: ErrorType, variables: PutMatchingType, context: unknown) => void;
}

interface ConfirmVolunteeringModalProps {
  setState: Dispatch<SetStateAction<boolean>>;
  postType: "TAKER" | "GIVER";
  postId: number;
  chattingRoomId: number;
  setIsCompleteVolunteeringModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsGetNoVolunteeringModalOpen: Dispatch<SetStateAction<boolean>>;
  volunteeringMutation: (data: PutMatchingType, options?: VolunteeringMutationOptions) => void;
}

export default function ConfirmVolunteeringModal({
  setState,
  postId,
  postType,
  setIsCompleteVolunteeringModalOpen,
  setIsGetNoVolunteeringModalOpen,
  chattingRoomId,
  volunteeringMutation,
}: ConfirmVolunteeringModalProps) {
  const queryClient = useQueryClient();

  const handleGetNoHelpBtnClick = () => {
    volunteeringMutation(
      { chattingRoomId, status: "MARK_AS_HELP_NOT_RECEIVED" },
      {
        onSuccess: () => {
          setState((prev) => !prev);
          setIsGetNoVolunteeringModalOpen((prev) => !prev);
          queryClient.invalidateQueries({ queryKey: ["chattingRoomData", chattingRoomId] });
        },
        onError: (error) => {
          openToast("warn", error.response.data.error.message);
          setState((prev) => !prev);
        },
      },
    );
  };

  const handleGetHelpBtnClick = () => {
    volunteeringMutation(
      { chattingRoomId, status: "MARK_AS_HELP_RECEIVED" },
      {
        onSuccess: () => {
          setState((prev) => !prev);
          setIsCompleteVolunteeringModalOpen((prev) => !prev);
          queryClient.invalidateQueries({ queryKey: ["chattingRoomData", chattingRoomId] });
        },
        onError: (error) => {
          openToast("warn", error.response.data.error.message);
          setState((prev) => !prev);
        },
      },
    );
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

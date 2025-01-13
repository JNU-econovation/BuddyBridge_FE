import { Dispatch, SetStateAction } from "react";

import classNames from "classnames/bind";

import Modal from "@/components/common/Modal/Modal";
import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/CompleteVolunteeringModal/CompleteVolunteeringModal.module.scss";

const cn = classNames.bind(styles);

interface CompleteVolunteeringModalProps {
  setState: Dispatch<SetStateAction<boolean>>;
  postType: "TAKER" | "GIVER";
  postId: number;
}

export default function CompleteVolunteeringModal({ setState, postId, postType }: CompleteVolunteeringModalProps) {
  return (
    <Modal className={cn("modal")} setState={setState}>
      <div className={cn("contentBox")}>
        <div className={cn("contentHeaderContainer")}>
          <div className={cn("contentHeaderBox")}>
            <p className={cn("contentHeader")}>
              {postType === "GIVER" ? "도와줄게요! " : "도와줄래요? "}
              {postId}번
            </p>
            봉사를 완료하였습니다.
          </div>
          <p>봉사자는 봉사 인증을 할 수 있게 됩니다.</p>
        </div>
        <p className={cn("content")}>모두의 따뜻한 Buddy Bridge 사용을 위해 노력하겠습니다. </p>
      </div>
      <button className={cn("confirmBtn")} onClick={() => setState((prev) => !prev)}>
        네, 확인했습니다.
      </button>
    </Modal>
  );
}

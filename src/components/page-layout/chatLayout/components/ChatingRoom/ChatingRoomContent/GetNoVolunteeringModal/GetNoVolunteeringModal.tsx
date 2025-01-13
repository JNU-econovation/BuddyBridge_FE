import { Dispatch, SetStateAction } from "react";

import classNames from "classnames/bind";

import Modal from "@/components/common/Modal/Modal";
import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/GetNoVolunteeringModal/GetNoVolunteeringModal.module.scss";

const cn = classNames.bind(styles);

interface GetNoVolunteeringModalProps {
  setState: Dispatch<SetStateAction<boolean>>;
  postType: "TAKER" | "GIVER";
  postId: number;
  nickName: string;
}

export default function GetNoVolunteeringModal({ setState, postId, postType, nickName }: GetNoVolunteeringModalProps) {
  return (
    <Modal className={cn("modal")} setState={setState}>
      <div className={cn("contentBox")}>
        <div className={cn("contentHeaderBox")}>
          <p className={cn("contentHeader")}>
            {postType === "GIVER" ? "도와줄게요! " : "도와줄래요? "}
            {postId}번
          </p>
          봉사를 완료하지 못했습니다.
        </div>
        <div className={cn("detailContentContainer")}>
          <div className={cn("detailContentBox")}>
            <p>봉사를 완료 할 수 있도록</p>
            <div className={cn("detailContent")}>
              게시글 상태는 ‘매칭중’으로 변경되며,
              <p className={cn("postType")}>&apos;{postType === "GIVER" ? "도와줄게요! " : "도와줄래요? "}&apos;</p>
              에서 글을 확인할 수 있게 됩니다.
            </div>
          </div>
          <div className={cn("nickNameContainer")}>
            <p className={cn("nickName")}>{`'${nickName}'`}</p>
            님과는 이제 매칭이 불가능합니다.
          </div>
        </div>
      </div>
      <button className={cn("confirmBtn")} onClick={() => setState((prev) => !prev)}>
        네, 확인했습니다.
      </button>
    </Modal>
  );
}

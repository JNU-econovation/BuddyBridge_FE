import { Dispatch, SetStateAction } from "react";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Modal from "@/components/common/Modal/Modal";
import getCertification from "@/components/page-layout/chatLayout/apis/getCertification";
import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/CertifyVolunteeringModal/CertifyVolunteeringModal.module.scss";
import Calendar from "@/icons/calendar.svg";
import Close from "@/icons/close.svg";

const cn = classNames.bind(styles);

interface CertifyVolunteeringModalProps {
  setState: Dispatch<SetStateAction<boolean>>;
  matchingId: number;
}

export default function CertifyVolunteeringModal({ setState, matchingId }: CertifyVolunteeringModalProps) {
  const { data, isError, isPending } = useQuery({
    queryKey: ["certification", matchingId],
    queryFn: () => getCertification(matchingId),
  });

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
      <div className={cn("form")}>
        <div className={cn("nameBox")}>
          <p className={cn("nameTitle")}>1. 봉사자 이름</p>
          <p className={cn("name")}>{data.volunteerName}</p>
        </div>
        <div className={cn("emailBox")}>
          <p className={cn("emailTitle")}>2. 봉사자 이메일</p>
          <p className={cn("email")}>{data.volunteerEmail}</p>
        </div>
        <div className={cn("postBox")}>
          <p className={cn("postTitle")}>3. 봉사한 게시글</p>
          <div className={cn("postContentBox")}>
            <p className={cn("postType")}>{data.postType}</p>
            <p className={cn("postId")}>{data.postId}</p>
          </div>
        </div>
        <div className={cn("dateContainer")}>
          <p className={cn("dateTitle")}>4. 봉사 일자</p>
          <div className={cn("dateBox")}>
            <Calendar className={cn("calendar")} />
            <p className={cn("volunteeringDate")}>{data.volunteerDate}</p>
          </div>
        </div>
        <div className={cn("helpTypeTimeContainer")}>
          <p className={cn("timeTitle")}>5. 봉사 시간</p>
          <div className={cn("helpTypeTimeBox")}>
            <div className={cn("helpTypeBox")}>{data.assistanceType}</div>
            <div className={cn("assistanceStartTimeContainer")}>
              <div className={cn("assistanceStartTime")}>{data.startTime}</div>
              <p className={cn("wave")}>~</p>
              <div className={cn("assistanceEndTime")}>{data.endTime}</div>
            </div>
          </div>
        </div>
        <div className={cn("thoughtsContainer")}>
          <p className={cn("thoughtsTitle")}>6. 봉사 활동 내용 및 소감 </p>
          <header className={cn("thoughtsHeader")}>
            봉사 활동 내용 및 소감을 자유롭게 작성해 주세요. (200자 이상)
          </header>
          <textarea readOnly className={cn("thoughtsContentBox")}>
            {data.content}
          </textarea>
        </div>
      </div>
      <Close className={cn("close")} onClick={() => setState((prev) => !prev)} />
    </Modal>
  );
}

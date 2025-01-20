import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames/bind";

import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/components/common/CertificationDetail/CertificationDetail.module.scss";
import deleteCertification from "@/components/page-layout/certificationLayout/apis/deleteCertification";
import postCertification from "@/components/page-layout/certificationLayout/apis/postCertification";
import { ROUTE } from "@/constants/route";

import openToast from "../Toast/features/openToast";

const cn = classNames.bind(styles);

interface CertificationDetailProps {
  volunteeringDetail: {
    assistanceType: "학습" | "식사" | "이동" | "기타";
    certificationCreatedDate: string;
    certificationId: number;
    endTime: string;
    isCertified: boolean;
    postId: number;
    postType: "TAKER" | "GIVER";
    startTime: string;
    volunteerContent: string;
    volunteerDate: string;
    volunteerEmail: string;
    volunteerName: string;
    volunteerNickname: string;
  };
}

interface deleteCertificationErrorResponse {
  error: {
    message: string;
  };
}

export default function CertificationDetail({ volunteeringDetail }: CertificationDetailProps) {
  const router = useRouter();

  const deleteCertificationMutation = useMutation({
    mutationFn: (id: number) => deleteCertification(id),
    onSuccess: () => {
      router.push(ROUTE.ADMIN_CERTIFICATION);
      openToast("success", "삭제되었습니다.");
    },
    onError: (error: AxiosError<deleteCertificationErrorResponse>) => {
      if (error.response) {
        openToast("error", error.response.data.error.message);
      }
    },
  });

  const postCertificationMutation = useMutation({
    mutationFn: (id: number) => postCertification(id),
    onSuccess: () => {
      router.push(ROUTE.ADMIN_CERTIFICATION);
      openToast("success", "봉사 시간 부여가 완료되었습니다.");
    },
    onError: (error: AxiosError<deleteCertificationErrorResponse>) => {
      if (error.response) {
        openToast("error", error.response.data.error.message);
      }
    },
  });

  const handleCertificationPostClick = () => {
    postCertificationMutation.mutate(Number(router.query.id));
  };

  const handleCommentDeleteClick = () => {
    deleteCertificationMutation.mutate(Number(router.query.id));
  };

  return (
    <div className={cn("container")}>
      <div className={cn("headerBox")}>
        <Link href={ROUTE.ADMIN_CERTIFICATION}>&larr; 봉사 인증 내용</Link>
        <div className={cn("headerDetailBox")}>
          <div className={cn("volunteerBox")}>
            <p className={cn("volunteerTitle")}>봉사자 닉네임</p>
            <p className={cn("boundary")}>|</p>
            <p className={cn("volunteer")}>{volunteeringDetail.volunteerNickname}</p>
          </div>
          <div className={cn("certificationCreatedDateBox")}>
            <p className={cn("certificationCreatedDateTitle")}>작성 일시</p>
            <p className={cn("boundary")}>|</p>
            <p className={cn("certificationCreatedDate")}>{volunteeringDetail.certificationCreatedDate}</p>
          </div>
        </div>
      </div>
      <div className={cn("volunteerContentBox")}>
        <div className={cn("volunteerNameBox")}>
          <p className={cn("volunteerNameTitle")}>1. 봉사자 이름</p>
          <p className={cn("volunteerName")}>{volunteeringDetail.volunteerName}</p>
        </div>
        <div className={cn("volunteerNicknameBox")}>
          <p className={cn("volunteerNicknameTitle")}>2. 봉사자 닉네임</p>
          <p className={cn("volunteerNickname")}>{volunteeringDetail.volunteerNickname}</p>
        </div>
        <div className={cn("postBox")}>
          <p className={cn("postTitle")}>3. 봉사한 게시글</p>
          <div className={cn("postDetailBox")}>
            <p className={cn("post")}>{volunteeringDetail.postType === "GIVER" ? "도와줄게요!" : "도와줄래요?"}</p>
            <p className={cn("post")}>{volunteeringDetail.postId}</p>
          </div>
        </div>
        <div className={cn("volunteerDateBox")}>
          <p className={cn("volunteerDateTitle")}>4. 봉사 일자</p>
          <p className={cn("volunteerDate")}>{volunteeringDetail.volunteerDate}</p>
        </div>
        <div className={cn("volunteerTimeBox")}>
          <p className={cn("volunteerTimeTitle")}>5. 봉사 시간</p>
          <div className={cn("volunteerTimeDetailBox")}>
            <p className={cn("assistanceType")}>{volunteeringDetail.assistanceType}</p>
            <p className={cn("startTime")}>{volunteeringDetail.startTime}</p>
            <p className={cn("endTime")}>{volunteeringDetail.endTime}</p>
          </div>
        </div>
        <div className={cn("volunteerDetailContentBox")}>
          <p className={cn("volunteerContentTitle")}>6. 봉사 활동 내용 및 소감</p>
          <textarea readOnly className={cn("volunteerContent")}>
            {volunteeringDetail.volunteerContent}
          </textarea>
        </div>
        <div className={cn("btnContainer")}>
          <div className={cn("btnBox")}>
            <button onClick={handleCommentDeleteClick} className={cn("deleteBtn")}>
              삭제하기
            </button>
            <button onClick={handleCertificationPostClick} className={cn("blackListBtn")}>
              봉사 시간 부여
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

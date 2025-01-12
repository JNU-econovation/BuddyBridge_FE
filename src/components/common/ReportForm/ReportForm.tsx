import { FormEvent, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import openToast from "@/components/common/Toast/features/openToast";

import getReportTypes from "./apis/getReportTypes";
import sendReport from "./apis/sendReport";
import styles from "./ReportForm.module.scss";
import InfoIcon from "../../../../public/icons/info.svg";

const cn = classNames.bind(styles);

interface reportProps {
  reportType: string;
  reportReason: string;
}

interface formProps {
  nickname: string;
  postId: number;
  postType: string;
  contentType: string;
  content: string;
  setIsReportOpen: (value: boolean) => void;
}

interface errorProps {
  response: {
    data: {
      error: {
        code: string;
        message: string;
      };
    };
  };
}

export default function ReportForm({ nickname, postId, postType, contentType, content, setIsReportOpen }: formProps) {
  const [reportType, setReportType] = useState("");
  const [reportContent, setReportContent] = useState("");

  const { data: reportTypes } = useQuery({
    queryKey: ["reportTypes"],
    queryFn: () => getReportTypes(),
  });

  const reportMutation = useMutation({
    mutationFn: (reportData: { contentType: string; id: number; content: reportProps }) =>
      sendReport(reportData.contentType, reportData.id, reportData.content),
    onSuccess: () => {
      setIsReportOpen(false);
      openToast("success", "신고가 성공적으로 접수되었습니다.");
    },
    onError: (error: errorProps) => {
      if (error.response.data.error.code === "R002") {
        openToast("error", error.response.data.error.message);
      } else {
        openToast("error", "신고를 접수하는 중 문제가 발생했습니다. 다시 시도해 주세요.");
      }
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!reportType) {
      openToast("warn", "신고 유형을 선택해 주세요.");
      return;
    }

    if (reportType === "기타 (신고 내용을 필수로 작성해 주세요!)" && !reportContent) {
      openToast("warn", "신고 내용을 작성해 주세요.");
      return;
    }

    const reportData = {
      contentType,
      id: postId,
      content: {
        reportType,
        reportReason: reportContent,
      },
    };

    reportMutation.mutate(reportData);
  };

  return (
    <div className={cn("reportFormContainer")}>
      <div className={cn("header")}>
        <h2 className={cn("headerText")}>신고하기</h2>
        <button onClick={() => setIsReportOpen(false)} className={cn("closeBtn")}>
          X
        </button>
      </div>
      <form onSubmit={handleSubmit} className={cn("contentBox")}>
        <div className={cn("postInfo")}>
          <p className={cn("postInfoContent")}>
            <span className={cn("postInfoLabel")}>작성자 닉네임</span>
            <span className={cn("bar")}>|</span>
            {nickname}
          </p>
          <p className={cn("postInfoContent")}>
            <span className={cn("postInfoLabel")}>게시글 정보</span>
            <span className={cn("bar")}>|</span>
            {postId}
          </p>
          <p className={cn("postInfoContent")}>
            {contentType === "posts" ? (
              <span className={cn("postInfoLabel")}>신고 대상 내용</span>
            ) : (
              <span className={cn("postInfoLabel")}>신고 대상 내용</span>
            )}
            <span className={cn("bar")}>|</span>
            {content}
          </p>
        </div>
        <div className={cn("reportInfo")}>
          <div className={cn("reportTypeBox")}>
            <span className={cn("reportInfoLabel")}>신고 유형</span>
            <select
              value={reportType}
              required
              onChange={(e) => setReportType(e.target.value)}
              className={cn("selectTypeBox", { defaultMsg: reportType === "" })}
            >
              <option value="">신고할 유형을 선택해 주세요.</option>
              {reportTypes?.map((value: string, index: number) =>
                value === "기타" ? (
                  <option key={index}>{value} (신고 내용을 필수로 작성해 주세요!)</option>
                ) : (
                  <option key={index}>{value}</option>
                ),
              )}
            </select>
          </div>
          <div className={cn("reportContentBox")}>
            <span className={cn("reportInfoLabel")}>신고 내용</span>
            <textarea
              placeholder="신고 이유 및 내용을 자세하게 설명해 주세요"
              required={reportType === "기타"}
              onChange={(e) => setReportContent(e.target.value)}
              className={cn("reportContent")}
            />
          </div>
        </div>
        <div className={cn("noticeBox")}>
          <p>
            <InfoIcon className={cn("infoIcon")} />
            신고하는 것에 해당하는지와 신고 내용이 맞는지 다시 한 번 확인하여 주시기 바랍니다.
          </p>
          <p>
            <InfoIcon className={cn("infoIcon")} />
            신고를 제출하면 사실 관계 확인을 위해 신고자에게 객관적인 자료를 요청할 수 있습니다.
          </p>
          <p>
            <InfoIcon className={cn("infoIcon")} />
            신고자 정보 및 신고 내용은 신고 대상에게 공개되지 않으나, 사실 관계 확인에 꼭 필요한 신고 내용의 일부는
            언급될 수 있습니다.
          </p>
          <p>
            <InfoIcon className={cn("infoIcon")} />
            신고 대상은 Buddy Bridge 이용 약관에 따라 활동 제한 등 불이익을 받을 수 있으며, 사실 관계 확인 시 서로의
            과실일 경우 신고자 또한 활동 제한 등의 불이익을 받을 수 있습니다.
          </p>
        </div>
        <button className={cn("submitBtn", { takerReport: postType === "taker" })}>신고하기</button>
      </form>
    </div>
  );
}

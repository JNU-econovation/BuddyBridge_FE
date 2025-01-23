import classNames from "classnames/bind";

import styles from "@/components/page-layout/surveyCompleteLayout/components/SurveyCompleteLayout.module.scss";

const cn = classNames.bind(styles);

export default function SurveyCompleteLayout() {
  return (
    <div className={cn("container")}>
      <h1 className={cn("title")}>설문조사가 완료되었습니다!</h1>
      <p className={cn("message")}>설문조사에 참여해주셔서 감사합니다.</p>
    </div>
  );
}

import classNames from "classnames/bind";

import styles from "@/components/page-layout/surveyCompleteLayout/components/SurveyCompleteLayout.module.scss";

const cn = classNames.bind(styles);

export default function SurveyCompleteLayout() {
  return <div className={cn("container")}>설문조사를 참여해주셔서 감사합니다.</div>;
}

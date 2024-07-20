import classNames from "classnames/bind";

import styles from "@/components/page-layout/myPageLayout/components/myPageLayout.module.scss";

import MyInfo from "./MyInfo/MyInfo";
import MyPageNav from "./MyPageNav/MyPageNav";

const cn = classNames.bind(styles);

export default function MyPageLayout() {
  return (
    <div className={cn("container")}>
      <MyPageNav />
      <MyInfo />
    </div>
  );
}

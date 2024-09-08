import classNames from "classnames/bind";

import styles from "@/components/page-layout/myPageEditLayout/components/myPageEditLayout.module.scss";

import MyRegisterPost from "./MyRegisterPost/MyRegisterPost";
import MyPageNav from "../../myPageLayout/components/MyPageNav/MyPageNav";

const cn = classNames.bind(styles);

export default function MyPageHelpMeLayout() {
  return (
    <div className={cn("container")}>
      <MyPageNav />
      <MyRegisterPost postType="TAKER" />
    </div>
  );
}

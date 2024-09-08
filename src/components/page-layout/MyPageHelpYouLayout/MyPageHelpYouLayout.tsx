import classNames from "classnames/bind";

import styles from "@/components/page-layout/myPageEditLayout/components/myPageEditLayout.module.scss";
import MyRegisterPost from "@/components/page-layout/myPageHelpMeLayout/components/MyRegisterPost/MyRegisterPost";
import MyPageNav from "@/components/page-layout/myPageLayout/components/MyPageNav/MyPageNav";

const cn = classNames.bind(styles);

export default function MyPageHelpYouLayout() {
  return (
    <div className={cn("container")}>
      <MyPageNav />
      <MyRegisterPost postType="GIVER" />
    </div>
  );
}

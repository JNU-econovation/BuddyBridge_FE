import classNames from "classnames/bind";

import MyPageNav from "@/components/page-layout/myPageLayout/components/MyPageNav/MyPageNav";
import styles from "@/components/page-layout/myPageLikesLayout/components/myPageLikesLayout.module.scss";

import MyFinishedListBox from "./MyFinishedListBox/MyFinishedListBox";

const cn = classNames.bind(styles);

export default function MyPageFinishedLayout() {
  return (
    <div className={cn("container")}>
      <MyPageNav />
      <MyFinishedListBox />
    </div>
  );
}

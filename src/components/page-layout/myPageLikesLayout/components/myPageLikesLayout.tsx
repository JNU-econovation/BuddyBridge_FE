import classNames from "classnames/bind";

import MyPageNav from "@/components/page-layout/myPageLayout/components/MyPageNav/MyPageNav";
import styles from "@/components/page-layout/myPageLikesLayout/components/myPageLikesLayout.module.scss";

import MyLikesListBox from "./MyLikesListBox/MyLikesListBox";

const cn = classNames.bind(styles);

export default function MyPageLikesLayout() {
  return (
    <div className={cn("container")}>
      <MyPageNav />
      <MyLikesListBox />
    </div>
  );
}

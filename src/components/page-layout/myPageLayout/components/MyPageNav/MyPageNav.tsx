import classNames from "classnames/bind";

import MyInfoCard from "@/components/common/MyInfoCard/MyInfoCard";
import MyPageMenu from "@/components/common/MyPageMenu/MyPageMenu";
import styles from "@/components/page-layout/myPageLayout/components/MyPageNav/MyPageNav.module.scss";

const cn = classNames.bind(styles);

export default function MyPageNav() {
  return (
    <div className={cn("container")}>
      <MyInfoCard />
      <MyPageMenu />
    </div>
  );
}

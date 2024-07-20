import classNames from "classnames/bind";

import styles from "@/components/page-layout/myPageEditLayout/components/myPageEditLayout.module.scss";

import MyInfoEditForm from "./MyInfoEditFrom/MyInfoEditForm";
import MyPageNav from "../../myPageLayout/components/MyPageNav/MyPageNav";

const cn = classNames.bind(styles);

export default function MyPageEditLayout() {
  return (
    <div className={cn("container")}>
      <MyPageNav />
      <MyInfoEditForm />
    </div>
  );
}

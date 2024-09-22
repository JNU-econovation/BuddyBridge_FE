import classNames from "classnames/bind";

import MyPageMyInfo from "@/components/common/MyPageMyInfo/MyPageMyInfo";

import styles from "./MyPageLikesList.module.scss";
import MyLikesListBox from "../MyLikesListBox/MyLikesListBox";

const cn = classNames.bind(styles);

export default function MyPageLikesList() {
  return (
    <div className={cn("container")}>
      <p className={cn("title")}>찜한 목록</p>
      <div className={cn("myInfoContainer")}>
        <MyPageMyInfo />
        <MyLikesListBox />
      </div>
    </div>
  );
}

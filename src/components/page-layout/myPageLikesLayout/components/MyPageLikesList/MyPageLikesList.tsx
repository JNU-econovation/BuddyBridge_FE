import classNames from "classnames/bind";

import styles from "./MyPageLikesList.module.scss";
import MyLikesListBox from "../MyLikesListBox/MyLikesListBox";

const cn = classNames.bind(styles);

export default function MyPageLikesList() {
  return (
    <div className={cn("container")}>
      <MyLikesListBox />
    </div>
  );
}

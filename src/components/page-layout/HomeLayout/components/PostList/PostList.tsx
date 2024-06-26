import classNames from "classnames/bind";

import GiverPostList from "@/components/page-layout/HomeLayout/components/PostList/GiverPostList/GiverPostList";
import styles from "@/components/page-layout/HomeLayout/components/PostList/PostList.module.scss";
import TakerPostList from "@/components/page-layout/HomeLayout/components/PostList/TakerPostList/TakerPostList";

const cn = classNames.bind(styles);

export default function PostList() {
  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <TakerPostList />
        <GiverPostList />
      </div>
    </div>
  );
}

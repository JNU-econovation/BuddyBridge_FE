import classNames from "classnames/bind";

import Skeleton from "@/components/common/Skeleton/Skeleton";
import styles from "@/components/page-layout/HomeLayout/components/PostListSkeleton/PostListSkeleton.module.scss";

const cn = classNames.bind(styles);

export default function PostListSkeleton() {
  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <Skeleton className={cn("header")} />
        <div className={cn("postListBox")}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className={cn("postSkeleton")} />
          ))}
        </div>
      </div>
      <Skeleton className={cn("header")} />
      <div className={cn("box")}>
        <Skeleton className={cn("header")} />
        <div className={cn("postListBox")}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className={cn("postSkeleton")} />
          ))}
        </div>
      </div>
    </div>
  );
}

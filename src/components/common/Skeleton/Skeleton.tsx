import classNames from "classnames/bind";

import styles from "@/components/common/Skeleton/Skeleton.module.scss";
import SkeletonProps from "@/components/common/Skeleton/types/index";

const cn = classNames.bind(styles);

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("Container", className)}>
      <div className={cn("skeleton")} />
    </div>
  );
}

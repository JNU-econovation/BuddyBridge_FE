import classNames from "classnames/bind";

import styles from "@/components/common/Footer/Participation/Pm/Pm.module.scss";

const cn = classNames.bind(styles);

export default function Designer() {
  return (
    <div className={cn("nameBox")}>
      <p>PM</p>
      <a className={cn("name")}>노을</a>
    </div>
  );
}

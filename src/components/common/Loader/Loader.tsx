import classNames from "classnames/bind";

import styles from "@/components/common/Loader/Loader.module.scss";

const cn = classNames.bind(styles);

export default function Loader() {
  return <div className={cn("loader")}></div>;
}

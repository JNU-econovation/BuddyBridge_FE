import classNames from "classnames/bind";

import styles from "@/components/common/Loader/Loader.module.scss";

const cn = classNames.bind(styles);

interface LoaderProps {
  className?: string;
}

export default function Loader({ className }: LoaderProps) {
  return (
    <div className={className}>
      <div className={cn("loader")}></div>
    </div>
  );
}

import classNames from "classnames/bind";

import styles from "./PostStatusLabel.module.scss";

const cn = classNames.bind(styles);

interface PostStatusLabelProps {
  postStatus: "RECRUITING" | "FINISHED";
}

export default function PostStatusLabel({ postStatus }: PostStatusLabelProps) {
  const statusText = postStatus === "RECRUITING" ? "모집중" : "모집완료";

  return (
    <div className={cn("box", postStatus)}>
      <p className={cn("statusText")}>{statusText}</p>
    </div>
  );
}

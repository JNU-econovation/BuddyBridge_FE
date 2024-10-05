import classNames from "classnames/bind";

import styles from "@/components/common/Post/PostLabel/PostLabel.module.scss";

const cn = classNames.bind(styles);

interface PostLabelProps {
  text: string;
}

export default function PostLabel({ text }: PostLabelProps) {
  return <div className={cn("container")}>{text}</div>;
}

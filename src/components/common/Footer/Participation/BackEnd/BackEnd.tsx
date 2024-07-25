import classNames from "classnames/bind";

import styles from "@/components/common/Footer/Participation/BackEnd/BackEnd.module.scss";

const cn = classNames.bind(styles);

export default function BackEnd() {
  return (
    <div className={cn("nameBox")}>
      <p>Back-end</p>
      <div className={cn("name")}>
        <a href="https://github.com/Profile-exe" target="_blank" rel="noopener noreferrer">
          강명덕
        </a>
        <a href="https://github.com/injae-348" target="_blank" rel="noopener noreferrer">
          정인재
        </a>
      </div>
    </div>
  );
}

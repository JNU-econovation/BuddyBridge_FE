import classNames from "classnames/bind";

import styles from "@/components/common/Footer/Participation/FrontEnd/FrontEnd.module.scss";

const cn = classNames.bind(styles);

export default function FrontEnd() {
  return (
    <div className={cn("nameBox")}>
      <p>Front-end</p>
      <div className={cn("name")}>
        <a href="https://github.com/smb0123" target="_blank" rel="noopener noreferrer">
          심민보
        </a>
      </div>
    </div>
  );
}

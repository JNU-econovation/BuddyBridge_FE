import classNames from "classnames/bind";

import BackEnd from "@/components/common/Footer/Participation/BackEnd/BackEnd";
import FrontEnd from "@/components/common/Footer/Participation/FrontEnd/FrontEnd";
import styles from "@/components/common/Footer/Participation/Participation.module.scss";
import Pm from "@/components/common/Footer/Participation/Pm/Pm";

const cn = classNames.bind(styles);

export default function Participation() {
  return (
    <div className={cn("nameContainer")}>
      <FrontEnd />
      <BackEnd />
      <Pm />
    </div>
  );
}

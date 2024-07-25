import classNames from "classnames/bind";

import styles from "@/components/common/Footer/Footer.module.scss";
import Participation from "@/components/common/Footer/Participation/Participation";
import Sns from "@/components/common/Footer/Sns/Sns";

const cn = classNames.bind(styles);

interface FooterProps {
  isMyPage?: boolean;
}

export default function Footer({ isMyPage }: FooterProps) {
  return (
    <footer className={cn("container", { isMyPage })}>
      <div className={cn("box")}>
        <Participation />
        <div className={cn("logo")}>Buddy Bridge</div>
        <div className={cn("contactBox")}>
          <Sns />
        </div>
      </div>
    </footer>
  );
}

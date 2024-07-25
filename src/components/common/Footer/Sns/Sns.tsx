import classNames from "classnames/bind";

import styles from "@/components/common/Footer/Sns/Sns.module.scss";
import Facebook from "@/icons/facebook.svg";
import Github from "@/icons/github.svg";
import Instagram from "@/icons/instagram.svg";
import Twitter from "@/icons/twitter.svg";
import Youtube from "@/icons/youtube.svg";

const cn = classNames.bind(styles);

export default function Sns() {
  return (
    <div className={cn("snsBox")}>
      <a href="https://www.facebook.com/?locale=ko_KR" target="_blank" rel="noopener noreferrer">
        <Facebook />
      </a>
      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
        <Instagram />
      </a>
      <a href="https://x.com/?lang=ko" target="_blank" rel="noopener noreferrer">
        <Twitter />
      </a>
      <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
        <Github />
      </a>
      <a href="https://www.youtube.com/?hl=ko&gl=KR&app=desktop" target="_blank" rel="noopener noreferrer">
        <Youtube />
      </a>
    </div>
  );
}

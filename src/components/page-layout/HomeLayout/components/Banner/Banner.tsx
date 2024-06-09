import classNames from "classnames/bind";

import styles from "@/components/page-layout/HomeLayout/components/Banner/Banner.module.scss";
import BannerImg from "@/images/bannerImg.svg";

const cn = classNames.bind(styles);

export default function Banner() {
  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <div className={cn("textBox")}>
          <div className={cn("textTitleBox")}>
            <p className={cn("textUpTitle")}>따듯한 온기를,</p>
            <p className={cn("textDownTitle")}>소중한 마음을</p>
          </div>
          <p className={cn("textContent")}>누구나 전할 수 있습니다.</p>
        </div>
        <BannerImg className={cn("banner")} />
      </div>
    </div>
  );
}

import classNames from "classnames/bind";

import styles from "@/components/page-layout/HomeLayout/components/Banner/Banner.module.scss";
import BannerImg from "@/images/bannerImg.svg";

const cn = classNames.bind(styles);

export default function Banner() {
  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <div className={cn("textBox")}>
          <p className={cn("textTitle")}>모두가 함께 살아가는 세상</p>
          <p className={cn("textContent")}>장벽 없는 사회를 꿈꿉니다.</p>
        </div>
        <BannerImg className={cn("banner")} width={500} height={150} />
      </div>
    </div>
  );
}

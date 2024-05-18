import Link from "next/link";

import styles from "@/components/common/Header/User/DropDown/DropDown.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

interface DropDownProps {
  isNameClick: boolean;
}

export default function DropDown({ isNameClick }: DropDownProps) {
  return (
    <div className={cn("dropDownContainer", { hidden: isNameClick })}>
      <div className={cn("myProfileContainer")}>
        <p>내 프로필</p>
        <div className={cn("myProfile")}>이미지</div>
      </div>
      <Link href="/" className={cn("myPage")}>
        마이페이지
      </Link>
      <p className={cn("logout")}>로그아웃</p>
    </div>
  );
}

import Link from "next/link";

import styles from "@/components/common/Header/User/DropDown/DropDown.module.scss";
import classNames from "classnames/bind";

import Image from "next/image";

import User from "@/types/user";

const cn = classNames.bind(styles);

interface DropDownProps extends User {
  isNameClick: boolean;
}

export default function DropDown({ userInfo, isNameClick }: DropDownProps) {
  return (
    <div className={cn("dropDownContainer", { hidden: isNameClick })}>
      <div className={cn("myProfileContainer")}>
        <p>내 프로필</p>
        <div className={cn("myProfile")}>
          {userInfo?.user?.image && <Image src={userInfo?.user?.image} alt="내 프로필" fill />}
        </div>
      </div>
      <Link href="/" className={cn("myPage")}>
        마이페이지
      </Link>
      <p className={cn("logout")}>로그아웃</p>
    </div>
  );
}

import classNames from "classnames/bind";

import Image from "next/image";
import Link from "next/link";

import styles from "@/components/common/Header/User/DropDown/DropDown.module.scss";
import { ROUTE } from "@/constants/route";
import NoImg from "@/images/noimg.png";
import useUserInfoStore from "@/stores/kakaoInnfo";

const cn = classNames.bind(styles);

interface DropDownProps {
  isNameClick: boolean;
}

export default function DropDown({ isNameClick }: DropDownProps) {
  const { userInfo } = useUserInfoStore();

  return (
    <div className={cn("dropDownContainer", { hidden: isNameClick })}>
      <div className={cn("myProfileContainer")}>
        <p>내 프로필</p>
        <Image
          className={cn("img")}
          src={userInfo?.profileImageUrl ? userInfo?.profileImageUrl : NoImg}
          width={80}
          height={80}
          alt="카카오톡 프로필"
        />
      </div>
      <Link href={ROUTE.MY_PAGE} className={cn("myPage")}>
        마이페이지
      </Link>
      <p className={cn("logout")}>로그아웃</p>
    </div>
  );
}

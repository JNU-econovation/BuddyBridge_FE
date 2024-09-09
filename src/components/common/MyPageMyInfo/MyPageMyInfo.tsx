import classNames from "classnames/bind";

import Image from "next/image";

import useUserInfoStore from "@/stores/kakaoInnfo";

import styles from "./MyPageMyInfo.module.scss";

const cn = classNames.bind(styles);

export default function MyPageMyInfo() {
  const { userInfo } = useUserInfoStore();

  return (
    <div className={cn("myInfoBox")}>
      <Image
        className={cn("profileImg")}
        width={50}
        height={50}
        src={userInfo?.profileImageUrl as string}
        alt="프로필 이미지"
      />
      <p className={cn("userName")}>
        {userInfo?.name} / {userInfo?.nickname}
      </p>
    </div>
  );
}

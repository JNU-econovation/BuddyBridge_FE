import classNames from "classnames/bind";

import Image from "next/image";
import Link from "next/link";

import styles from "@/components/page-layout/myPageLayout/components/MyInfo/MyInfo.module.scss";
import { ROUTE } from "@/constants/route";
import useUserInfoStore from "@/stores/kakaoInnfo";

const cn = classNames.bind(styles);

export default function MyInfo() {
  const { userInfo } = useUserInfoStore();

  return (
    <div className={cn("container")}>
      <p className={cn("title")}>내 정보</p>
      <div className={cn("myInfoContainer")}>
        <div className={cn("myInfoBox")}>
          <Image src={userInfo?.profileImageUrl as string} className={cn("img")} alt="프로필" width={50} height={50} />
          <p className={cn("title")}>{userInfo?.nickname}</p>
          <div className={cn("detailBox")}>
            <p>나이 : {userInfo?.age}</p>
            <p>성별 : {userInfo?.gender}</p>
          </div>
        </div>
        <Link href={ROUTE.MY_PAGE_EDIT} className={cn("link")}>
          수정하기
        </Link>
      </div>
    </div>
  );
}

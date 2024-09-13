import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Image from "next/image";
import Link from "next/link";

import getMyInfo from "@/components/page-layout/myPageEditLayout/apis/getMyInfo";
import styles from "@/components/page-layout/myPageLayout/components/MyInfo/MyInfo.module.scss";
import { ROUTE } from "@/constants/route";

const cn = classNames.bind(styles);

export default function MyInfo() {
  const { data: myInfoData } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getMyInfo,
  });

  return (
    <div className={cn("container")}>
      <p className={cn("title")}>내 정보</p>
      <div className={cn("myInfoContainer")}>
        <div className={cn("myInfoBox")}>
          <Image
            src={myInfoData?.profileImageUrl as string}
            className={cn("img")}
            alt="프로필"
            width={50}
            height={50}
          />
          <p className={cn("title")}>{myInfoData?.nickname}</p>
          <div className={cn("detailBox")}>
            <p>나이 : {myInfoData?.age}</p>
            <p>성별 : {myInfoData?.gender}</p>
          </div>
        </div>
        <Link href={ROUTE.MY_PAGE_EDIT} className={cn("link")}>
          수정하기
        </Link>
      </div>
    </div>
  );
}

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
      <div className={cn("myInfoContainer")}>
        <p className={cn("title")}>내 정보</p>
        <div className={cn("myInfoBox")}>
          <div className={cn("profileBox")}>
            <Image
              src={myInfoData?.profileImageUrl as string}
              className={cn("img")}
              alt="프로필"
              width={100}
              height={100}
            />
            <p>{myInfoData?.email}</p>
          </div>
          <div className={cn("detailBox")}>
            <p className={cn("name")}>{myInfoData?.nickname}</p>
            <p>이름 : {myInfoData?.name}</p>
            <p>나이 : {myInfoData?.age}</p>
            <p>성별 : {myInfoData?.gender}</p>
            <p>장애유형 : {myInfoData?.disabilityType}</p>
          </div>
        </div>
        <Link href={ROUTE.MY_PAGE_EDIT} className={cn("link")}>
          프로필 수정
        </Link>
      </div>
    </div>
  );
}

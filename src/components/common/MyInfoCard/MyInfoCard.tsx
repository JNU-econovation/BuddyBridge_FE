import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Image from "next/image";
import Link from "next/link";

import styles from "@/components/common/MyInfoCard/MyInfoCard.module.scss";
import getMyInfo from "@/components/page-layout/myPageEditLayout/apis/getMyInfo";
import { ROUTE } from "@/constants/route";

const cn = classNames.bind(styles);

export default function MyInfoCard() {
  const { data: myInfoData } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getMyInfo(),
  });

  return (
    <div className={cn("container")}>
      <p className={cn("title")}>작성자 정보</p>
      <div className={cn("contentBox")}>
        <div className={cn("profileImageBox")}>
          <Image alt="프로필 사진" src={myInfoData?.profileImageUrl as string} fill />
        </div>
        <div className={cn("detailInfoBox")}>
          <p className={cn("detailInfoTitle")}>{myInfoData?.nickname}</p>
          <div className={cn("detailInfoContentBox")}>
            <p className={cn("gender")}>성별 : {myInfoData?.gender}</p>
            <p className={cn("age")}>나이 : 만 {myInfoData?.age}세</p>
            <p className={cn("disabilityType")}>장애유형: {myInfoData?.disabilityType}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

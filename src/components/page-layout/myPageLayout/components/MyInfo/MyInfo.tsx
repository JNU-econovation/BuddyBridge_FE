import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Image from "next/image";
import Link from "next/link";

import getKakaoInfo from "@/components/page-layout/HomeLayout/apis/getKakaoInfo";
import styles from "@/components/page-layout/myPageLayout/components/MyInfo/MyInfo.module.scss";
import { ROUTE } from "@/constants/route";
import useUserInfoStore from "@/stores/kakaoInnfo";

const cn = classNames.bind(styles);

export default function MyInfo() {
  const { code } = useUserInfoStore();

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getKakaoInfo(code as string),
  });

  return (
    <div className={cn("container")}>
      <p className={cn("title")}>내 정보</p>
      <div className={cn("myInfoContainer")}>
        <div className={cn("myInfoBox")}>
          <Image src={data?.profileImageUrl} className={cn("img")} alt="프로필" width={50} height={50} />
          <p className={cn("title")}>{data?.nickname}</p>
          <div className={cn("detailBox")}>
            <p>나이 : {data?.age}</p>
            <p>성별 : {data?.gender}</p>
          </div>
        </div>
        <Link href={ROUTE.MY_PAGE_EDIT} className={cn("link")}>
          수정하기
        </Link>
      </div>
    </div>
  );
}

import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Image from "next/image";
import { useRouter } from "next/router";

import styles from "@/components/page-layout/chatLayout/components/ChatList/MyInfo/MyInfo.module.scss";
import getMyInfo from "@/components/page-layout/myPageEditLayout/apis/getMyInfo";
import { ROUTE } from "@/constants/route";

const cn = classNames.bind(styles);

export default function MyInfo() {
  const router = useRouter();

  const { data, isPending, isError } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getMyInfo(),
  });

  useEffect(() => {
    if (!data && !isPending) {
      router.push(ROUTE.LOGIN);
    }
  }, [data, router, isPending]);

  if (isPending) {
    return <>...로딩중</>;
  }

  if (isError) {
    return <>...</>;
  }

  return (
    <div className={cn("container")}>
      <div className={cn("profileContainer")}>
        <div className={cn("profileImgBox")}>
          <Image src={data.profileImageUrl} alt="profile" className={cn("profileImg")} width={50} height={50} />
        </div>
        <p className={cn("name")}>{data.name}</p>
      </div>
    </div>
  );
}

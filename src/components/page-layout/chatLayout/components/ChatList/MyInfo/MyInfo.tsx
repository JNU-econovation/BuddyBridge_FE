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

  const { data, isFetching } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getMyInfo(),
  });

  useEffect(() => {
    if (!data && !isFetching) {
      router.push(ROUTE.LOGIN);
    }
  }, [data, router, isFetching]);

  return (
    <div className={cn("container")}>
      <div className={cn("profileContainer")}>
        <Image src={data?.profileImageUrl} alt="profile" className={cn("profileImg")} width={50} height={50} />
        <p className={cn("name")}>{data?.name}</p>
      </div>
    </div>
  );
}

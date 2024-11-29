import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Image from "next/image";

import styles from "./MyPageMyInfo.module.scss";
import getLogIn from "../Header/apis/getLogIn";

const cn = classNames.bind(styles);

export default function MyPageMyInfo() {
  const { data } = useQuery({
    queryKey: ["userLogIn"],
    queryFn: () => getLogIn(),
  });

  return (
    <div className={cn("myInfoBox")}>
      <Image
        className={cn("profileImg")}
        width={50}
        height={50}
        src={data?.profileImageUrl as string}
        alt="프로필 이미지"
      />
      <p className={cn("userName")}>
        {data?.name} / {data?.nickname}
      </p>
    </div>
  );
}

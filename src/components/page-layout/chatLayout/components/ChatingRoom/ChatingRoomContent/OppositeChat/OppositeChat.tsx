import classNames from "classnames/bind";

import Image from "next/image";

import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/OppositeChat/OppositeChat.module.scss";
import { formatAllDateString } from "@/utils";

const cn = classNames.bind(styles);

interface OppositeChat {
  oppsiteUser: {
    receiverId: number;
    receiverName: string;
    receiverProfileImg: string;
  };
  chat: string;
  date: string;
}

export default function OppositeChat({ oppsiteUser, chat, date }: OppositeChat) {
  return (
    <div className={cn("container")}>
      <Image className={cn("img")} width={40} height={40} src={oppsiteUser?.receiverProfileImg} alt="상대 프로필" />
      <div className={cn("nameContainer")}>
        <p className={cn("name")}>{oppsiteUser?.receiverName}</p>
        <div className={cn("chat")}>{chat}</div>
        <p className={cn("date")}>{formatAllDateString(date)}</p>
      </div>
    </div>
  );
}

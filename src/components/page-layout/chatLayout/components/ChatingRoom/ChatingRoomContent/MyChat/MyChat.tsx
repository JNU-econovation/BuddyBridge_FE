import classNames from "classnames/bind";

import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/MyChat/MyChat.module.scss";
import { formatAllDateString } from "@/utils";

const cn = classNames.bind(styles);

interface MyChatProps {
  chat: string;
  date: string;
}

export default function MyChat({ chat, date }: MyChatProps) {
  return (
    <div className={cn("container")}>
      <div className={cn("chat")}>{chat}</div>
      <p className={cn("date")}>{formatAllDateString(date)}</p>
    </div>
  );
}

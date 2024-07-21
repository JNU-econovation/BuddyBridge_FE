import classNames from "classnames/bind";

import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/MyChat/MyChat.module.scss";

const cn = classNames.bind(styles);

interface MyChatProps {
  chat: string;
}

export default function MyChat({ chat }: MyChatProps) {
  return (
    <div className={cn("container")}>
      <div className={cn("chat")}>{chat}</div>
    </div>
  );
}

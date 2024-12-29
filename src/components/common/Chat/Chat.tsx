import classNames from "classnames/bind";

import Image from "next/image";
import Link from "next/link";

import styles from "@/components/common/Chat/Chat.module.scss";
import { useChatContext } from "@/components/page-layout/chatLayout/components/chatLayout";
import { formatDateString } from "@/utils";

const cn = classNames.bind(styles);

interface ChatProps {
  name: string;
  content: string;
  date: Date;
  type: string;
  img: string;
  id: number;
  postId: number;
}

export default function Chat({ name, content, date, type, img, id, postId }: ChatProps) {
  const { setChatingRoomNumber } = useChatContext();

  const handleChatClick = () => {
    setChatingRoomNumber(id);
  };

  return (
    <Link href={`/chat/${id}`} className={cn("container")} onClick={handleChatClick}>
      <div className={cn("box")}>
        <Image src={img} alt="프로필 이미지" width={40} height={40} className={cn("img")} />
        <div className={cn("contentBox")}>
          <div className={cn("headerBox")}>
            <p className={cn("name")}>{name}</p>
            <p className={cn("dot")}>·</p>
            <p className={cn("type")}>
              {type === "TAKER" ? "도와줄래요? " : "도와줄게요! "}
              {postId}번
            </p>
          </div>
          <p className={cn("content")}>{content}</p>
        </div>
        <p className={cn("date")}>{formatDateString(date)}</p>
      </div>
    </Link>
  );
}

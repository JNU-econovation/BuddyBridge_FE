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
  date: string;
  type: string;
  img: string;
  id: number;
}

export default function Chat({ name, content, date, type, img, id }: ChatProps) {
  const { setChatingRoomNumber } = useChatContext();

  const handleChatClick = () => {
    setChatingRoomNumber(id);
  };

  return (
    <Link href={`/chat/${id}`} className={cn("container")} onClick={handleChatClick}>
      <div className={cn("box")}>
        <Image src={img} alt="프로필 이미지" width={50} height={50} className={cn("img")} />
        <div className={cn("contentBox")}>
          <div className={cn("headerBox")}>
            <p className={cn("name")}>{name}</p>
            <p className={cn("type")}>{type}</p>
          </div>
          <p className={cn("content")}>{content}</p>
        </div>
        <p className={cn("date")}>{formatDateString(date)}</p>
      </div>
    </Link>
  );
}

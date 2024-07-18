import classNames from "classnames/bind";

import Image, { StaticImageData } from "next/image";

import styles from "@/components/common/Chat/Chat.module.scss";
import { useAccodionContext } from "@/components/page-layout/chatLayout/components/chatLayout";

const cn = classNames.bind(styles);

interface ChatProps {
  name: string;
  content: string;
  date: string;
  type: string;
  img: StaticImageData;
  id: number;
}

export default function Chat({ name, content, date, type, img, id }: ChatProps) {
  const { setChatingRoomNumber } = useAccodionContext();

  const handleChatClick = () => {
    setChatingRoomNumber(id);
  };

  return (
    <button className={cn("container")} onClick={handleChatClick}>
      <div className={cn("box")}>
        <Image src={img} alt="프로필 이미지" width={50} height={50} className={cn("img")} />
        <div className={cn("contentBox")}>
          <div className={cn("headerBox")}>
            <p>{name}</p>
            <p>{type}</p>
          </div>
          <p className={cn("content")}>{content}</p>
        </div>
        <p className={cn("date")}>{date}</p>
      </div>
    </button>
  );
}

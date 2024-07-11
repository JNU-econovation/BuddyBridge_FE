import { useRef, useState } from "react";

import classNames from "classnames/bind";

import Link from "next/link";

import styles from "@/components/common/Comment/Chat/Chat.module.scss";
import { ROUTE } from "@/constants/route";
import useOutsideClick from "@/hooks/useOutsideClick";

const cn = classNames.bind(styles);

export default function Chat() {
  const [isChatClick, setIsChatClick] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const editBoxRef = useRef<HTMLDivElement>(null);

  const handlebuttonClick = () => {
    setIsChatClick((prev) => !prev);
  };

  useOutsideClick([chatRef, editBoxRef], () => setIsChatClick(false));

  return (
    <div className={cn("chatBox")} ref={chatRef}>
      <button onClick={handlebuttonClick} className={cn("chat")}>
        채팅하기
      </button>
      {isChatClick && (
        <div className={cn("editBox")} ref={editBoxRef}>
          <p className={cn("title")}>채팅 후, 매칭 여부를 선택할 수 있습니다! </p>
          <p className={cn("content")}>
            채팅하기를 진행한다면 상대방에게
            <br /> 실명이 공개됩니다.
          </p>
          <Link href={ROUTE.CHAT} className={cn("chatButton")}>
            채팅하기
          </Link>
        </div>
      )}
    </div>
  );
}

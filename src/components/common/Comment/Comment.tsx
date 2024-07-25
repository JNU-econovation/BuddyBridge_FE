import { useRef, useState } from "react";

import classNames from "classnames/bind";

import Image from "next/image";

import styles from "@/components/common/Comment/Comment.module.scss";
import useOutsideClick from "@/hooks/useOutsideClick";
import Kebab from "@/icons/kebab.svg";
import useUserInfoStore from "@/stores/kakaoInnfo";
import { formatDateString } from "@/utils";

import ChatButton from "./ChatButton/ChatButton";

const cn = classNames.bind(styles);

export interface CommentProps {
  comment: {
    author: {
      memberId: number;
      nickname: string;
      profileImg: string;
    };
    content: string;
    modifiedAt: string;
    commentId: number;
  };
  postId: number;
  type: string;
}

export default function Comment({ comment, postId, type }: CommentProps) {
  const [isKebabClick, setIsKebabClick] = useState(false);
  const kebabRef = useRef<HTMLDivElement>(null);
  const editBoxRef = useRef<HTMLDivElement>(null);

  const { userInfo } = useUserInfoStore();

  const handleKebabClick = () => {
    setIsKebabClick((prev) => !prev);
  };

  useOutsideClick([kebabRef, editBoxRef], () => setIsKebabClick(false));

  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <div className={cn("img")}>
          <Image fill src={comment.author.profileImg} alt="댓글 작성자 프로필" />
        </div>
        <div className={cn("contentBox")}>
          <div className={cn("titleBox")}>
            <p className={cn("nickname")}>{comment.author.nickname}</p>
            <p className={cn("date")}>{formatDateString(comment.modifiedAt)}</p>
          </div>
          <p className={cn("content")}>{comment.content}</p>
        </div>
        {comment.author.memberId === userInfo?.memberId && (
          <div className={cn("kebabBox")} ref={kebabRef}>
            <Kebab onClick={handleKebabClick} className={cn("kebab")} width={20} height={20} />
            {isKebabClick && (
              <div className={cn("editBox")} ref={editBoxRef}>
                <button>수정</button>
                <button>삭제</button>
              </div>
            )}
          </div>
        )}
        {userInfo?.memberId === postId && userInfo?.memberId !== comment.author.memberId && (
          <ChatButton type={type} authorId={comment.author.memberId} />
        )}
      </div>
    </div>
  );
}

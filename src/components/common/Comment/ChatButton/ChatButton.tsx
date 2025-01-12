import { useRef, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import styles from "@/components/common/Comment/ChatButton/ChatButton.module.scss";
import getTakerDetail from "@/components/page-layout/helpMeDetailLayout/apis/getTakerDetail";
import { ROUTE } from "@/constants/route";
import useOutsideClick from "@/hooks/useOutsideClick";

import postChatAccept from "../apis/postChatAccept";

const cn = classNames.bind(styles);

interface ChatAcceptType {
  body: {
    postId: number;
    takerId: number;
    giverId: number;
  };
}

interface ChatButtonProps {
  authorId: number;
  type: string;
}

export default function ChatButton({ authorId, type }: ChatButtonProps) {
  const [isChatClick, setIsChatClick] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const editBoxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { id: pageId } = router.query;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["takerDetail", pageId],
    queryFn: () => getTakerDetail(pageId as string),
  });

  const chatAcceptMutation = useMutation({
    mutationFn: ({ body }: ChatAcceptType) => postChatAccept({ body }),
    onSuccess: () => {
      router.push(ROUTE.CHAT);
    },
  });

  const handleButtonClick = () => {
    setIsChatClick((prev) => !prev);
  };

  useOutsideClick([chatRef, editBoxRef], () => setIsChatClick(false));

  if (isLoading || !data) return <div>로딩중...</div>;
  if (isError) return <div>에러...</div>;

  const handleChatButtonClick = () => {
    const body = {
      postId: data.post.id,
      takerId: type === "giver" ? authorId : data.author.memberId,
      giverId: type === "giver" ? data.author.memberId : authorId,
    };
    chatAcceptMutation.mutate({ body });
  };

  return (
    <div className={cn("chatBox")} ref={chatRef}>
      <button onClick={handleButtonClick} className={cn("chat", { helpMeChat: type === "taker"})}>
        채팅하기
      </button>
      {isChatClick && (
        <div className={cn("editBox")} ref={editBoxRef}>
          <p className={cn("title")}>채팅 후, 매칭 여부를 선택할 수 있습니다! </p>
          <p className={cn("content")}>
            채팅하기를 진행한다면 상대방에게
            <br /> 실명이 공개됩니다.
          </p>
          <button onClick={handleChatButtonClick} className={cn("chatButton", { helpMeChat: type === "taker"})} >
            채팅하기
          </button>
        </div>
      )}
    </div>
  );
}

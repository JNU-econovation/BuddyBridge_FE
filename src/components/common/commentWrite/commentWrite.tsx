import { KeyboardEvent } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";

import Image from "next/image";

import styles from "@/components/common/commentWrite/commentWrite.module.scss";

import postComment from "./apis/postComment";

const cn = classNames.bind(styles);

interface CommentWriteProps {
  user: {
    profileImageUrl: string;
    nickname: string;
    memberId: number;
  };

  id: string;
  commentMemIds: Array<number>;
}

interface CommentData {
  id: string;
  content: string;
}

interface Comment {
  content: string;
}

export default function CommentWrite({ user, id, commentMemIds}: CommentWriteProps) {
  const { register, handleSubmit, reset } = useForm<Comment>();
  const queryClient = useQueryClient();
  
  const uploadCommentMutation = useMutation({
    mutationFn: ({ id, content }: CommentData) => postComment(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
      reset();
    },
  });
  
  const handleCommentUpload = (data: Comment) => {
    if (!commentMemIds.includes(Number(user.memberId))){
      if (data.content.trim() !== "") {
        uploadCommentMutation.mutate({ id, content: data.content });
      }
    } else {
      alert("댓글 작성은 1회만 가능합니다.");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(handleCommentUpload)();
    }
  };

  return (
    <div className={cn("container")}>
      <form className={cn("box")} onSubmit={handleSubmit(handleCommentUpload)}>
        <div className={cn("userBox")}>
          <div className={cn("img")}>
            <Image src={user?.profileImageUrl} fill alt="프로필 이미지" />
          </div>
          <p className={cn("nickname")}>{user?.nickname}</p>
        </div>
        <textarea
          {...register("content", { required: "내용을 입력하세요." })}
          placeholder="내용을 작성하세요."
          className={cn("textarea")}
          onKeyDown={handleKeyDown}
        ></textarea>
        <button className={cn("register")}>등록</button>
      </form>
    </div>
  );
}

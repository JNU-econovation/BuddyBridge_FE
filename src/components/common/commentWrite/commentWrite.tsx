import { KeyboardEvent } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";

import Image from "next/image";

import styles from "@/components/common/commentWrite/commentWrite.module.scss";
import openToast from "@/components/common/Toast/features/openToast";

import postComment from "./apis/postComment";
import BanIcon from "../../../../public/icons/ban.svg";
import Register from "../../../../public/icons/register_arrow.svg";

const cn = classNames.bind(styles);

interface CommentWriteProps {
  user: {
    profileImageUrl: string;
    nickname: string;
    memberId: number;
    gender: string;
  };

  id: string;
  commentMemIds: Array<number>;
  gender: string;
  type: string;
}

interface CommentData {
  id: string;
  content: string;
}

interface Comment {
  content: string;
}

export default function CommentWrite({ user, id, commentMemIds, gender, type }: CommentWriteProps) {
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
    if (!commentMemIds.includes(user.memberId)) {
      if (data.content.trim() !== "") {
        if(user.gender === gender) {
          uploadCommentMutation.mutate({ id, content: data.content });
        } else {
          openToast("warn", "같은 성별끼리만 댓글 작성 및 매칭이 가능합니다.");
        }  
      }
    } else {
      openToast("warn", "댓글은 한 개만 작성 가능합니다.");
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
      <div className={cn("commentLabelBox")}>
          <span>댓글 작성</span>
          <div className={cn("labelDetail")}>
            <BanIcon width={25} height={25}/>
            <span>비방, 욕설 등 부적절한 댓글은 작성이 제한되며, 삭제 될 수 있습니다.</span>
          </div>
      </div>
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
        <button>
          <Register className={cn("register",{ helpMeRegister:type==="taker" })} />
        </button>
      </form>
    </div>
  );
}

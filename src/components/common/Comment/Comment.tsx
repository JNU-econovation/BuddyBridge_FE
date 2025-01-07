import { useRef, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Image from "next/image";

import styles from "@/components/common/Comment/Comment.module.scss";
import ReportForm from "@/components/common/ReportForm/ReportForm";
import useOutsideClick from "@/hooks/useOutsideClick";
import Kebab from "@/icons/kebab.svg";
import { formatDateString } from "@/utils";

import deleteComment from "./apis/deleteComment";
import putComment from "./apis/putComment";
import ChatButton from "./ChatButton/ChatButton";
import Siren from "../../../../public/icons/siren.svg";
import getLogIn from "../Header/apis/getLogIn";
import Modal from "../Modal/Modal";

const cn = classNames.bind(styles);

export interface CommentProps {
  comment: {
    author: {
      memberId: number;
      nickname: string;
      profileImg: string;
      age: number;
      gender: string;
    };
    content: string;
    modifiedAt: Date;
    commentId: number;
  };
  authorId: number;
  postId: number;
  type: string;
  commentId: number;
}

export default function Comment({ comment, authorId, postId, type, commentId }: CommentProps) {
  const [isKebabClick, setIsKebabClick] = useState(false);
  const kebabRef = useRef<HTMLDivElement>(null);
  const editBoxRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const [isProfileClick, setIsProfileClick] = useState(false);
  const [isNowEditing, setIsNowEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const { data } = useQuery({
    queryKey: ["userLogIn"],
    queryFn: () => getLogIn(),
  });

  const handleKebabClick = () => {
    setIsKebabClick((prev) => !prev);
  };

  const handleProfileClick = () => {
    setIsProfileClick((prev) => !prev);
  };

  const deleteCommentMutation = useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
  });

  const handleCommentDeleteClick = () => {
    deleteCommentMutation.mutate(comment.commentId);
  };

  const handleCommentEditClick = () => {
    setIsNowEditing(true);
  };

  const editCommentMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      putComment(commentId.toString(), content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
      setIsNowEditing(false);
    },
  });

  const handleSaveClick = () => {
    if (editedContent.trim() !== "") {
      editCommentMutation.mutate({ commentId: comment.commentId, content: editedContent });
    }
  };

  useOutsideClick([kebabRef, editBoxRef], () => setIsKebabClick(false));

  const [isReportOpen, setIsReportOpen] = useState(false);

  const handleSirenClick = () => {
    setIsReportOpen(true);
  };

  return (
    <div className={cn("container")}>
      <div className={cn("img")}>
        <Image
          className={cn("commentWriterImage")}
          width={35}
          height={35}
          src={comment.author.profileImg}
          alt="댓글 작성자 프로필"
          onClick={handleProfileClick}
        />
        <div className={cn("commentWriterInfoBox", { clicked: isProfileClick })}>
          <Image
            className={cn("commentWriterBoxImage")}
            width={35}
            height={35}
            src={comment.author.profileImg}
            alt="댓글 작성자 프로필"
          />
          <p className={cn("commentWriterNickname")}>{comment.author.nickname}</p>
          <p className={cn("commentWriterAge")}>나이: 만{comment.author.age}세</p>
          <p className={cn("commentWriterGender")}>성별: {comment.author.gender}</p>
        </div>
      </div>
      <div className={cn("commentBackground",{ editingBackground: isNowEditing })}>
        <div className={cn("box")}>
          <div className={cn("upperContentBox")}>
            <div className={cn("titleBox")}>
              <p className={cn("nickname")}>{comment.author.nickname}</p>
              <p className={cn("date")}>{formatDateString(comment.modifiedAt)}</p>
            </div>
            {
              comment.author.memberId === data?.memberId ? (
                <div className={cn("kebabBox")} ref={kebabRef}>
                  <Kebab onClick={handleKebabClick} className={cn("kebab")} width={20} height={20} />
                  {isKebabClick && (
                    <div className={cn("editBox")} ref={editBoxRef}>
                      <button onClick={handleCommentEditClick}>수정</button>
                      <button onClick={handleCommentDeleteClick}>삭제</button>
                    </div>
                  )}
                </div>
              ): 
              ( 
                <div onClick={handleSirenClick} className={cn("sirenBtn")}>
                  <Siren/>
                  <span>신고하기</span>
                </div>
              )
            }
          </div>
          <div className={cn("contentBox")}>
            {isNowEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className={cn("editTextarea")}
              />
            ) : (
              <p className={cn("content")}>{comment.content}</p>
            )}
          </div>
        </div>
      </div>
      {data?.memberId === authorId && data?.memberId !== comment.author.memberId && (
        <ChatButton type={type} authorId={comment.author.memberId} />
      )}
      {isNowEditing && (
        <div className={cn("editBtnBox")}>
          <button className={cn("saveBtn")} onClick={handleSaveClick}>
            수정완료
          </button>
          <button className={cn("cancelBtn")} onClick={() => setIsNowEditing(false)}>
            취소
          </button>
        </div>
      )}
      {
        isReportOpen && 
          <Modal className="ReportFormBox" setState={setIsReportOpen}>
            <ReportForm 
              nickname={comment.author.nickname} 
              postId={postId} 
              postType={type} 
              contentType="comments" 
              content={comment.content} 
              setIsReportOpen={setIsReportOpen}/>
          </Modal>
      }
    </div>
  );
}

import { useState } from "react";

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames/bind";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Comment from "@/components/common/Comment/Comment";
import CommentWrite from "@/components/common/commentWrite/commentWrite";
import getLogIn from "@/components/common/Header/apis/getLogIn";
import Loader from "@/components/common/Loader/Loader";
import Modal from "@/components/common/Modal/Modal";
import { PostDetailHeart, PostHeart } from "@/components/common/Post/PostHeart/PostHeart";
import ReportForm from "@/components/common/ReportForm/ReportForm";
import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/helpMeDetailLayout/components/helpMeDetailLayout.module.scss";
import { ROUTE } from "@/constants/route";
import { ErrorResponse } from "@/types/error";
import { KaKaoUserInfo } from "@/types/user";
import { formatDateString } from "@/utils";

import Arrow from "../../../../../public/icons/arrow_down.svg";
import Calendar from "../../../../../public/icons/calendar.svg";
import Clock from "../../../../../public/icons/clock.svg";
import Kebab from "../../../../../public/icons/kebab.svg";
import Location from "../../../../../public/icons/location.svg";
import Person from "../../../../../public/icons/personnel.svg";
import Siren from "../../../../../public/icons/siren.svg";
import getAllComment from "../../helpYouDetailLayout/apis/getAllComment";
import deletePost from "../apis/deletePost";
import getTakerDetail from "../apis/getTakerDetail";

const cn = classNames.bind(styles);

interface CommentProps {
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
}

export default function HelpMeDetailLayout() {
  const router = useRouter();
  const { id: pageId } = router.query;

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isKebabClick, setIsKebabClick] = useState(false);
  const [isStateClick, setIsStateClick] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ["userLogIn"],
    queryFn: () => getLogIn(),
  });

  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comment"],
    queryFn: ({ pageParam }) => getAllComment(pageId as string, 4, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      lastPage.nextPage ? lastPage.cursor : undefined,
    enabled: !!pageId,
  });

  const {
    data: postDetailData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["takerPostDetail", `${pageId}`],
    queryFn: () => getTakerDetail(`${pageId}`),
    enabled: !!pageId,
  });

  const deletePostMutation = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      router.push(ROUTE.HELP_ME);
      openToast("success", "성공적으로 삭제되었습니다.");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        const invalidParams = error.response.data.error.invalidParams;
        if (invalidParams) {
          const fullInvalidMessage = invalidParams.map((param) => param.message).join(", ");
          openToast("error", fullInvalidMessage);
        } else {
          openToast("error", error.response.data.error.message);
        }
      }
    },
  });

  const handleDeleteButtonClick = () => {
    setIsDeleteOpen((prev) => !prev);
  };

  const confirmDelete = () => {
    deletePostMutation.mutate(id);
  };

  if (isPending) return <>...로딩</>;

  if (isError) return <>에러</>;

  const { nickname, disabilityType, gender, profileImageUrl, age } = postDetailData.author;

  const { district, id, title, content, createdAt, isLiked, assistance, schedule } = postDetailData.post;

  const { assistanceType, assistanceStartTime, assistanceEndTime } = assistance;

  const { scheduleType, startDate, endDate, scheduleDetails } = schedule;

  const handleKebabClick = () => {
    setIsKebabClick((prev) => !prev);
  };

  const handleSirenClick = () => {
    setIsReportOpen(true);
  };

  const commentMemIds: Array<number> =
    commentData?.pages.flatMap((page) => page.content.map((comment: CommentProps) => comment.author.memberId)) || [];

  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <header className={cn("header")}>
          버디브릿지는 일상에서 모두가 서로에게 <br />
          따듯한 온정을 전하는 세상을 만듭니다.
        </header>
        <div className={cn("totalContainer")}>
          <div className={cn("btnMenu")}>
            <PostDetailHeart
              style={cn("heart")}
              id={id}
              isLiked={isLiked}
              queryKey={["takerPostDetail", `${pageId}`]}
            />
            {userData?.memberId === postDetailData.author.memberId ? (
              <Kebab onClick={handleKebabClick} width={35} height={35} className={cn("kebabBtn")} />
            ) : (
              <div onClick={handleSirenClick} className={cn("sirenBtn")}>
                <Siren width={25} height={25} />
                <span className={cn("sirenText")}>신고하기</span>
              </div>
            )}
            {isKebabClick && (
              <div className={cn("btnBox")}>
                <button onClick={() => setIsStateClick((prev) => !prev)} className={cn("stateBtn")}>
                  상태변경
                  <Arrow width={18} height={18} />
                </button>
                <Link href={{ pathname: ROUTE.HELP_ME_EDIT, query: { id: id } }} className={cn("editBtn")}>
                  수정하기
                </Link>
                <button onClick={handleDeleteButtonClick} className={cn("deleteBtn")}>
                  삭제하기
                </button>
              </div>
            )}
            {isKebabClick && isStateClick && (
              <div className={cn("btnBox", "btnBox--state")}>
                <button>모집중</button>
                <button>모집완료</button>
              </div>
            )}
          </div>
          <div className={cn("titleBox")}>
            <div className={cn("postIdBox")}>
              <span className={cn("postId")}>{id}번 글</span>
            </div>
            <p className={cn("title")}>{title}</p>
          </div>
          <div className={cn("contentBox")}>
            <div className={cn("infoCard")}>
              <div className={cn("profileImageBox")}>
                <Image src={profileImageUrl} alt="프로필 사진" className={cn("profileImg")} fill />
              </div>
              <div className={cn("textInfoBox")}>
                <p className={cn("authorNickname")}>{nickname}</p>
                <div className={cn("authorDetailInfoBox")}>
                  <p className={cn("gender")}>성별 : {gender}</p>
                  <p className={cn("age")}>나이 : 만 {age}세</p>
                  <p className={cn("disabilityType")}>장애유형: {disabilityType}</p>
                </div>
              </div>
            </div>
            <div className={cn("postInfoBox")}>
              <div className={cn("postDetailInfo")}>
                <p className={cn("district")}>
                  <Location className={cn("districtIcon")} />
                  <span className={cn("label")}>장소</span>
                  <span>{district}</span>
                </p>
                <p className={cn("period")}>
                  <Calendar className={cn("calendarIcon")} />
                  <span className={cn("label")}>기간 &#38; 주기</span>
                  <span className={cn("periodContent")}>
                    <div className={cn("periodSimpleContent")}>
                      <span>{formatDateString(startDate)}</span>
                      <span>~</span>
                      <span>{formatDateString(endDate)},</span>
                      <span>{scheduleType}</span>
                    </div>
                    <span className={cn("periodDetailContent")}>({scheduleDetails})</span>
                  </span>
                </p>
                <p className={cn("time")}>
                  <Clock className={cn("clockIcon")} />
                  <span className={cn("label")}>시간</span>
                  <span>{assistanceStartTime}</span>
                  <span>~</span>
                  <span>{assistanceEndTime}</span>
                </p>
                <p className={cn("assistanceType")}>
                  <Person className={cn("personIcon")} />
                  <span className={cn("label")}>도움유형</span>
                  <span>{assistanceType}도움</span>
                </p>
              </div>
            </div>
            <div className={cn("contentDetail")}>
              <p className={cn("contentDetailLabel")}>상세 내용</p>
              <div className={cn("contentDetailBox")}>{content}</div>
            </div>
            <p className={cn("createdAt")}>작성일자: {formatDateString(createdAt)}</p>
          </div>
        </div>
        {userData && (
          <>
            <div className={cn("commentBox")}>
              {commentData?.pages.map((page) =>
                page.content.map((comment: CommentProps) => (
                  <Comment
                    type="taker"
                    authorId={postDetailData.author.memberId}
                    postId={id}
                    comment={comment}
                    commentId={comment.commentId}
                    key={comment.commentId}
                  />
                )),
              )}
            </div>
            {isFetchingNextPage ? (
              <Loader />
            ) : (
              hasNextPage && (
                <button onClick={() => fetchNextPage()} className={cn("fetchButton")}>
                  더 불러오기
                </button>
              )
            )}
          </>
        )}
        {userData && (
          <CommentWrite
            id={pageId as string}
            user={userData as KaKaoUserInfo}
            commentMemIds={commentMemIds}
            gender={gender}
            type="taker"
          />
        )}
      </div>
      {isReportOpen && (
        <Modal className="ReportFormBox" setState={setIsReportOpen}>
          <ReportForm
            nickname={nickname}
            postId={id}
            postType="taker"
            contentType="posts"
            content={title}
            setIsReportOpen={setIsReportOpen}
          />
        </Modal>
      )}
      {isDeleteOpen && (
        <Modal className="deleteModalBox" setState={setIsDeleteOpen}>
          <div className={cn("deleteModal")}>
            <button onClick={handleDeleteButtonClick} className={cn("closeBtn")}>
              X
            </button>
            <div className={cn("deleteContent")}>
              <div className={cn("deleteText")}>정말로 삭제 하시겠습니까?</div>
              <button onClick={confirmDelete} className={cn("confirmDeleteBtn")}>
                삭제하기
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

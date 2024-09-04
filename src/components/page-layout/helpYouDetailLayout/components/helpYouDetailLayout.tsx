import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Image from "next/image";
import { useRouter } from "next/router";

import Comment from "@/components/common/Comment/Comment";
import CommentWrite from "@/components/common/commentWrite/commentWrite";
import Loader from "@/components/common/Loader/Loader";
import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/helpYouDetailLayout/components/helpYouDetailLayout.module.scss";
import { ROUTE } from "@/constants/route";
import useUserInfoStore from "@/stores/kakaoInnfo";
import { KaKaoUserInfo } from "@/types/user";
import { formatDateString } from "@/utils";

import deletePost from "../../helpMeDetailLayout/apis/deletePost";
import getAllComment from "../apis/getAllComment";
import getGiverDetail from "../apis/getGiverDetail";

const cn = classNames.bind(styles);

interface CommentProps {
  author: {
    memberId: number;
    nickname: string;
    profileImg: string;
  };
  content: string;
  modifiedAt: string;
  commentId: number;
}

export default function HelpYouDetailLayout() {
  const router = useRouter();
  const { id: pageId } = router.query;
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["giverDetail", pageId],
    queryFn: () => getGiverDetail(pageId as string),
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
  });

  const deletePostMutation = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      // todo : queryKey를 0이 아니라 page로 바꿔야함.
      queryClient.invalidateQueries({ queryKey: ["post", 0] });
      router.push(ROUTE.HELP_YOU);
      openToast("success", "성공적으로 삭제되었습니다.");
    },
  });

  const { userInfo } = useUserInfoStore();

  const handleDeleteButtonClick = () => {
    deletePostMutation.mutate(id);
  };

  if (isPending) {
    return <div></div>;
  }

  const {
    assistanceType,
    district,
    endTime,
    id,
    scheduleType,
    startTime,
    title,
    scheduleDetails,
    content,
    modifiedAt,
    author,
  } = data;

  const { age, disabilityType, gender, nickname, profileImageUrl, memberId } = author;

  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <header className={cn("header")}>도와줄게요! 리스트</header>
        <div className={cn("totalContainer")}>
          <div className={cn("contentContainer", { isLogin: !userInfo })}>
            <p className={cn("title")}>{title}</p>
            <div className={cn("contentBox")}>
              <div className={cn("profileBox")}>
                <Image src={profileImageUrl} alt="프로필" width={35} height={35} className={cn("profileImg")} />
                <p className={cn("nickname")}>{nickname}</p>
              </div>
              <div className={cn("gridBox")}>
                <div className={cn("genderContainer")}>
                  <p className={cn("gender")}>성별</p>
                  <div className={cn("genderBox")}>
                    <p className={cn("male", { pick: gender === "남성" })}>남성</p>
                    <p className={cn("female", { pick: gender === "여성" })}>여성</p>
                  </div>
                </div>
                <div className={cn("ageContainer")}>
                  <p className={cn("age")}>나이</p>
                  <p className={cn("ageContent")}>{age}</p>
                </div>
                <div className={cn("disabilityTypeContainer")}>
                  <p className={cn("disabilityType")}>장애유형</p>
                  <p className={cn("disabilityTypeContent")}>{disabilityType}</p>
                </div>
                <div className={cn("assistanceTypeContainer")}>
                  <p className={cn("assistanceType")}>도움유형</p>
                  <div className={cn("assistanceTypeBox")}>
                    <p className={cn("education", { pick: assistanceType === "교육" })}>교육</p>
                    <p className={cn("life", { pick: assistanceType === "생활" })}>생활</p>
                  </div>
                </div>
                <div className={cn("scheduleTypeContainer")}>
                  <p className={cn("scheduleType")}>주기 구분</p>
                  <div className={cn("scheduleTypeBox")}>
                    <p className={cn("regular", { pick: scheduleType === "정기" })}>정기</p>
                    <p className={cn("irregular", { pick: scheduleType === "비정기" })}>비정기</p>
                  </div>
                </div>
                <p className={cn("scheduleDetails")}>{scheduleDetails}</p>
                <div className={cn("districtContainer")}>
                  <p className={cn("district")}>장소</p>
                  <p className={cn("districtContent")}>{district}</p>
                </div>
              </div>
              <div className={cn("periodContainer")}>
                <p className={cn("period")}>기간</p>
                <div className={cn("periodBox")}>
                  <p className={cn("time")}>{formatDateString(startTime)}</p>
                  <p>~</p> <p className={cn("time")}>{formatDateString(endTime)}</p>
                </div>
              </div>
              <div className={cn("contentDetailContainer")}>
                <p className={cn("contentDetail")}>내용</p>
                <p className={cn("contentDetailTextArea")}>{content}</p>
              </div>
            </div>
            <p className={cn("modifiedAt")}>{formatDateString(modifiedAt)}</p>
            {userInfo?.memberId === memberId && (
              <div className={cn("buttonBox")}>
                <button onClick={handleDeleteButtonClick} className={cn("button")}>
                  삭제하기
                </button>
              </div>
            )}
          </div>
          {userInfo && (
            <>
              <div className={cn("commentBox")}>
                {commentData?.pages.map((page) =>
                  page.content.map((comment: CommentProps) => (
                    <Comment type="giver" postId={data.author.memberId} comment={comment} key={comment.commentId} />
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
          {userInfo && <CommentWrite id={pageId as string} user={userInfo as KaKaoUserInfo} />}
        </div>
      </div>
    </div>
  );
}

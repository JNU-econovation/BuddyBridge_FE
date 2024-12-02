import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Image from "next/image";
import { useRouter } from "next/router";

import Comment from "@/components/common/Comment/Comment";
import CommentWrite from "@/components/common/commentWrite/commentWrite";
import getLogIn from "@/components/common/Header/apis/getLogIn";
import Loader from "@/components/common/Loader/Loader";
import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/helpMeDetailLayout/components/helpMeDetailLayout.module.scss";
import { ROUTE } from "@/constants/route";
import { KaKaoUserInfo } from "@/types/user";
import { formatDateString } from "@/utils";

import Calendar from "../../../../../public/icons/calendar.svg";
import Clock from "../../../../../public/icons/clock.svg";
import Heart from "../../../../../public/icons/heart.svg";
import Kebab from "../../../../../public/icons/kebab.svg";
import Location from "../../../../../public/icons/location.svg";
import Red_heart from "../../../../../public/icons/red_heart.svg";
import Siren from "../../../../../public/icons/siren.svg"
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
  modifiedAt: string;
  commentId: number;
}

export default function HelpMeDetailLayout() {
  const router = useRouter();

  const { id: pageId } = router.query;

  const { data, isPending } = useQuery({
    queryKey: ["takerDetail", pageId],
    queryFn: () => getTakerDetail(pageId as string),
    enabled: !!pageId,
  });
  const queryClient = useQueryClient();

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

  const deletePostMutation = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      // todo : queryKey를 0이 아니라 page로 바꿔야함.
      queryClient.invalidateQueries({ queryKey: ["post", 0] });
      router.push(ROUTE.HELP_ME);
      openToast("success", "성공적으로 삭제되었습니다.");
    },
  });

  const handleDeleteButtonClick = () => {
    deletePostMutation.mutate(id);
  };

  if (isPending) {
    return <div></div>;
  }

  const {
    assistanceType,
    district,
    id,
    scheduleType,
    title,
    scheduleDetails,
    content,
    modifiedAt,
    author,
    startDate,
    endDate,
    assistanceStartTime,
    assistanceEndTime,
    gender,
    age,
    disabilityType,
    headcount,
  } = data;

  const { nickname, profileImageUrl, memberId } = author;

  const commentMemIds: Array<number> =
    commentData?.pages.flatMap((page) => page.content.map((comment: CommentProps) => comment.author.memberId)) || [];

  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <header className={cn("header")}>
          버디브릿지는 일상에서 모두가 서로에게 <br/>
          따듯한 온정을 전하는 세상을 만듭니다.
        </header>
        <div className={cn("totalContainer")}>
          <div className={cn("contentContainer", { isLogin: !userData })}>
            <div className={cn("btnMenu")}>
              {
                userData?.memberId === data.author.memberId ? <Kebab/> : <Siren/>
              }
            </div>
            <p className={cn("title")}>{title}</p>
            <div className={cn("contentBox")}>
              <div className={cn("profileBox")}>
                <Image src={profileImageUrl} alt="프로필" width={35} height={35} className={cn("profileImg")} />
                <div className={cn("textInfoBox")}>
                  <p className={cn("nickname")}>{nickname}</p>
                  <p className={cn("gender")}> 
                    <span>성별</span> 
                    <span>{gender}</span> 
                  </p>
                  <p className={cn("age")}> 
                    <span>나이</span> 
                    <span>만{age}세</span> 
                  </p>
                  <p className={cn("disabilityType")}> 
                    <span>장애유형</span> 
                    <span>{disabilityType}</span> 
                  </p>
                  <p className={cn("assistanceType")}> 
                    <span>도움유형</span> 
                    <span>{assistanceType}</span> 
                  </p>
                </div>
              </div>
              <div className={cn("postInfoBox")}>
                <div className={cn("postDetailInfo")}>
                  <p className={cn("district")}>
                    <Location className={cn("districtIcon")}/>
                    <span>장소</span>
                    <span>{district}</span>
                  </p>
                  <p className={cn("period")}>
                    <Calendar className={cn("calendarIcon")}/>
                    <span>기간 &#38; 주기</span>
                    <span className={cn("periodContent")}>
                      <span>{scheduleType}</span>
                      <span>{formatDateString(startDate)}</span>
                      <span>~</span> 
                      <span>{formatDateString(endDate)}</span>
                      <span>{scheduleDetails}</span>
                    </span>
                  </p>
                  <p className={cn("time")}>
                    <Clock className={cn("clockIcon")}/>
                    <span>시간</span>
                    <span>{assistanceStartTime}</span>
                    <span>~</span> 
                    <span>{assistanceEndTime}</span>
                  </p>
                </div>
                {/* <div className={cn("assistanceTypeContainer")}>
                  <p className={cn("assistanceType")}>도움유형</p>
                  <p className={cn("assistanceTypeContent")}>{assistanceType}</p>
                </div> */}
              </div>
              <div className={cn("contentDetail")}>
                <p className={cn("contentDetailLable")}>상세 내용</p>
                <div className={cn("contentDetailBox")}>
                <p className={cn("contentDetailTextArea")}>{content}</p>
                </div>
              </div>
            </div>
            <p className={cn("modifiedAt")}>작성일자: {formatDateString(modifiedAt)}</p>
            {userData?.memberId === memberId && (
              <div className={cn("buttonBox")}>
                <button onClick={handleDeleteButtonClick} className={cn("button")}>
                  삭제하기
                </button>
              </div>
            )}
          </div>
          {userData && (
            <>
              <div className={cn("commentBox")}>
                {commentData?.pages.map((page) =>
                  page.content.map((comment: CommentProps) => (
                    <Comment type="taker" postId={data.author.memberId} comment={comment} key={comment.commentId} />
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
            <CommentWrite id={pageId as string} user={userData as KaKaoUserInfo} commentMemIds={commentMemIds} />
          )}
        </div>
      </div>
    </div>
  );
}

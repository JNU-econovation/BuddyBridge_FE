import classNames from "classnames/bind";

import Image from "next/image";

import styles from "@/components/page-layout/postDeclarationDetailLayout/components/PostContent/PostContent.module.scss";
import Calendar from "@/icons/calendar.svg";
import Clock from "@/icons/clock.svg";
import Location from "@/icons/location.svg";
import Person from "@/icons/personnel.svg";
import { formatDateString } from "@/utils";

const cn = classNames.bind(styles);

interface PostContentProps {
  post: {
    id: number;
    title: string;
    district: string;
    content: string;
    createdAt: Date;
    schedule: {
      startDate: Date;
      endDate: Date;
      scheduleType: string;
      scheduleDetails: string;
    };
    assistance: {
      assistanceStartTime: string;
      assistanceEndTime: string;
      assistanceType: string;
    };
  };
  author: {
    profileImageUrl: string;
    nickname: string;
    gender: string;
    age: number;
    disabilityType: string;
  };
}

export default function PostContent({ post, author }: PostContentProps) {
  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <div className={cn("titleBox")}>
          <p className={cn("postId")}>{post.id}번 글</p>
          <p className={cn("postTitle")}>{post.title}</p>
        </div>
        <div className={cn("infoCardContainer")}>
          <div className={cn("infoCardBox")}>
            <div className={cn("profileImageBox")}>
              <Image src={author.profileImageUrl} alt="프로필 사진" className={cn("profileImg")} fill />
            </div>
            <div className={cn("textInfoBox")}>
              <p className={cn("authorNickname")}>{author.nickname}</p>
              <div className={cn("authorDetailInfoBox")}>
                <p className={cn("gender")}>성별 : {author.gender}</p>
                <p className={cn("age")}>나이 : 만 {author.age}세</p>
                <p className={cn("disabilityType")}>장애유형: {author.disabilityType}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={cn("postInfoBox")}>
          <div className={cn("districtContainer")}>
            <div className={cn("districtTitleBox")}>
              <Location className={cn("districtIcon")} />
              <span className={cn("label")}>장소</span>
            </div>
            <span className={cn("district")}>{post.district}</span>
          </div>
          <div className={cn("periodContainer")}>
            <div className={cn("calendarTitleBox")}>
              <Calendar className={cn("calendarIcon")} />
              <span className={cn("label")}>기간 &#38; 주기</span>
            </div>
            <div className={cn("periodContent")}>
              <span>{`${formatDateString(post.schedule.startDate)} ~ ${formatDateString(post.schedule.endDate)}, ${
                post.schedule.scheduleType
              } (${post.schedule.scheduleDetails})`}</span>
            </div>
          </div>
          <div className={cn("timeContainer")}>
            <div className={cn("timeTitleBox")}>
              <Clock className={cn("clockIcon")} />
              <span className={cn("label")}>시간</span>
            </div>
            <div className={cn("timeContentBox")}>
              <span>{`${post.assistance.assistanceStartTime} ~ ${post.assistance.assistanceEndTime}`}</span>
            </div>
          </div>
          <div className={cn("assistanceTypeContainer")}>
            <div className={cn("assistanceTypeTitleBox")}>
              <Person className={cn("personIcon")} />
              <span className={cn("label")}>도움유형</span>
            </div>
            <span className={cn("assistanceType")}>{post.assistance.assistanceType}도움</span>
          </div>
        </div>
        <div className={cn("contentDetailContainer")}>
          <p className={cn("contentDetailLabel")}>상세 내용</p>
          <p className={cn("contentDetail")}>{post.content}</p>
        </div>
        <p className={cn("createdAt")}>작성일자: {formatDateString(post.createdAt)}</p>
      </div>
    </div>
  );
}

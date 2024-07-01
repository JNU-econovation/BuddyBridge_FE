import { useState } from "react";

import classNames from "classnames/bind";

import Image from "next/image";
import { useRouter } from "next/router";

import styles from "@/components/page-layout/helpMeDetailLayout/components/helpMeDetailLayout.module.scss";
import { ROUTE } from "@/constants/route";
import NoImg from "@/images/noimg.png";

const cn = classNames.bind(styles);

const content1 = {
  title: "같이 이동해 ‘다원’에서 점심 식사를 할 사람~ 구합니다!",
  disabilityType: "지체 장애",
  assistanceType: "생활",
  district: "광주광역시 북구",
  startTime: "2024.05.05",
  endTime: "2024.05.07",
  scheduleType: "정기",
  postType: "taker",
  postId: 1,
  age: 23,
  gender: "남성",
  scheduleDetails: "화,목",
  content: "위치: 전남대학교 상대 ‘다원’ 시간: 12:30 ~ 13:30 고기 좋아하는 분이면 좋겠습니다!",
  modifiedAt: "2024.05.05",
  id: 1,
};

const user = {
  nickname: "민보",
  profileImageUrl: NoImg,
  memberId: 1,
};

export default function HelpMeDetailLayout() {
  const {
    assistanceType,
    disabilityType,
    district,
    endTime,
    postId,
    postType,
    scheduleType,
    startTime,
    title,
    age,
    gender,
    scheduleDetails,
    content,
    modifiedAt,
    id,
  } = content1;

  const { nickname, profileImageUrl, memberId } = user;
  const router = useRouter();

  const [isApplyClick, setIsApplyClick] = useState(false);

  const handleButtonClick = () => {
    router.push(ROUTE.HELP_ME_EDIT);
  };

  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <header className={cn("header")}>도와줄래요?리스트</header>
        <div className={cn("contentContainer")}>
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
                <p className={cn("time")}>{startTime}</p>
                <p>~</p> <p className={cn("time")}>{endTime}</p>
              </div>
            </div>
            <div className={cn("contentDetailContainer")}>
              <p className={cn("contentDetail")}>내용</p>
              <p className={cn("contentDetailTextArea")}>{content}</p>
            </div>
          </div>
          <p className={cn("modifiedAt")}>{modifiedAt}</p>
        </div>
        {id === memberId && (
          <div className={cn("buttonBox")}>
            <button onClick={handleButtonClick} className={cn("button")}>
              수정하기
            </button>
          </div>
        )}{" "}
      </div>
    </div>
  );
}

import { useState } from "react";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Link from "next/link";

import getPagenationItems from "@/components/common/Pagenation/apis/getHelpMeList";
import Pagination from "@/components/common/Pagenation/Pagenation";
import Post from "@/components/common/Post/Post";
import styles from "@/components/page-layout/helpYouLayout/components/helpYouLayout.module.scss";
import { ROUTE } from "@/constants/route";

const cn = classNames.bind(styles);

const mockData = [
  {
    title: "같이 이동해 ‘다원’에서 점심 식사를 할 사람~ 구합니다!",
    disabilityType: "지체 장애",
    assistanceType: "생활",
    district: "광주광역시 북구",
    startTime: "2024.05.05",
    endTime: "2024.05.07",
    scheduleType: "정기",
    postType: "giver",
    postId: 1,
  },
  {
    title: "같이 이동해 ‘다원’에서 점심 식사를 할 사람~ 구합니다!",
    disabilityType: "지체 장애",
    assistanceType: "생활",
    district: "광주광역시 북구",
    startTime: "2024.05.05",
    endTime: "2024.05.07",
    scheduleType: "정기",
    postType: "giver",
    postId: 2,
  },
  {
    title: "같이 이동해 ‘다원’에서 점심 식사를 할 사람~ 구합니다!",
    disabilityType: "지체 장애",
    assistanceType: "생활",
    district: "광주광역시 북구",
    startTime: "2024.05.05",
    endTime: "2024.05.07",
    scheduleType: "정기",
    postType: "giver",
    postId: 3,
  },
  {
    title: "같이 이동해 ‘다원’에서 점심 식사를 할 사람~ 구합니다!",
    disabilityType: "지체 장애",
    assistanceType: "생활",
    district: "광주광역시 북구",
    startTime: "2024.05.05",
    endTime: "2024.05.07",
    scheduleType: "정기",
    postType: "giver",
    postId: 4,
  },
  {
    title: "같이 이동해 ‘다원’에서 점심 식사를 할 사람~ 구합니다!",
    disabilityType: "지체 장애",
    assistanceType: "생활",
    district: "광주광역시 북구",
    startTime: "2024.05.05",
    endTime: "2024.05.07",
    scheduleType: "정기",
    postType: "giver",
    postId: 5,
  },
  {
    title: "같이 이동해 ‘다원’에서 점심 식사를 할 사람~ 구합니다!",
    disabilityType: "지체 장애",
    assistanceType: "생활",
    district: "광주광역시 북구",
    startTime: "2024.05.05",
    endTime: "2024.05.07",
    scheduleType: "정기",
    postType: "giver",
    postId: 6,
  },
  {
    title: "같이 이동해 ‘다원’에서 점심 식사를 할 사람~ 구합니다!",
    disabilityType: "지체 장애",
    assistanceType: "생활",
    district: "광주광역시 북구",
    startTime: "2024.05.05",
    endTime: "2024.05.07",
    scheduleType: "정기",
    postType: "giver",
    postId: 7,
  },
  {
    title: "같이 이동해 ‘다원’에서 점심 식사를 할 사람~ 구합니다!",
    disabilityType: "지체 장애",
    assistanceType: "생활",
    district: "광주광역시 북구",
    startTime: "2024.05.05",
    endTime: "2024.05.07",
    scheduleType: "정기",
    postType: "giver",
    postId: 8,
  },
];

export default function HelpYouLayout() {
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["items", page],
    queryFn: () => getPagenationItems(page, 8),
    placeholderData: keepPreviousData,
  });

  const handleDisableClick = () => {};

  const handleHelpClick = () => {};

  const handleMatchingClick = () => {};

  return (
    <main className={cn("container")}>
      <div className={cn("box")}>
        <p className={cn("title")}>도와줄래요!리스트</p>
        <div className={cn("typeContainer")}>
          <div className={cn("typeBox")}>
            <p>#</p>
            <button onClick={handleDisableClick}>장애 유형</button>
            <button onClick={handleHelpClick}>도움 유형</button>
            <button onClick={handleMatchingClick}>매칭 유형</button>
          </div>
        </div>
      </div>
      <div className={cn("cardListContainer")}>
        <div className={cn("cardListBox")}>
          {mockData.map((post, idx) => (
            <Post data={post} key={idx} />
          ))}
          <Link href={ROUTE.HELP_YOU_REGISTER} className={cn("button")}>
            작성하기
          </Link>
        </div>
        <Pagination currentPage={page} itemsPerPage={8} totalItems={20} setPage={setPage} type="giver" />
      </div>
    </main>
  );
}

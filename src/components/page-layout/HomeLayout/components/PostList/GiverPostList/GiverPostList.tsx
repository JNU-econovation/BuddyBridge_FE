import classNames from "classnames/bind";

import Link from "next/link";

import Post from "@/components/common/Post/Post";
import styles from "@/components/page-layout/HomeLayout/components/PostList/GiverPostList/GiverPostList.module.scss";
import { ROUTE } from "@/constants/route";
import Plus from "@/icons/plus.svg";

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
];

export default function TakerPostList() {
  return (
    <div className={cn("container")}>
      <header className={cn("header")}>
        <p>도와줄게요!</p>
        <Link href={ROUTE.GIVER}>
          <Plus />
        </Link>
      </header>
      <div className={cn("postListBox")}>
        {mockData.map((post, idx) => (
          <Post data={post} key={idx} />
        ))}
      </div>
    </div>
  );
}

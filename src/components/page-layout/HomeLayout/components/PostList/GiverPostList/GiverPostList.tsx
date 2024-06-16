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
    disability: "지체 장애",
    help: "생활",
    place: "광주광역시 북구",
    startDate: "2024.05.05",
    endDate: "2024.05.07",
    period: "정기",
    order: 1,
    type: "giver",
  },
  {
    title: "같이 이동해 ‘다원’에서 점심 식사를 할 사람~ 구합니다!",
    disability: "지체 장애",
    help: "생활",
    place: "광주광역시 북구",
    startDate: "2024.05.05",
    endDate: "2024.05.07",
    period: "정기",
    order: 1,
    type: "giver",
  },
  {
    title: "같이 이동해 ‘다원’에서 점심 식사를 할 사람~ 구합니다!",
    disability: "지체 장애",
    help: "생활",
    place: "광주광역시 북구",
    startDate: "2024.05.05",
    endDate: "2024.05.07",
    period: "정기",
    order: 1,
    type: "giver",
  },
  {
    title: "같이 이동해 ‘다원’에서 점심 식사를 할 사람~ 구합니다!",
    disability: "지체 장애",
    help: "생활",
    place: "광주광역시 북구",
    startDate: "2024.05.05",
    endDate: "2024.05.07",
    period: "정기",
    order: 1,
    type: "giver",
  },
];

export default function GiverPostList() {
  return (
    <div className={cn("container")}>
      <header className={cn("header")}>
        <p>도와줄래요?</p>
        <Link href={ROUTE.HELP_ME}>
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

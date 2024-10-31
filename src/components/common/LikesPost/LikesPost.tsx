import classNames from "classnames/bind";

import Link from "next/link";

import { ROUTE } from "@/constants/route";
import RedHeart from "@/icons/red_heart.svg";
import { formatDateString } from "@/utils";

import styles from "./LikesPost.module.scss";
import PostStatusLabel from "../PostStatusLabel/PostStatusLabel";

const cn = classNames.bind(styles);

interface LikesPostProps {
  id: number;
  title: string;
  postStatus: "RECRUITING" | "FINISHED";
  modifiedAt: string;
  endDate: string;
  postType: "TAKER" | "GIVER";
}

export default function LikesPost({ endDate, id, modifiedAt, postStatus, title, postType }: LikesPostProps) {
  return (
    <Link href={postType === "TAKER" ? `${ROUTE.HELP_ME}/${id}` : `${ROUTE.HELP_YOU}/${id}`} className={cn("Box")}>
      <div className={cn("leftBox")}>
        <div className={cn("titleBox")}>
          <p className={cn("title")}>{`#${id} ${title}`}</p>
          <PostStatusLabel postStatus={postStatus} />
        </div>
        <div className={cn("dateBox")}>
          <p>일시 | </p>
          <p>{`${formatDateString(modifiedAt)} ~ ${formatDateString(endDate)}`}</p>
        </div>
      </div>
      <div className={cn("rightBox")}>
        <RedHeart width={32} height={32} />
        <button className={cn("detailBtn")}>자세히 보기</button>
      </div>
    </Link>
  );
}

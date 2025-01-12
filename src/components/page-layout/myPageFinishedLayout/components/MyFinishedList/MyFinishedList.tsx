import classNames from "classnames/bind";

import { MyFinishedPostType } from "@/types/post";

import styles from "./MyFinishedList.module.scss";
import FinishedPost from "../FinishedPost/FinishedPost";

const cn = classNames.bind(styles);

interface MyLikesListProps {
  finishedList: MyFinishedPostType[];
}

export default function MyFinishedList({ finishedList }: MyLikesListProps) {
  return (
    <div className={cn("container")}>
      {finishedList?.map((post) => (
        <FinishedPost
          key={post.id}
          endDate={post.schedule.endDate}
          id={post.id}
          startDate={post.schedule.startDate}
          postStatus={post.postStatus}
          title={post.title}
          postType={post.postType}
          district={post.district}
          startTime={post.assistance.assistanceStartTime}
          endTime={post.assistance.assistanceEndTime}
          matchingStatus={post.matchingStatus}
        />
      ))}
    </div>
  );
}

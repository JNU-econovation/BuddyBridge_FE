import classNames from "classnames/bind";

import { MyFinishedPostType } from "@/types/post";

import styles from "./MyFinishedList.module.scss";
import FinishedPost from "../FinishedPost/FinishedPost";

const cn = classNames.bind(styles);

interface MyFinishedListProps {
  finishedList: MyFinishedPostType[];
  memberRole: "TAKER"|"GIVER"
}

export default function MyFinishedList({ finishedList, memberRole }: MyFinishedListProps) {
  return (
    <div className={cn("container")}>
      {finishedList?.map((post) => (
        <FinishedPost
          key={post.postId}
          endDate={post.schedule.endDate}
          id={post.postId}
          email={post.giverEmail}
          name={post.giverName}
          matchingId={post.matchingId}
          startDate={post.schedule.startDate}
          postStatus={post.postStatus}
          title={post.title}
          postType={post.postType}
          district={post.district}
          startTime={post.schedule.assistanceStartTime}
          endTime={post.schedule.assistanceEndTime}
          matchingStatus={post.matchingStatus}
          memberRole={memberRole}
          canRequest={post.canVerificationRequest}
        />
      ))}
    </div>
  );
}

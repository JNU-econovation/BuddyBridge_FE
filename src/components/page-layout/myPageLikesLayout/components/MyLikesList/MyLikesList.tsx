import classNames from "classnames/bind";

import LikesPost from "@/components/common/LikesPost/LikesPost";
import { PostType } from "@/types/post";

import styles from "./MyLikesList.module.scss";

const cn = classNames.bind(styles);

interface MyLikesListProps {
  likesList: PostType[];
  pageId : number;
}

export default function MyLikesList( {likesList, pageId} : MyLikesListProps) {
  return (
    <div className={cn("container")}>
      {likesList?.map((post) => (
        <LikesPost
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
          isLiked={post.isLiked}
          pageId = {pageId}
        />
      ))}
    </div>
  );
}

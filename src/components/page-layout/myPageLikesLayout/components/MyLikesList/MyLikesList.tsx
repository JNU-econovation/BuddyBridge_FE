import classNames from "classnames/bind";

import LikesPost from "@/components/common/LikesPost/LikesPost";

import styles from "./MyLikesList.module.scss";
import { MyLikesRes } from "../../apis/getMyLikes";

const cn = classNames.bind(styles);

interface MyLikesListProps {
  likesList: MyLikesRes["content"] | undefined;
}

export default function MyLikesList({ likesList }: MyLikesListProps) {
  return (
    <div className={cn("container")}>
      {likesList?.map((post) => (
        <LikesPost
          key={post.id}
          endDate={post.endDate}
          id={post.id}
          modifiedAt={post.modifiedAt}
          postStatus={post.postStatus}
          title={post.title}
          postType={post.postType}
        />
      ))}
    </div>
  );
}

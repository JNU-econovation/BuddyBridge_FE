import { useSuspenseQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Link from "next/link";

import { Post, PostHeart } from "@/components/common/Post/Post";
import styles from "@/components/page-layout/HomeLayout/components/PostList/TakerPostList/TakerPostList.module.scss";
import { ROUTE } from "@/constants/route";
import Plus from "@/icons/plus.svg";
import { PostType } from "@/types/post";

import getTakerPost from "../../../apis/getTakerPost";

const cn = classNames.bind(styles);

export default function TakerPostList() {
  const { data } = useSuspenseQuery({
    queryKey: ["mainHelpMePostList"],
    queryFn: () => getTakerPost(),
  });

  return (
    <div className={cn("container")}>
      <header className={cn("header")}>
        <p>도와줄래요?</p>
        <Link href={ROUTE.HELP_ME}>
          <Plus />
        </Link>
      </header>
      <div className={cn("postListBox")}>
        {data.content.map((post: PostType) => (
          <Post data={post} key={post.id}>
            <PostHeart queryKey={["mainHelpMePostList"]} id={post.id} isLiked={post.isLiked} />
          </Post>
        ))}
      </div>
    </div>
  );
}

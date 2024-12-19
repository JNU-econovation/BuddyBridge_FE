import { useSuspenseQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Link from "next/link";

import Post from "@/components/common/Post/Post";
import styles from "@/components/page-layout/HomeLayout/components/PostList/GiverPostList/GiverPostList.module.scss";
import { ROUTE } from "@/constants/route";
import Plus from "@/icons/plus.svg";
import { PostType } from "@/types/post";

import getGiverPost from "../../../apis/getGiverPost";

const cn = classNames.bind(styles);

export default function GiverPostList() {
  const { data } = useSuspenseQuery({
    queryKey: ["giverPost"],
    queryFn: () => getGiverPost(),
  });

  return (
    <div className={cn("container")}>
      <header className={cn("header")}>
        <p>도와줄게요!</p>
        <Link href={ROUTE.HELP_YOU}>
          <Plus />
        </Link>
      </header>
      <div className={cn("postListBox")}>
        {data.map((post: PostType) => (
          <Post data={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}

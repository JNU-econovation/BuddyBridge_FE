import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Link from "next/link";

import Post from "@/components/common/Post/Post";
import Skeleton from "@/components/common/Skeleton/Skeleton";
import styles from "@/components/page-layout/HomeLayout/components/PostList/GiverPostList/GiverPostList.module.scss";
import { ROUTE } from "@/constants/route";
import Plus from "@/icons/plus.svg";

import getGiverPost from "../../../apis/getGiverPost";
import { PostType } from "../../../types";

const cn = classNames.bind(styles);

export default function GiverPostList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["giverPost"],
    queryFn: () => getGiverPost(),
  });

  if (isError) {
    return;
  }

  return (
    <div className={cn("container")}>
      <header className={cn("header")}>
        <p>도와줄게요!</p>
        <Link href={ROUTE.HELP_YOU}>
          <Plus />
        </Link>
      </header>
      <div className={cn("postListBox")}>
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className={cn("skeleton")} />)
          : data?.map((post: PostType) => <Post data={post} key={post.id} />)}
      </div>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Link from "next/link";

import Post from "@/components/common/Post/Post";
import Skeleton from "@/components/common/Skeleton/Skeleton";
import styles from "@/components/page-layout/HomeLayout/components/PostList/GiverPostList/GiverPostList.module.scss";
import { ROUTE } from "@/constants/route";
import Plus from "@/icons/plus.svg";

import getGiverPost from "../../../apis/getGiverPost";
import PostData from "../../../types";

const cn = classNames.bind(styles);

export default function TakerPostList() {
  const { data, isLoading } = useQuery({
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
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className={cn("skeleton")} />)
          : data?.map((post: PostData) => <Post data={post} key={post.id} />)}
      </div>
    </div>
  );
}

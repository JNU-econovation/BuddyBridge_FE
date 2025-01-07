import { Suspense } from "react";

import classNames from "classnames/bind";

import dynamic from "next/dynamic";

import ErrorBoundary from "@/components/common/ErrorBoundary/ErrorBoundary";
import styles from "@/components/page-layout/HomeLayout/components/PostList/PostList.module.scss";

import PostListSkeleton from "../PostListSkeleton/PostListSkeleton";

const TakerPostList = dynamic(
  () => import("@/components/page-layout/HomeLayout/components/PostList/TakerPostList/TakerPostList"),
  { ssr: false },
);

const GiverPostList = dynamic(
  () => import("@/components/page-layout/HomeLayout/components/PostList/GiverPostList/GiverPostList"),
  { ssr: false },
);

const cn = classNames.bind(styles);

export default function PostList() {
  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <ErrorBoundary>
          <Suspense fallback={<PostListSkeleton />}>
            <TakerPostList />
            <GiverPostList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

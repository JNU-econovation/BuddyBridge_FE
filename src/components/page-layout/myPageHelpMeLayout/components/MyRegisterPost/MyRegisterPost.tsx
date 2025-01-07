import classNames from "classnames/bind";

import { useRouter } from "next/router";

import MyPageMyInfo from "@/components/common/MyPageMyInfo/MyPageMyInfo";
import MyWriteListBox from "@/components/common/MyWriteListBox/MyWriteListBox";
import useGetMyComment from "@/hooks/useGetMyComment";
import useGetMyPost from "@/hooks/useGetMyPost";

import styles from "./MyRegisterPost.module.scss";

const cn = classNames.bind(styles);

interface MyRegisterPostProps {
  postType: string;
}

export default function MyRegisterPost({ postType }: MyRegisterPostProps) {
  const router = useRouter();
  const filter = router.query.state === "댓글" ? "댓글" : "게시물";
  const pageId = router.query.pageId || "1";

  const { data: postData, isLoading, isError } = useGetMyPost(pageId as string, postType, filter);

  const {
    data: commentData,
    isLoading: isCommentLoading,
    isError: isCommentError,
  } = useGetMyComment(pageId as string, postType, filter);

  if (isLoading || !postData) return <div>로딩...</div>;

  if (isError) return <div>에러...</div>;

  if (isCommentLoading || !commentData) return <div>로딩...</div>;

  if (isCommentError) return <div>에러...</div>;

  return (
    <div className={cn("container")}>
      <p className={cn("title")}>내 정보</p>
      <div className={cn("myInfoContainer")}>
        <MyPageMyInfo />
        <MyWriteListBox
          postType={postType}
          filter={filter}
          pageId={pageId as string}
          commentData={commentData}
          postData={postData}
        />
      </div>
    </div>
  );
}

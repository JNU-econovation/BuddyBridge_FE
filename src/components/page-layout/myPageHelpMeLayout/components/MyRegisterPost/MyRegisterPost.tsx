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

  const { data: postData } = useGetMyPost(pageId as string, postType, filter);

  const { data: commentData } = useGetMyComment(pageId as string, postType, filter);

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

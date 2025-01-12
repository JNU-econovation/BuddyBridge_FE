import { useState, useEffect } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import MyWriteFilter from "@/components/common/MyWriteFilter/ MyWriteFilter";
import MyWriteListBox from "@/components/common/MyWriteListBox/MyWriteListBox";
import openToast from "@/components/common/Toast/features/openToast";
import { ROUTE } from "@/constants/route";
import useGetMyComment from "@/hooks/useGetMyComment";
import useGetMyPost from "@/hooks/useGetMyPost";

import styles from "./myRegisterPost.module.scss";
import PostTypeFilter, {
  PostTypeFilterProps,
} from "../../../myPageLikesLayout/components/PostTypeFilter/PostTypeFilter";
import deletePosts from "../../apis/deletePosts";

const cn = classNames.bind(styles);

export default function MyRegisterPost() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const postType = (router.query.postType as PostTypeFilterProps["postType"]) || "TAKER";
  const filter = router.query.state === "post" ? "post" : router.query.state === "comment" ? "comment" : "";
  const pageId = router.query.pageId || "1";
  const queryKey = router.query.state === "post" ? "postData" : router.query.state === "comment" ? "commenData" : "";

  const [contentType, setContentType] = useState(filter);

  useEffect(() => {
    setContentType(filter);
  }, [filter]);

  const defaultData = { content: [], totalElements: 0, last: true };
  const { data: postData = defaultData, isLoading, isError } = useGetMyPost(pageId as string, postType, filter);

  const {
    data: commentData = defaultData,
    isLoading: isCommentLoading,
    isError: isCommentError,
  } = useGetMyComment(pageId as string, postType, filter);

  const deletePostMutation = useMutation({
    mutationFn: (selectedContents: number[]) => deletePosts(selectedContents),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postData", pageId, postType] });
      router.push(router.asPath);
      openToast("success", "성공적으로 삭제되었습니다.");
    },
  });

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedContents, setSelectedContents] = useState<number[]>([]);

  const changeDeleteMode = () => {
    setIsDeleteMode((prev) => !prev);
    setSelectedContents([]);
  };

  const handleDelete = () => {
    if (filter === "post") {
      console.log(selectedContents);
      deletePostMutation.mutate(selectedContents);
    }
    setSelectedContents([]);
    setIsDeleteMode(false);
  };

  if (isLoading) return <div>로딩...</div>;

  if (isError) return <div>에러...</div>;

  if (isCommentLoading) return <div>로딩...</div>;

  if (isCommentError) return <div>에러...</div>;

  return (
    <div className={cn("container")}>
      <PostTypeFilter
        queryKey={queryKey}
        route={ROUTE.MY_PAGE_My_Writings}
        pageId={`${pageId}`}
        postType={`${postType}`}
      />
      <div className={cn("myInfoContainer")}>
        <div className={cn("upperContainer")}>
          <MyWriteFilter selectedOption={contentType} onChangeOption={setContentType} />
          <button
            onClick={isDeleteMode ? handleDelete : changeDeleteMode}
            className={cn("deleteBtn", { deleteMode: isDeleteMode })}
          >
            삭제하기
          </button>
        </div>
        <MyWriteListBox
          deleteMode={isDeleteMode}
          selectedContents={selectedContents}
          setSelectedContents={setSelectedContents}
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

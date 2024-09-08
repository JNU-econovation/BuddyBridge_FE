import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import { ROUTE } from "@/constants/route";

import styles from "./SelectFilter.module.scss";

const cn = classNames.bind(styles);

interface SelectFilterProps {
  pageId: string;
  filter: string;
  postType: string;
}

export default function SelectFilter({ pageId, filter, postType }: SelectFilterProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handlePostClick = () => {
    router.push(`${ROUTE.MY_PAGE_HELP_ME}?state=게시글`);
    queryClient.invalidateQueries({ queryKey: ["postData", pageId] });
  };

  const handleCommentClick = () => {
    router.push(`${ROUTE.MY_PAGE_HELP_ME}?state=댓글`);
    queryClient.invalidateQueries({ queryKey: ["commentData", pageId] });
  };

  return (
    <div className={cn("stateBox")}>
      <button onClick={handlePostClick} className={cn("post", postType, { pick: filter === "게시물" })}>
        게시물
      </button>
      <button onClick={handleCommentClick} className={cn("comment", postType, { pick: filter === "댓글" })}>
        댓글
      </button>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";

import getMyComment from "@/components/page-layout/myPageHelpMeLayout/apis/getMyComment";

const useGetMyComment = (pageId: string, postType: string, filter: string) => {
  return useQuery({
    queryKey: ["commentData", pageId],
    queryFn: () => getMyComment(pageId as string, postType),
    enabled: !!pageId && filter === "댓글",
  });
};

export default useGetMyComment;

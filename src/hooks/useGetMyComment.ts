import { useQuery } from "@tanstack/react-query";

import getMyComment from "@/components/page-layout/myPageHelpMeLayout/apis/getMyComment";

const useGetMyComment = (pageId: number, postType: string, filter: string) => {
  return useQuery({
    queryKey: ["commentData", pageId, postType],
    queryFn: () => getMyComment(pageId, postType),
    enabled: pageId >= 0 && !!postType && filter === "comment",
  });
};

export default useGetMyComment;

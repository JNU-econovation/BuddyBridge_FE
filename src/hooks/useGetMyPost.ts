import { useQuery } from "@tanstack/react-query";

import getMyPost from "@/components/page-layout/myPageHelpMeLayout/apis/getMyPost";

const useGetMyPost = (pageId: string, postType: string, filter: string) => {
  return useQuery({
    queryKey: ["postData", pageId],
    queryFn: () => getMyPost(pageId as string, postType),
    enabled: !!pageId && filter === "게시물",
  });
};

export default useGetMyPost;

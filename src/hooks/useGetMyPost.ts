import { useQuery } from "@tanstack/react-query";

import getMyPost from "@/components/page-layout/myPageHelpMeLayout/apis/getMyPost";

const useGetMyPost = (pageId: string, postType: string, filter: string) => {
  return useQuery({
    queryKey: ["postData", pageId, postType],
    queryFn: () => getMyPost(pageId as string, postType),
    enabled: !!pageId && !!postType && filter === "post",
  });
};

export default useGetMyPost;

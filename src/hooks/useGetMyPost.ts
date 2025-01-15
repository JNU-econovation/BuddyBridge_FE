import { useQuery } from "@tanstack/react-query";

import getMyPost from "@/components/page-layout/myPageHelpMeLayout/apis/getMyPost";

const useGetMyPost = (pageId: number, postType: string, filter: string) => {
  return useQuery({
    queryKey: ["postData", pageId, postType],
    queryFn: () => getMyPost(pageId, postType),
    enabled: pageId >= 0 && !!postType && filter === "post",
  });
};

export default useGetMyPost;

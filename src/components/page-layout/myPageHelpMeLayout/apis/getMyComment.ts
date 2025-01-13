import { axiosInstance } from "@/apis/axiosInstance";
import { MyWriteCommentResponse } from "@/types/comment";

export default async function getMyComment(pageId: string, postType: string) {
  console.log("comment", "postType", postType, "pageId", pageId);
  const { data } = await axiosInstance.get<MyWriteCommentResponse>(
    `/comments/my-page?post-type=${postType}&page=${pageId}&size=4`,
  );
  return data.data;
}

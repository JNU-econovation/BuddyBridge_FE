import { axiosInstance } from "@/apis/axiosInstance";
import { MyWriteCommentResponse } from "@/types/comment";

export default async function getMyComment(pageId: number, postType: string) {
  const { data } = await axiosInstance.get<MyWriteCommentResponse>(
    `my-page/comments?post-type=${postType}&page=${pageId}&size=4`,
  );
  return data.data;
}

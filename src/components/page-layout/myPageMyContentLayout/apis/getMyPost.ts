import { axiosInstance } from "@/apis/axiosInstance";
import { MyWritePostResponse } from "@/types/post";

export default async function getMyPost(pageId: number, postType: string) {
  const { data } = await axiosInstance.get<MyWritePostResponse>(
    `my-page/posts?post-type=${postType}&page=${pageId}&size=4`,
  );
  return data.data;
}

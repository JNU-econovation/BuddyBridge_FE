import { axiosInstance } from "@/apis/axiosInstance";
import { MyWritePostResponse } from "@/types/post";

export default async function getMyPost(pageId: string, postType: string) {
  //console.log("postType", postType);
  const { data } = await axiosInstance.get<MyWritePostResponse>(
    `/posts/my-page?post-type=${postType}&page=${pageId}&size=4`,
  );
  return data.data;
}

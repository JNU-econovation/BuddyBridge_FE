import { axiosInstance } from "@/apis/axiosInstance";
import { MyLikesResponse } from "@/types/post";

export default async function getMyLikes(pageId: string, postType: string) {
  const { data } = await axiosInstance.get<MyLikesResponse>(
    `posts/likes/my-page?post-type=${postType}&page=${pageId}&size=4`,
  );
  return data.data;
}

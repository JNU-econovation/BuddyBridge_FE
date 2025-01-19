import { axiosInstance } from "@/apis/axiosInstance";
import { MyLikesPostResponse } from "@/types/post";

export default async function getMyLikes(pageId: number, postType: string) {
  const { data } = await axiosInstance.get<MyLikesPostResponse>(
    `my-page/posts/likes?post-type=${postType}&page=${pageId}&size=4`,
  );
  return data.data;
}

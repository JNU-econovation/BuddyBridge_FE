import { axiosInstance } from "@/apis/axiosInstance";
import { PostListResponse } from "@/types/post";

export default async function getTakerPost() {
  const { data } = await axiosInstance.get<PostListResponse>(
    "posts?post-type=TAKER&page=1&size=4&sorted=modifiedAt,DESC&post-status=RECRUITING",
  );

  return data.data.content;
}

import { axiosInstance } from "@/apis/axiosInstance";
import { PostListResponse } from "@/types/post";

export default async function getTakerPost() {
  try {
    const { data } = await axiosInstance.get<PostListResponse>(
      "posts?post-type=TAKER&page=0&size=4&sorted=modifiedAt,DESC&post-status=RECRUITING",
    );

    return data.data.content;
  } catch {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    const { data } = await axiosInstance.get<PostListResponse>(
      "posts?post-type=TAKER&page=0&size=4&sorted=modifiedAt,DESC&post-status=RECRUITING",
    );

    return data.data.content;
  }
}

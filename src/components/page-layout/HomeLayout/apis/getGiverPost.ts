import { axiosInstance } from "@/apis/axiosInstance";
import { PostListResponse } from "@/types/post";

export default async function getGiverPost() {
  try {
    const { data } = await axiosInstance.get<PostListResponse>(
      "posts?post-type=GIVER&page=0&size=4&sorted=modifiedAt,DESC&post-status=RECRUITING",
    );
    return data.data;
  } catch {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    const { data } = await axiosInstance.get<PostListResponse>(
      "posts?post-type=GIVER&page=0&size=4&sorted=modifiedAt,DESC&post-status=RECRUITING",
    );
    return data.data;
  }
}

import { axiosInstance } from "@/apis/axiosInstance";

import { PostListResponse } from "../types";

export default async function getGiverPost() {
  const { data } = await axiosInstance.get<PostListResponse>(
    "posts?post-type=GIVER&page=1&size=4&sorted=modifiedAt,DESC&post-status=RECRUITING",
  );
  return data.data.content;
}

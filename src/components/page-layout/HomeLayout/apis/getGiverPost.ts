import { axiosInstance } from "@/apis/axiosInstance";

export default async function getGiverPost() {
  const accessToken = localStorage.getItem("accessToken");

  const { data } = await axiosInstance.get(
    "posts?post-type=GIVER&page=1&size=4&sorted=modifiedAt,DESC&post-status=RECRUITING",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data.data.content;
}

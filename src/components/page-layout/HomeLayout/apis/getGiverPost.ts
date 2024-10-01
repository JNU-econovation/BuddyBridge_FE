import axiosInstance from "@/apis/axiosInstance";

export default async function getGiverPost() {
  const { data } = await axiosInstance.get(
    "posts?post-type=GIVER&page=1&size=4&sorted=modifiedAt,DESC&post-status=RECRUITING",
    {
      withCredentials: true,
    },
  );
  return data.data.content;
}

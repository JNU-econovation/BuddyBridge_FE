import axiosInstance from "@/apis/axiosInstance";

export default async function getGiverPost() {
  const { data } = await axiosInstance.get("posts?post-type=GIVER&page=0&size=4&sorted=modifiedAt,DESC");
  return data.data.content;
}

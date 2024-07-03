import axiosInstance from "@/apis/axiosInstance";

export default async function getTakerPost() {
  const { data } = await axiosInstance.get("posts?post-type=TAKER&page=0&size=4&sorted=modifiedAt,DESC");
  return data.data.content;
}

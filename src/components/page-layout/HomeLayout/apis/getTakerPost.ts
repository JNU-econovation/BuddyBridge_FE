import axiosInstance from "@/apis/axiosInstance";

export default async function getTakerPost() {
  const { data } = await axiosInstance.get(
    "posts?post-type=TAKER&page=1&size=4&sorted=modifiedAt,DESC&post-status=RECRUITING",
  );
  return data.data.content;
}

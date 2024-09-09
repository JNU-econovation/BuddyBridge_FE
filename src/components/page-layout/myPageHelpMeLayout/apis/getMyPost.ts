import axiosInstance from "@/apis/axiosInstance";

export default async function getMyPost(pageId: string, postType: string) {
  const { data } = await axiosInstance.get(`/posts/my-page?post-type=${postType}&page=${pageId}&size=4`, {
    withCredentials: true,
  });
  return data.data;
}

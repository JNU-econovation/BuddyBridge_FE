import axiosInstance from "@/apis/axiosInstance";

export default async function postLikes(postId: number) {
  const { data } = await axiosInstance.post(
    `posts/likes/${postId}`,
    {},
    {
      withCredentials: true,
    },
  );
  return data;
}

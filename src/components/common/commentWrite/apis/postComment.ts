import axiosInstance from "@/apis/axiosInstance";

export default async function postComment(id: string, comment: string) {
  const { data } = await axiosInstance.post(
    `comments/${id}`,
    {
      content: comment,
    },
    { withCredentials: true },
  );

  return data.data;
}

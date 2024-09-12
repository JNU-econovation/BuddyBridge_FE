import axiosInstance from "@/apis/axiosInstance";

export default async function putComment(id: string, comment: string) {
  const { data } = await axiosInstance.put(
    `comments/${id}`,
    {
      content: comment,
    },
    { withCredentials: true },
  );

  return data.data;
}
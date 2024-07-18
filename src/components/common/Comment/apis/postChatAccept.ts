import axiosInstance from "@/apis/axiosInstance";

interface PostChatAcceptType {
  body: {
    postId: number;
    takerId: number;
    giverId: number;
  };
}

export default async function postChatAccept({ body }: PostChatAcceptType) {
  const { data } = await axiosInstance.post(
    `matching/accept`,
    {
      ...body,
    },
    { withCredentials: true },
  );

  return data.data;
}

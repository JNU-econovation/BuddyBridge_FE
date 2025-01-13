import { axiosInstance } from "@/apis/axiosInstance";

interface PostChatAcceptType {
  body: {
    postId: number;
    commentId: number;
  };
}

export default async function postChatAccept({ body }: PostChatAcceptType) {
  const { data } = await axiosInstance.post(`matching/accept`, {
    ...body,
  });

  return data.data;
}

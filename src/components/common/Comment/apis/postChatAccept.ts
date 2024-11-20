import { axiosCertificationInstance } from "@/apis/axiosInstance";

interface PostChatAcceptType {
  body: {
    postId: number;
    takerId: number;
    giverId: number;
  };
}

export default async function postChatAccept({ body }: PostChatAcceptType) {
  const { data } = await axiosCertificationInstance.post(`matching/accept`, {
    ...body,
  });

  return data.data;
}

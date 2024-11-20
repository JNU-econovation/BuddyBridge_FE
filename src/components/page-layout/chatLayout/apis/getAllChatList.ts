import { axiosCertificationInstance } from "@/apis/axiosInstance";

export default async function getAllChatList(limit: number, cursor: number, matchingState: string) {
  if (matchingState == "ALL" && cursor !== 0) {
    const { data } = await axiosCertificationInstance.get(`chat/matchings?limit=${limit}&cursor=${cursor}`);
    return data.data;
  }

  if (matchingState == "ALL" && cursor === 0) {
    const { data } = await axiosCertificationInstance.get(`chat/matchings?limit=${limit}`);
    return data.data;
  }

  if (cursor !== 0) {
    const { data } = await axiosCertificationInstance.get(
      `chat/matchings?limit=${limit}&cursor=${cursor}&matching-status=${matchingState}`,
    );
    return data.data;
  } else {
    const { data } = await axiosCertificationInstance.get(
      `chat/matchings?limit=${limit}&matching-status=${matchingState}`,
    );
    return data.data;
  }
}

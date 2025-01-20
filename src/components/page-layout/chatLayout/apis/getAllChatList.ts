import { axiosInstance } from "@/apis/axiosInstance";

export default async function getAllChatList(limit: number, cursor: number, matchingState: "ALL" | "PENDING" | "DONE") {
  if (matchingState == "ALL" && cursor !== 0) {
    const { data } = await axiosInstance.get(`chat/matchings?limit=${limit}&cursor=${cursor}`);
    return data.data;
  }

  if (matchingState == "ALL" && cursor === 0) {
    const { data } = await axiosInstance.get(`chat/matchings?limit=${limit}`);
    return data.data;
  }

  if (matchingState == "PENDING" && cursor !== 0) {
    const { data } = await axiosInstance.get(
      `chat/matchings?limit=${limit}&cursor=${cursor}&matching-status=${matchingState}`,
    );
    return data.data;
  }

  if (matchingState == "PENDING" && cursor === 0) {
    const { data } = await axiosInstance.get(`chat/matchings?limit=${limit}&matching-status=${matchingState}`);
    return data.data;
  }

  if (matchingState == "DONE" && cursor !== 0) {
    const { data } = await axiosInstance.get(
      `chat/matchings?limit=${limit}&cursor=${cursor}&matching-status=["DONE","VOLUNTEERING_COMPLETED","VOLUNTEERING_VERIFIED"]`,
    );
    return data.data;
  }

  if (matchingState == "DONE" && cursor === 0) {
    const { data } = await axiosInstance.get(
      `chat/matchings?limit=${limit}&matching-status=["DONE","VOLUNTEERING_COMPLETED","VOLUNTEERING_VERIFIED"]`,
    );
    return data.data;
  }
}

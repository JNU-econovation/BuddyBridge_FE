import axiosInstance from "@/apis/axiosInstance";

export default async function getAllChatList(limit: number, cursor: number, matchingState: string) {
  if (matchingState == "ALL" && cursor !== 0) {
    const { data } = await axiosInstance.get(`chat/matchings?limit=${limit}&cursor=${cursor}`, {
      withCredentials: true,
    });
    return data.data;
  }

  if (matchingState == "ALL" && cursor === 0) {
    const { data } = await axiosInstance.get(`chat/matchings?limit=${limit}`, {
      withCredentials: true,
    });
    return data.data;
  }

  if (cursor !== 0) {
    const { data } = await axiosInstance.get(
      `chat/matchings?limit=${limit}&cursor=${cursor}&matching-status=${matchingState}`,
      {
        withCredentials: true,
      },
    );
    return data.data;
  } else {
    const { data } = await axiosInstance.get(`chat/matchings?limit=${limit}&matching-status=${matchingState}`, {
      withCredentials: true,
    });
    return data.data;
  }
}

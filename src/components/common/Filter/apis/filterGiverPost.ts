import axiosInstance from "@/apis/axiosInstance";

export interface FilterParams {
    disabilityType: string;
    assistanceType: string;
}

export default async function filterGiverPost({disabilityType, assistanceType}:FilterParams) {
  const { data } = await axiosInstance.get(
    `posts?post-type=GIVER&disabilityType=${disabilityType}&assistanceType=${assistanceType}`, //수정
  );
  return data.data.content;
}
import { axiosInstance } from "@/apis/axiosInstance";

export default async function getPaginationItems(
  postType: string,
  page: number,
  limit: number,
  allType: string,
  postStatus: string,
  disabilityType: string,
  assistanceType: string,
) {
  const url = allType
    ? `posts?post-type=${postType}&page=${page}&size=${limit}&sorted=modifiedAt,DESC`
    : `posts?post-type=${postType}&page=${page}&size=${limit}&sorted=modifiedAt,DESC` +
      (postStatus ? `&post-status=${postStatus}` : "") +
      (disabilityType ? `&disability-type=${disabilityType}` : "") +
      (assistanceType ? `&assistance-type=${assistanceType}` : "");
  const { data } = await axiosInstance.get(url);

  return data.data;
}

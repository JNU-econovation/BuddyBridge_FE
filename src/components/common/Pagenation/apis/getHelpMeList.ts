import axiosInstance from "@/apis/axiosInstance";

export default async function getPagenationItems(postType: string, page: number, limit: number,disabilityType: string|null, assistanceType: string|null) {
  
  let url = `posts?post-type=${postType}&page=${page}&size=${limit}&sorted=modifiedAt,DESC&post-status=RECRUITING`;

  if (disabilityType) {
    url += `&disability-type=${disabilityType}`;
  }
  if (assistanceType) {
    url += `&assistance-type=${assistanceType}`;
  }

  const { data } = await axiosInstance.get(url);

  return data;

}

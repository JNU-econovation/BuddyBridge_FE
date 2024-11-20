import { axiosCertificationInstance } from "@/apis/axiosInstance";

export default async function getMyComment(pageId: string, postType: string) {
  const { data } = await axiosCertificationInstance.get(
    `/comments/my-page?post-type=${postType}&page=${pageId}&size=4`,
  );
  return data.data;
}

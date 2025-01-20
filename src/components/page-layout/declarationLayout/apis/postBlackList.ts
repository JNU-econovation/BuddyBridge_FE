import { axiosInstance } from "@/apis/axiosInstance";

export default async function postBlackList(id: number) {
  const { data } = await axiosInstance.post("v1/admin/blacklist", { reportedMemberId: id });

  return data.data;
}

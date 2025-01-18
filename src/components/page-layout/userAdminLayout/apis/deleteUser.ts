import { axiosInstance } from "@/apis/axiosInstance";

export default async function deleteUser(id: number[]) {
  const { data } = await axiosInstance.delete(`v1/admin/members`, {
    data: {
      memberIds: id,
    },
  });

  return data.data;
}

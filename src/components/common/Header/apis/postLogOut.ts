import axiosInstance from "@/apis/axiosInstance";

// todo: 리턴 값에 대한 type 지정 필요
export default async function postLogOut() {
  const { data } = await axiosInstance.get("oauth/logout", {
    withCredentials: true,
  });
  return data.data;
}

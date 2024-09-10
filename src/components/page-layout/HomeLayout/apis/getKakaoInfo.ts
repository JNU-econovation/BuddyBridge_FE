import axiosInstance from "@/apis/axiosInstance";

export default async function getKakaoInfo(code: string) {
  const { data } = await axiosInstance.post(
    "oauth/login",
    { authorizationCode: code },
    {
      withCredentials: true,
    },
  );
  return data.data;
}

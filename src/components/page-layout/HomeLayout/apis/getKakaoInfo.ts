import axiosInstance from "@/apis/axiosInstance";

export default async function getKakaoInfo(code: string) {
  if (code != "1") {
    const { data } = await axiosInstance.post(
      "oauth/login",
      { authorizationCode: code },
      {
        withCredentials: true,
      },
    );
    return data.data;
  } else {
    const { data } = await axiosInstance.get("oauth/login/1");
    return data.data;
  }
}

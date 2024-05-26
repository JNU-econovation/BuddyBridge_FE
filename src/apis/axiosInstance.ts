import axios, { AxiosInstance } from "axios";

const axiosKakaoInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_KAKAO_API_URL}`,
  withCredentials: true,
});

export { axiosKakaoInstance };

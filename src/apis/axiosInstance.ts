import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosCertificationInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosCertificationInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

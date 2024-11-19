import { axiosInstance } from "@/apis/axiosInstance";

interface LoginRequest {
  body: {
    email: string;
    password: string;
  };
}

interface LoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    grantType: string;
    expiresIn: number;
  };
  error: {
    message: string;
    code: string;
    status: number;
  };
}

export default async function postLogin({ body }: LoginRequest) {
  const { data } = await axiosInstance.post<LoginResponse>(`auth/login`, {
    email: body.email,
    password: body.password,
  });
  return data;
}

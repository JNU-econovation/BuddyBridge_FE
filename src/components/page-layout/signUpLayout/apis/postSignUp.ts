import { axiosInstance } from "@/apis/axiosInstance";

interface SignUpRequest {
  body: {
    name: string;
    nickname: string;
    gender: string;
    birthDate: Date;
    email: string;
    password: string;
  };
}

interface SignUpResponse {
  data: {
    message: string;
  } | null;
  error: {
    message: string;
    code: string;
    status: number;
  };
  success: boolean;
}

export default async function postSignUp({ body }: SignUpRequest) {
  const birthDate = new Date(body.birthDate);
  birthDate.setDate(birthDate.getDate() + 1);

  const { data } = await axiosInstance.post<SignUpResponse>(`auth/signup`, {
    name: body.name,
    nickname: body.nickname,
    gender: body.gender,
    birthDate: birthDate,
    email: body.email,
    password: body.password,
  });
  return data;
}

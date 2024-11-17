import axiosInstance from "@/apis/axiosInstance";

interface SignUpInfo {
  body: {
    name: string;
    gender: string;
    birthDate: Date;
    email: string;
    password: string;
  };
}

export default async function postSignUp({ body }: SignUpInfo) {
  const { data } = await axiosInstance.post(`auth/signup`, {
    name: body.name,
    gender: body.gender,
    birthDate: body.birthDate,
    email: body.email,
    password: body.password,
  });
  return data;
}

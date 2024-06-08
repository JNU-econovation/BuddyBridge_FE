import { ReactElement, useEffect } from "react";

import { GetServerSidePropsContext, Metadata } from "next";

import Link from "next/link";

import axiosInstance from "@/apis/axiosInstance";
import Post from "@/components/common/Post/Post";
import RootLayout from "@/components/common/RootLayout/RootLayout";
import useUserInfoStore from "@/stores/kakaoInnfo";
import { KaKaoUserInfo } from "@/types/user";

const mockData = {
  title: "같이 이동해 ‘다원’에서 점심 식사를 할 사람~ 구합니다!",
  disability: "지체 장애",
  help: "생활",
  place: "광주광역시 북구",
  startDate: "2024.05.05",
  endDate: "2024.05.07",
  period: "정기",
  order: 1,
  type: "giver",
};

export const metadata: Metadata = {
  title: "Buddy Bridge",
  description: "장애인을 도와주는 봉사 플랫폼입니다.",
};

interface HomeProps {
  user: KaKaoUserInfo;
  cookie: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { code } = context.query;

  if (code) {
    try {
      const response = await axiosInstance.post(
        "api/oauth/login",
        { authorizationCode: code },
        {
          withCredentials: true,
        },
      );

      if (response.data.data) {
        return {
          props: {
            user: response.data.data,
            cookie: response.headers["set-cookie"],
          },
        };
      }
    } catch (error) {
      console.error("카카오 로그인 실패", error);
    }
  }

  return { props: {} };
}

export default function Home({ user, cookie }: HomeProps) {
  const { setUserInfo } = useUserInfoStore();

  if (cookie) {
    document.cookie = cookie;
  }

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, [user, setUserInfo]);

  return (
    <>
      <Post data={mockData} />
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

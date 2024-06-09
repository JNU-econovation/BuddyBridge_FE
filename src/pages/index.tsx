import { ReactElement, useEffect } from "react";

import { GetServerSidePropsContext, Metadata } from "next";

import axiosInstance from "@/apis/axiosInstance";
import RootLayout from "@/components/common/RootLayout/RootLayout";
import HomeLayout from "@/components/page-layout/HomeLayout/components/HomeLayout";
import HomeProps from "@/components/page-layout/HomeLayout/types";

export const metadata: Metadata = {
  title: "Buddy Bridge",
  description: "장애인을 도와주는 봉사 플랫폼입니다.",
};

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
  return <HomeLayout user={user} cookie={cookie} />;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

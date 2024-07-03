import { ReactElement, useEffect } from "react";

import { Metadata } from "next";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import HomeLayout from "@/components/page-layout/HomeLayout/components/HomeLayout";

export const metadata: Metadata = {
  title: "Buddy Bridge",
  description: "장애인을 도와주는 봉사 플랫폼입니다.",
};

export default function Home() {
  return <HomeLayout />;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

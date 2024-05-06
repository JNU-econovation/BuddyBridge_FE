import { Metadata } from "next";
import RootLayout from "@/common/components/RootLayout/RootLayout";

export const metadata: Metadata = {
  title: "Buddy Bridge",
  description: "장애인을 도와주는 봉사 플랫폼입니다.",
};

export default function Home() {
  return (
    <RootLayout>
      <h1>Buddy Bridge</h1>
    </RootLayout>
  );
}

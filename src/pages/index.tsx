import { Metadata } from "next";
import RootLayout from "@/components/RootLayout/RootLayout";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Buddy Bridge",
  description: "장애인을 도와주는 봉사 플랫폼입니다.",
};

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  const handleLogOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <RootLayout>
      <Link href="/login">로그인 페이지로 가기</Link>
      <button onClick={handleLogOut}>로그아웃 하기</button>
    </RootLayout>
  );
}

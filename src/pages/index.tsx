import axios from "axios";
import { Metadata } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Buddy Bridge",
  description: "장애인을 도와주는 봉사 플랫폼입니다.",
};

export default function Home() {
  const [code, setCode] = useState<string | null>("");

  useEffect(() => {
    const urlCode = new URL(window.location.href).searchParams.get("code");
    setCode(urlCode);
    console.log(urlCode);
  }, []);

  useEffect(() => {
    if (code) {
      axios
        .post(`https://c843-168-131-194-125.ngrok-free.app/api/oauth/login`, {
          authorizationCode: code,
        })
        .then((response) => {
          console.log("Login success:", response.data);
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
    }
  }, [code]);

  return <Link href="/login">로그인 페이지로 가기</Link>;
}

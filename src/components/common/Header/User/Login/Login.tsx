import { useEffect, useRef, useState } from "react";

import axios from "axios";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import useDetectClose from "@/components/common/DropDown/hooks/useDetectClose";
import styles from "@/components/common/Header/User/Login/Login.module.scss";
import { ROUTE } from "@/constants/route";
import Alarm from "@/icons/alarm.svg";
import ArrowDown from "@/icons/arrow_down.svg";
import Chat from "@/icons/chattig.svg";
import useUserInfoStore from "@/stores/kakaoInnfo";

import DropDown from "../DropDown/DropDown";

const cn = classNames.bind(styles);

interface LoginProps {
  name: string | undefined;
}

export default function Login({ name }: LoginProps) {
  const { userInfo } = useUserInfoStore();
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useDetectClose(dropdownRef, false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter();

  const handleNameClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChatClick = () => {
    router.push(ROUTE.CHAT);
  };

  // SSE 연결 및 알림 수신
  useEffect(() => {
    if (!userInfo) return; // userInfo가 없으면 연결하지 않음

    let eventSource: EventSource;
    let lastEventId = "";

    const connectSSE = () => {
      eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BASE_URL}api/sse/connect`, {
        withCredentials: true,
      });

      eventSource.addEventListener("notification", (event) => {
        const newNotification = event.data;
        console.log("새로운 알림:", newNotification);
        try {
          const parsedData = JSON.parse(newNotification);
          console.log(parsedData);
        } catch (error) {
          return;
        }

        setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
        lastEventId = event.lastEventId;
      });

      eventSource.onerror = (error) => {
        console.error("SSE error:", error);
        setError("연결에 실패했습니다. 재연결 중...");
        setIsConnected(false);
        eventSource.close();
        setTimeout(connectSSE, 5000); // 5초 후 재연결 시도
      };

      eventSource.onopen = () => {
        setError(null);
        setIsConnected(true);
        console.log("SSE 연결 성공");
      };
    };

    connectSSE(); // SSE 연결 시도

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [userInfo]); // userInfo가 변경될 때마다 effect 실행

  return (
    <div className={cn("container")}>
      <div ref={dropdownRef} className={cn("nameBox")} onClick={handleNameClick}>
        <p>{`${name}님`}</p>
        <ArrowDown width={13} height={13} />
        <DropDown isNameClick={isOpen} />
      </div>
      <div className={cn("iconBox")}>
        <Alarm width={30} height={30} className={cn("alarm")} />
        <Chat width={30} height={30} onClick={handleChatClick} className={cn("chat")} />
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

import classNames from "classnames/bind";

import { useRouter } from "next/router";

import useDetectClose from "@/components/common/DropDown/hooks/useDetectClose";
import styles from "@/components/common/Header/User/Login/Login.module.scss";
import { ROUTE } from "@/constants/route";
import Alarm from "@/icons/alarm.svg";
import ArrowDown from "@/icons/arrow_down.svg";
import Chat from "@/icons/chattig.svg";
import useUserInfoStore from "@/stores/kakaoInnfo";

import AlarmDropDown from "./AlarmDropDown/AlarmDropDown";
import DropDown from "../DropDown/DropDown";

const cn = classNames.bind(styles);

interface LoginProps {
  name: string | undefined;
}

interface alarmType {
  url: string;
  content: string;
  id: string;
}

export default function Login({ name }: LoginProps) {
  const { userInfo } = useUserInfoStore();
  const profileDropdownRef = useRef(null);
  const alarmDropdownRef = useRef(null);
  const [isProfileOpen, setIsProfileOpen] = useDetectClose(profileDropdownRef, false);
  const [isAlarmOpen, setIsAlarmOpen] = useDetectClose(alarmDropdownRef, false);
  const [notifications, setNotifications] = useState<alarmType>();
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter();

  const handleNameClick = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const handleAlarmClick = () => {
    setIsAlarmOpen((prev) => !prev);
  };

  const handleChatClick = () => {
    router.push(ROUTE.CHAT);
  };

  useEffect(() => {
    if (!userInfo) return;

    let eventSource: EventSource;

    const connectSSE = () => {
      if (retryCount >= 3) {
        setError("연결 시도 횟수를 초과했습니다.");
        return;
      }

      eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BASE_URL}api/sse/connect`, {
        withCredentials: true,
      });

      eventSource.addEventListener("notification", (event) => {
        const newNotification = event.data;
        let parsedData;

        try {
          parsedData = JSON.parse(newNotification);
        } catch (error) {
          return;
        }

        setNotifications(parsedData);
      });

      eventSource.onerror = (error) => {
        console.error("SSE error:", error);
        setError("연결에 실패했습니다. 재연결 중...");
        setIsConnected(false);
        eventSource.close();
        setRetryCount((prevCount) => prevCount + 1);
        setTimeout(connectSSE, 5000);
      };

      eventSource.onopen = () => {
        setError(null);
        setIsConnected(true);
        setRetryCount(0);
        console.log("SSE 연결 성공");
      };
    };

    connectSSE();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [userInfo, retryCount]);

  return (
    <div className={cn("container")}>
      <div ref={profileDropdownRef} className={cn("nameBox")} onClick={handleNameClick}>
        <p>{`${name}님`}</p>
        <ArrowDown width={13} height={13} />
        <DropDown isNameClick={isProfileOpen} />
      </div>
      <div className={cn("iconBox")}>
        <div ref={alarmDropdownRef} className={cn("alarmContainer")}>
          <Alarm width={30} height={30} className={cn("alarm")} onClick={handleAlarmClick} />
          {isAlarmOpen && <AlarmDropDown sseNotifications={notifications as alarmType} />}
        </div>
        <Chat width={30} height={30} onClick={handleChatClick} className={cn("chat")} />
      </div>
    </div>
  );
}

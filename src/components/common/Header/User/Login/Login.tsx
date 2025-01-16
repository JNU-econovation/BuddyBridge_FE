import { useEffect, useRef, useState } from "react";

import classNames from "classnames/bind";
import { EventSourcePolyfill } from "event-source-polyfill";

import { useRouter } from "next/router";

import useDetectClose from "@/components/common/DropDown/hooks/useDetectClose";
import styles from "@/components/common/Header/User/Login/Login.module.scss";
import { ROUTE } from "@/constants/route";
import Alarm from "@/icons/alarm.svg";
import ArrowDown from "@/icons/arrow_down.svg";
import Chat from "@/icons/chattig.svg";

import AlarmDropDown from "./AlarmDropDown/AlarmDropDown";
import { useNotification } from "../../hooks/useNotification";
import DropDown from "../DropDown/DropDown";

const cn = classNames.bind(styles);

interface LoginProps {
  name: string | undefined;
}

interface alarmType {
  url: string;
  content: string;
  id: string;
  isRead: boolean;
  type: string;
}

export default function Login({ name }: LoginProps) {
  const accessToken = localStorage.getItem("accessToken");
  const profileDropdownRef = useRef(null);
  const alarmDropdownRef = useRef(null);
  const [isProfileOpen, setIsProfileOpen] = useDetectClose(profileDropdownRef, false);
  const [isAlarmOpen, setIsAlarmOpen] = useDetectClose(alarmDropdownRef, false);
  const [notifications, setNotifications] = useState<alarmType>();
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
    if (!accessToken) return;

    let eventSource: EventSourcePolyfill;

    const connectSSE = () => {
      eventSource = new EventSourcePolyfill(`${process.env.NEXT_PUBLIC_BASE_URL}api/sse/connect`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      eventSource.addEventListener("notification", (event) => {
        const newNotification = (event as any).data;

        let parsedData;

        try {
          parsedData = JSON.parse(newNotification);
        } catch (error) {
          return;
        }

        setNotifications(parsedData);
      });

      eventSource.onopen = () => {
        console.log("SSE 연결 성공");
      };

      eventSource.onerror = (error) => {
        console.error("SSE error:", error);
        eventSource.close();
      };
    };

    connectSSE();

    return () => {
      eventSource.close();
    };
  }, [accessToken]);

  const { totalUnreadCount } = useNotification(notifications as alarmType, "", "");

  return (
    <div className={cn("container")}>
      <div ref={profileDropdownRef} className={cn("nameBox")} onClick={handleNameClick}>
        <p>{`${name}님`}</p>
        <ArrowDown width={13} height={13} />
        <DropDown isNameClick={isProfileOpen} />
      </div>
      <div className={cn("iconBox")}>
        <div ref={alarmDropdownRef} className={cn("alarmContainer")}>
          <div className={cn("alarmBox")}>
            <Alarm width={30} height={30} className={cn("alarm")} onClick={handleAlarmClick} />
            <span className={cn("unreadCount")}>{totalUnreadCount && totalUnreadCount}</span>
            {isAlarmOpen && <AlarmDropDown sseNotifications={notifications as alarmType} />}
          </div>
        </div>
        <Chat width={30} height={30} onClick={handleChatClick} className={cn("chat")} />
      </div>
    </div>
  );
}

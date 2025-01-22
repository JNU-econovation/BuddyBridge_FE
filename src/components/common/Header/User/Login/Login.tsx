import { useEffect, useRef, useState } from "react";

import classNames from "classnames/bind";
import { EventSourcePolyfill } from "event-source-polyfill";

import { useRouter } from "next/router";

import { getNewAccessToken } from "@/apis/getNewAccessToken";
import useDetectClose from "@/components/common/DropDown/hooks/useDetectClose";
import styles from "@/components/common/Header/User/Login/Login.module.scss";
import openToast from "@/components/common/Toast/features/openToast";
import { ROUTE } from "@/constants/route";
import Alarm from "@/icons/alarm.svg";
import ArrowDown from "@/icons/arrow_down.svg";
import Chat from "@/icons/chattig.svg";

import AlarmDropDown from "./AlarmDropDown/AlarmDropDown";
import { useNotification } from "../../hooks/useNotification";
import DropDown from "../DropDown/DropDown";

const cn = classNames.bind(styles);

interface LoginProps {
  name: string;
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
      const token = localStorage.getItem("accessToken");

      eventSource = new EventSourcePolyfill(`${process.env.NEXT_PUBLIC_BASE_URL}api/sse/connect`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        heartbeatTimeout: 60 * 60 * 1000,
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

      eventSource.onerror = async (error) => {
        eventSource.close();

        if ((error as any).status === 401) {
          try {
            await getNewAccessToken();
            connectSSE();
          } catch (error) {
            openToast("error", "로그인 기간이 만료되었습니다. 다시 로그인해주세요.");
            router.push(ROUTE.LOGIN);
          }
        } else if ((error as any).status === 400 || (error as any).status === 404) {
          connectSSE();
        } else if ((error as any).error.message.includes("No activity")) {
          connectSSE();
        } else {
          openToast("error", "서버 점검중입니다.");
        }
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
            <Alarm width={25} height={25} className={cn("alarm")} onClick={handleAlarmClick} />
            <span className={cn("unreadCount")}>{totalUnreadCount && totalUnreadCount}</span>
            {isAlarmOpen && <AlarmDropDown sseNotifications={notifications as alarmType} setIsOpen={setIsAlarmOpen} />}
          </div>
        </div>
        <Chat width={25} height={25} onClick={handleChatClick} className={cn("chat")} />
      </div>
    </div>
  );
}

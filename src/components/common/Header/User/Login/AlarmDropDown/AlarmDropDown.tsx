import { useState } from "react";

import classNames from "classnames/bind";

import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/components/common/Header/User/Login/AlarmDropDown/AlarmDropDown.module.scss";
import AlarmFilter from "@/components/common/Header/User/Login/AlarmDropDown/AlarmFilter";
import Loader from "@/components/common/Loader/Loader";

import { useNotification } from "../../../hooks/useNotification";
import { useReadAllNotifications, useReadNotification } from "../../../hooks/useReadNotification";

const cn = classNames.bind(styles);

export interface AlarmDropDownProps {
  sseNotifications: {
    url: string;
    content: string;
    id: string;
    isRead: boolean;
    type: string;
  };
}

interface DropdownOption {
  label: string;
  value: string;
}

export default function AlarmDropDown({ sseNotifications }: AlarmDropDownProps) {
  const router = useRouter();
  const params = new URLSearchParams(router.query as any);

  const isRead = params.get("is-read") ?? "";
  const type = params.get("type") ?? "";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useNotification(sseNotifications, type, isRead);
  const { readNotification } = useReadNotification();
  const { readAllNotifications } = useReadAllNotifications();

  const updateQueryParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(router.query as any);
    if (value === "") {
      newParams.delete(key); 
    } else {
      newParams.set(key, value);
    }
    router.replace({ query: newParams.toString() }, undefined, { shallow: true });
  };

  const handleShowAll = () => {
    updateQueryParam("is-read", "");
  };

  const handleShowUnread = () => {
    updateQueryParam("is-read", "false");
  };

  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>({label: "전체", value: ""});

  const handleSelectOption = (option: DropdownOption) => {
    setSelectedOption(option);
    updateQueryParam("type", option.value);
  };

  return (
    <div className={cn("alarmContainer")}>
      <header className={cn("titleBox")}>
        <div className={cn("titleBoxRow")}>
          <div className={cn("title")}>알림</div>
          <AlarmFilter selectedOption={selectedOption} onSelectOption={handleSelectOption}/>
        </div>
        <div className={cn("titleBoxRow")}>
          <div className={cn("isReadedToggle")}>
            <button onClick={handleShowAll}>
              모든 알림
            </button>
            <button onClick={handleShowUnread}>
              안 읽은 알림 
              {data?.filter(
                (notification) => 
                  notification.isRead === false && 
                  (notification.type === selectedOption?.value || selectedOption?.value === "")
              ).length || 0}
            </button>
          </div>
          <button onClick={() => readAllNotifications()} className={cn("readAllBtn")}>
            전체 읽기
          </button>
        </div>
      </header>
      <div className={cn("alarmBox")}>
        {data?.map((notification, index) => (
          <Link
            href={notification?.url || ""}
            key={index}
            className={cn("alarm", { isRead: notification.isRead === true })}
            onClick={() => readNotification(notification.id)}
          >
            <div className={cn("alarmTag", {
              "comment": notification.type === "COMMENT", 
              "chat": notification.type !== "COMMENT"
            })}>
            {notification.type === "COMMENT" ? "댓글" : "채팅"}</div>
            {notification?.content}
          </Link>
        ))}
        {isFetchingNextPage ? (
          <Loader />
        ) : (
          hasNextPage && (
            <button onClick={() => fetchNextPage()} className={cn("fetchButton")}>
              더 불러오기
            </button>
          )
        )}
      </div>
    </div>
  );
}

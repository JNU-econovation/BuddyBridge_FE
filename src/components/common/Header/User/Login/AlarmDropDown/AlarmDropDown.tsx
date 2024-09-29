import classNames from "classnames/bind";

import Link from "next/link";

import styles from "@/components/common/Header/User/Login/AlarmDropDown/AlarmDropDown.module.scss";
import Loader from "@/components/common/Loader/Loader";

import getNotifications from "../../../apis/getNotifications";
import postReadAllNotification from "../../../apis/postReadAllNotification";
import postReadNotification from "../../../apis/postReadNotification";
import { useNotification } from "../../../hooks/useNotification";

const cn = classNames.bind(styles);

export interface AlarmDropDownProps {
  sseNotifications: {
    url: string;
    content: string;
    id: string;
  };
}

interface NotificationsResponse {
  content: AlarmDropDownProps["sseNotifications"][];
  cursor: number;
  nextPage: boolean;
}

export default function AlarmDropDown({ sseNotifications }: AlarmDropDownProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useNotification(sseNotifications);

  return (
    <div className={cn("alarmContainer")}>
      <header className={cn("titleBox")}>
        <div className={cn("title")}>알림</div>
      </header>
      <div className={cn("alarmBox")}>
        {data?.map((notification, index) => (
          <Link href={notification?.url || ""} key={index} className={cn("alarm")}>
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

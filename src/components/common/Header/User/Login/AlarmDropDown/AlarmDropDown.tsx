import classNames from "classnames/bind";

import Link from "next/link";

import styles from "@/components/common/Header/User/Login/AlarmDropDown/AlarmDropDown.module.scss";

const cn = classNames.bind(styles);

export interface AlarmDropDownProps {
  notifications: {
    url: string;
    content: string;
  }[];
}

export default function AlarmDropDown({ notifications }: AlarmDropDownProps) {
  return (
    <div className={cn("alarmContainer")}>
      <p className={cn("title")}>알림</p>
      <div className={cn("alarmBox")}>
        {notifications.map((notification, index) => (
          <Link href={notification.url} key={index} className={cn("alarm")}>
            {notification.content}
          </Link>
        ))}
      </div>
    </div>
  );
}

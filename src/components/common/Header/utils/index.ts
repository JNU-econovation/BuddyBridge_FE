import { AlarmDropDownProps } from "../User/Login/AlarmDropDown/AlarmDropDown";

interface MergeNotificationsParams {
  sseNotifications: AlarmDropDownProps["sseNotifications"];
  prevNotifications: {
    pages: {
      content: AlarmDropDownProps["sseNotifications"][];
      totalUnreadCount: number;
    }[];
  };
}

export const mergeNotifications = ({ sseNotifications, prevNotifications }: MergeNotificationsParams) => {
  if (!sseNotifications) {
    return {
      notifications: prevNotifications.pages.flatMap((page) => page.content.map((notification) => notification)),
      totalUnreadCount: prevNotifications.pages[0].totalUnreadCount,
    };
  } else {
    return {
      notifications: prevNotifications.pages.flatMap((page) => page.content.map((notification) => notification)),
      totalUnreadCount: prevNotifications.pages[0].totalUnreadCount,
    };
  }
};

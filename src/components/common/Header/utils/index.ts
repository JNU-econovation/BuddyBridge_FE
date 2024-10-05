import { AlarmDropDownProps } from "../User/Login/AlarmDropDown/AlarmDropDown";

interface MergeNotificationsParams {
  sseNotifications: AlarmDropDownProps["sseNotifications"];
  prevNotifications: {
    pages: {
      content: AlarmDropDownProps["sseNotifications"][];
    }[];
  };
}

export const mergeNotifications = ({ sseNotifications, prevNotifications }: MergeNotificationsParams) => {
  if (!sseNotifications) {
    return prevNotifications.pages.flatMap((page) => page.content.map((notification) => notification));
  }

  if (sseNotifications.id === prevNotifications.pages[0].content[0].id) {
    return prevNotifications.pages.flatMap((page) => page.content.map((notification) => notification));
  }

  return [
    sseNotifications,
    ...prevNotifications.pages.flatMap((page) => page.content.map((notification) => notification)),
  ];
};

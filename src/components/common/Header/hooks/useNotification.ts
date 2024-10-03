import { useInfiniteQuery } from "@tanstack/react-query";

import getNotifications from "../apis/getNotifications";
import { AlarmDropDownProps } from "../User/Login/AlarmDropDown/AlarmDropDown";
import { mergeNotifications } from "../utils";

interface NotificationsResponse {
  content: AlarmDropDownProps["sseNotifications"][];
  cursor: number;
  nextPage: boolean;
}

export const useNotification = (sseNotifications: AlarmDropDownProps["sseNotifications"]) => {
  const {
    data: prevNotifications,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery<NotificationsResponse>({
    queryKey: ["notifications"],
    queryFn: ({ pageParam }) => getNotifications(6, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      lastPage.nextPage ? lastPage.cursor : undefined,
  });

  if (status === "pending" || status === "error") return { data: null, fetchNextPage, hasNextPage, isFetchingNextPage };

  const notifications = mergeNotifications({ sseNotifications, prevNotifications });

  return { data: notifications, fetchNextPage, hasNextPage, isFetchingNextPage };
};

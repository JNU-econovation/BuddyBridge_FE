import { useMutation, useQueryClient } from "@tanstack/react-query";

import postReadAllNotification from "../apis/postReadAllNotification";
import postReadNotification from "../apis/postReadNotification";

export const useReadNotification = () => {
  const queryClient = useQueryClient();

  const { mutate: readNotification } = useMutation({
    mutationFn: (id: string) => postReadNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return { readNotification };
};

export const useReadAllNotifications = () => {
  const queryClient = useQueryClient();

  const { mutate: readAllNotifications } = useMutation({
    mutationFn: postReadAllNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return { readAllNotifications };
};

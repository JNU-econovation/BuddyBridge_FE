import { useMutation, useQueryClient } from "@tanstack/react-query";

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

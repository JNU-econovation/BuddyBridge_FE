import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import postLikes from "@/components/common/Post/apis/postLikes";
import openToast from "@/components/common/Toast/features/openToast";
import { ErrorResponse } from "@/types/error";
import { PostDetailType, PostType } from "@/types/post";

interface UseLikeMutationProps {
  id: number;
  queryKey: string[];
}

interface QueryData {
  content: PostType[];
}

export const useLikeMutation = ({ id, queryKey }: UseLikeMutationProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postLikes(id),
    onMutate: async () => {
      if (localStorage.getItem("accessToken")) {
        await queryClient.cancelQueries({ queryKey });

        const previousTodos = queryClient.getQueryData(queryKey);

        queryClient.setQueryData(queryKey, (response: QueryData) => ({
          ...response,
          content: response.content.map((item) => (item.id === id ? { ...item, isLiked: !item.isLiked } : item)),
        }));

        return { previousTodos };
      }
    },
    onError: (error: AxiosError<ErrorResponse>, newTodo, context) => {
      queryClient.setQueryData(queryKey, context?.previousTodos);
      error.response?.status === 401
        ? openToast("warn", "로그인이 필요한 서비스입니다.")
        : openToast("warn", "에러가 발생하였습니다.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const usePostDetailLikeMutation = ({ id, queryKey }: UseLikeMutationProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postLikes(id),
    onMutate: async () => {
      if (localStorage.getItem("accessToken")) {
        await queryClient.cancelQueries({ queryKey });

        const previousTodos = queryClient.getQueryData(queryKey);

        queryClient.setQueryData(queryKey, (response: PostDetailType) => ({
          ...response,
          post: { ...response.post, isLiked: !response.post.isLiked },
        }));

        return { previousTodos };
      }
    },
    onError: (error: AxiosError<ErrorResponse>, newTodo, context) => {
      queryClient.setQueryData(queryKey, context?.previousTodos);
      error.response?.status === 401
        ? openToast("warn", "로그인이 필요한 서비스입니다.")
        : openToast("warn", "에러가 발생하였습니다.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

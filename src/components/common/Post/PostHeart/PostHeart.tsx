import { MouseEvent } from "react";

import { useLikeMutation, usePostDetailLikeMutation } from "@/apis/post";
import Heart from "@/icons/heart.svg";
import PinkHeart from "@/icons/pink_heart.svg";

interface PostHeartProps {
  id: number;
  isLiked: boolean;
  queryKey: string[];
  style: string;
}

export function PostHeart({ id, isLiked, queryKey, style }: PostHeartProps) {
  const { mutate } = useLikeMutation({ id, queryKey });

  const handleHeartClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    mutate();
  };

  return (
    <button onClick={handleHeartClick}>
      {isLiked ? (
        <PinkHeart width={32} height={32} className={style} />
      ) : (
        <Heart width={32} height={32} className={style} />
      )}
    </button>
  );
}

export function PostDetailHeart({ id, isLiked, queryKey, style }: PostHeartProps) {
  const { mutate } = usePostDetailLikeMutation({ id, queryKey });

  const handleHeartClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    mutate();
  };

  return (
    <button onClick={handleHeartClick}>
      {isLiked ? (
        <PinkHeart width={32} height={32} className={style} />
      ) : (
        <Heart width={32} height={32} className={style} />
      )}
    </button>
  );
}

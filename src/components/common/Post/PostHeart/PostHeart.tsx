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

  const handleHeartClick = (event: MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    mutate();
  };

  return (
    <>
      {isLiked ? (
        <PinkHeart onClick={handleHeartClick} width={32} height={32} className={style} />
      ) : (
        <Heart onClick={handleHeartClick} width={32} height={32} className={style} />
      )}
    </>
  );
}

export function PostDetailHeart({ id, isLiked, queryKey, style }: PostHeartProps) {
  const { mutate } = usePostDetailLikeMutation({ id, queryKey });

  const handleHeartClick = (event: MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    mutate();
  };

  return (
    <>
      {isLiked ? (
        <PinkHeart onClick={handleHeartClick} width={32} height={32} className={style} />
      ) : (
        <Heart onClick={handleHeartClick} width={32} height={32} className={style} />
      )}
    </>
  );
}

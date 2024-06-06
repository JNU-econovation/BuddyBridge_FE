import { useState } from "react";

import classNames from "classnames/bind";

import styles from "@/components/common/Post/Post.module.scss";
import Heart from "@/icons/heart.svg";
import RedHeart from "@/icons/red_haert.svg";

const cn = classNames.bind(styles);

interface PostProps {
  data: {
    title: string;
    disability: string;
    help: string;
    place: string;
    startDate: string;
    endDate: string;
    period: string;
    order: number;
  };
}

export default function Post({ data }: PostProps) {
  const [isHeartClick, setIsHeartClick] = useState(false);
  const { title, disability, help, place, startDate, endDate, period, order } = data;

  const handleHeartClick = () => {
    setIsHeartClick((prev) => !prev);
  };

  return (
    <div className={cn("container")}>
      <p className={cn("order")}>{`#${order}`}</p>
      {isHeartClick ? (
        <RedHeart width={32} height={32} className={cn("heart")} onClick={handleHeartClick} />
      ) : (
        <Heart width={32} height={32} className={cn("heart")} onClick={handleHeartClick} />
      )}
      <div className={cn("contentBox")}>
        <div className={cn("badgeBox")}>
          <p>{help}</p>
          <p>{disability}</p>
        </div>
        <div className={cn("infoBox")}>
          <p className={cn("title")}>{title}</p>
          <div className={cn("detailInfoBox")}>
            <p>{`일시 | ${startDate} ~ ${endDate}`}</p>
            <p>{`활동 | ${period}`}</p>
            <p>{`일시 | ${place}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

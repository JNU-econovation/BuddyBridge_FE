import { useState } from "react";

import classNames from "classnames/bind";

import Link from "next/link";

import styles from "@/components/common/Post/Post.module.scss";
import { ROUTE } from "@/constants/route";
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
    type: string;
    id: number;
  };
}

export default function Post({ data }: PostProps) {
  const [isHeartClick, setIsHeartClick] = useState(false);
  const { type, title, disability, help, place, startDate, endDate, period, order, id } = data;

  const handleHeartClick = () => {
    setIsHeartClick((prev) => !prev);
  };

  return (
    <Link
      href={type === "taker" ? `${ROUTE.HELP_ME}/${id}` : `${ROUTE.GIVER}/${id}`}
      className={cn("cardContainer", {
        taker: type === "taker",
        giver: type === "giver",
      })}
    >
      <div className={cn("contentContainer")}>
        <p
          className={cn("progress", {
            taker: type === "taker",
            giver: type === "giver",
          })}
        >
          매칭중
        </p>
        <Heart width={32} height={32} className={cn("heart")} />
        <p className={cn("order")}>{order}</p>
        <div className={cn("contentBox")}>
          <div className={cn("Box")}>
            <p className={cn("title")}>{title}</p>
            <p className={cn("hr")} />
            <div className={cn("detailBox")}>
              <p>{`일시 | ${startDate} ~ ${endDate}`}</p>
              <p>{`활동 | ${period}`}</p>
              <p>{`장소 | ${place}`}</p>
            </div>
          </div>
          <div className={cn("hashtagBox")}>
            <p>{`# ${help}`}</p>
            <p>{`# ${disability}`}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

import { Dispatch, SetStateAction } from "react";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomHeader/ChatingRoomHeader.module.scss";
import Hamburger from "@/icons/hamburger.svg";

import getChatingRoom from "../../../apis/getChatingRoom";
import { useChatContext } from "../../chatLayout";

const cn = classNames.bind(styles);

interface ChatingRoomHeaderProps {
  setIsHamburgerClick: Dispatch<SetStateAction<boolean>>;
}

export default function ChatingRoomHeader({ setIsHamburgerClick }: ChatingRoomHeaderProps) {
  const { chatingRoomNumber } = useChatContext();

  const { data } = useQuery({
    queryKey: ["chatingRoom", chatingRoomNumber],
    queryFn: () => getChatingRoom(1, 0, chatingRoomNumber as number),
    enabled: !!chatingRoomNumber,
  });

  const handleHamburgerClick = () => {
    setIsHamburgerClick((prev) => !prev);
  };

  return (
    <header className={cn("container")}>
      <div className={cn("nameBox")}>
        <p className={cn("name")}>{data?.receiver.receiverName}</p>
        <p className={cn("dot")}>·</p>
        <p className={cn("type")}>
          {data?.postType === "TAKER" ? "도와줄래요? " : "도와줄게요! "}
          {data?.postId}번
        </p>
      </div>
      <Hamburger className={cn("hamburger")} onClick={handleHamburgerClick} />
    </header>
  );
}

import { Dispatch, SetStateAction } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
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

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["chatingRoom", chatingRoomNumber],
    queryFn: ({ pageParam }) => getChatingRoom(5, pageParam, chatingRoomNumber as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      lastPage.nextPage ? lastPage.cursor : undefined,
    enabled: !!chatingRoomNumber,
  });

  const handleHamburgerClick = () => {
    setIsHamburgerClick((prev) => !prev);
  };

  return (
    <header className={cn("container")}>
      <div className={cn("nameBox")}>
        <p>{data?.pages[0].receiver.receiverName}</p>
      </div>
      <Hamburger className={cn("hamburger")} onClick={setIsHamburgerClick} />
    </header>
  );
}

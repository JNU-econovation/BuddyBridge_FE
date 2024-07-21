import { useInfiniteQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomHeader/ChatingRoomHeader.module.scss";
import Hamburger from "@/icons/hamburger.svg";

import getChatingRoom from "../../../apis/getChatingRoom";
import { useAccodionContext } from "../../chatLayout";

const cn = classNames.bind(styles);

export default function ChatingRoomHeader() {
  const { chatingRoomNumber } = useAccodionContext();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["chatingRoom", chatingRoomNumber],
    queryFn: ({ pageParam }) => getChatingRoom(6, pageParam, chatingRoomNumber as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      lastPage.nextPage ? lastPage.cursor : undefined,
    enabled: !!chatingRoomNumber,
  });

  return (
    <header className={cn("container")}>
      <div className={cn("nameBox")}>
        <p>{data?.pages[0].receiver.receiverName}</p>
      </div>
      <Hamburger className={cn("hamburger")} />
    </header>
  );
}

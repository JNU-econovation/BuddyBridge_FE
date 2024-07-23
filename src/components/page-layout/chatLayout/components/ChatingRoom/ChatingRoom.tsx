import classNames from "classnames/bind";

import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoom.module.scss";

import ChatingRoomContent from "./ChatingRoomContent/ChatingRoomContent";
import ChatingRoomHeader from "./ChatingRoomHeader/ChatingRoomHeader";
import { useChatContext } from "../chatLayout";

const cn = classNames.bind(styles);

export default function ChatingRoom() {
  const { chatingRoomNumber } = useChatContext();

  return (
    <>
      {chatingRoomNumber ? (
        <div className={cn("container")}>
          <ChatingRoomHeader />
          <ChatingRoomContent />
        </div>
      ) : (
        <div className={cn("noChatingRoom")}>채팅방을 클릭해주세요.</div>
      )}
    </>
  );
}

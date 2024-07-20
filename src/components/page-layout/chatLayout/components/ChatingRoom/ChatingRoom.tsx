import { useContext } from "react";

import classNames from "classnames/bind";

import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoom.module.scss";

import ChatingRoomContent from "./ChatingRoomContent/ChatingRoomContent";
import ChatingRoomHeader from "./ChatingRoomHeader/ChatingRoomHeader";
import { useAccodionContext } from "../chatLayout";

const cn = classNames.bind(styles);

const mock = {
  name: "민보",
  type: "도와줄래요? 201",
};

export default function ChatingRoom() {
  const { chatingRoomNumber } = useAccodionContext();

  return (
    <>
      {chatingRoomNumber ? (
        <div className={cn("container")}>
          <ChatingRoomHeader name={mock.name} type={mock.type} />
          <ChatingRoomContent />
        </div>
      ) : (
        <div className={cn("noChatingRoom")}>채팅방을 클릭해주세요.</div>
      )}
    </>
  );
}

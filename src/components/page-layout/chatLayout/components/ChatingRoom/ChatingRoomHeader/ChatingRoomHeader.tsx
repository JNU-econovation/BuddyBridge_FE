import classNames from "classnames/bind";

import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomHeader/ChatingRoomHeader.module.scss";
import Hamburger from "@/icons/hamburger.svg";

const cn = classNames.bind(styles);

interface ChatingRoomHeaderProps {
  name: string;
  type: string;
}

export default function ChatingRoomHeader({ name, type }: ChatingRoomHeaderProps) {
  return (
    <header className={cn("container")}>
      <div className={cn("nameBox")}>
        <p>{name}</p>
        <p>{type}</p>
      </div>
      <Hamburger className={cn("hamburger")} />
    </header>
  );
}

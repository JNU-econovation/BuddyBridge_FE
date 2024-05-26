import styles from "@/components/common/Header/User/Login/Login.module.scss";
import classNames from "classnames/bind";

import Alarm from "@/icons/alarm.svg";
import Chat from "@/icons/chattig.svg";
import ArrowDown from "@/icons/arrow_down.svg";
import { useRef, useState } from "react";
import DropDown from "../DropDown/DropDown";
import useDetectClose from "@/components/common/DropDown/hooks/useDetectClose";

const cn = classNames.bind(styles);

interface LoginProps {
  name: string | undefined;
}

export default function Login({ name }: LoginProps) {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useDetectClose(dropdownRef, false);

  const handleNameClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={cn("container")}>
      <div ref={dropdownRef} className={cn("nameBox")} onClick={handleNameClick}>
        <p>{`${name}님`}</p>
        <ArrowDown width={13} height={13} />
        <DropDown isNameClick={isOpen} />
      </div>
      <div className={cn("iconBox")}>
        <Alarm width={30} height={30} />
        <Chat width={30} height={30} />
      </div>
    </div>
  );
}

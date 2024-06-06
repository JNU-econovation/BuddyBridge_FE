import { useRef, useState } from "react";

import classNames from "classnames/bind";

import useDetectClose from "@/components/common/DropDown/hooks/useDetectClose";
import styles from "@/components/common/Header/User/Login/Login.module.scss";
import Alarm from "@/icons/alarm.svg";
import ArrowDown from "@/icons/arrow_down.svg";
import Chat from "@/icons/chattig.svg";

import DropDown from "../DropDown/DropDown";

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

import { useState } from "react";

import classNames from "classnames/bind";

import styles from "./CompleteToggle.module.scss";

const cn = classNames.bind(styles);

interface CompleteToggleProps {
  isOn: boolean;
  toggleSwitch: () => void;
}

export default function CompleteToggle({ isOn, toggleSwitch }: CompleteToggleProps) {
  return (
    <div className={cn("toggleBox")}>
      <button onClick={toggleSwitch} className={cn("toggleBtn", { on: isOn, off: !isOn })}></button>
      <span className={cn("toggleLabel")}>도움 완료된 것만 보기</span>
    </div>
  );
}

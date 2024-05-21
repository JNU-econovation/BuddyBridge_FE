import { ComponentProps } from "react";

import styles from "@/components/common/RadioInput/RadioInput.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);
interface RadioInputProps extends ComponentProps<"input"> {
  firstValue: string;
  secondValue: string;
  firstLabel: string;
  secondLabel: string;
}

export default function RadioInput({ firstValue, secondValue, firstLabel, secondLabel, ...rest }: RadioInputProps) {
  return (
    <div className={cn("container")}>
      <div className={cn("leftInput")}>
        <input id={firstValue} type="radio" value={firstValue} {...rest} />
        <label htmlFor={firstValue}>{firstLabel}</label>
      </div>
      <div className={cn("rightInput")}>
        <input id={secondValue} type="radio" value={secondValue} {...rest} />
        <label htmlFor={secondValue}>{secondLabel}</label>
      </div>
    </div>
  );
}

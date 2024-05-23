import { ComponentProps, forwardRef } from "react";

import styles from "@/components/common/RadioInput/RadioInput.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);
interface RadioInputProps extends ComponentProps<"input"> {
  firstValue: string;
  secondValue: string;
}

export default forwardRef<HTMLInputElement, RadioInputProps>(function RadioInput(
  { firstValue, secondValue, ...rest },
  ref,
) {
  return (
    <div className={cn("container")}>
      <div className={cn("leftInput")}>
        <input id={firstValue} type="radio" ref={ref} {...rest} value={firstValue} />
        <label htmlFor={firstValue}>{firstValue}</label>
      </div>
      <div className={cn("rightInput")}>
        <input id={secondValue} type="radio" {...rest} ref={ref} value={secondValue} />
        <label htmlFor={secondValue}>{secondValue}</label>
      </div>
    </div>
  );
});

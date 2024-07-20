import { ComponentProps, forwardRef } from "react";

import classNames from "classnames/bind";

import styles from "@/components/common/RadioInput/RadioInput.module.scss";

const cn = classNames.bind(styles);
interface RadioInputProps extends ComponentProps<"input"> {
  firstValue: string;
  secondValue: string;
  postType: string;
}

export default forwardRef<HTMLInputElement, RadioInputProps>(function RadioInput(
  { firstValue, secondValue, postType, value, ...rest },
  ref,
) {
  return (
    <div className={cn("container")}>
      <div className={cn("leftInput")}>
        <input id={firstValue} type="radio" ref={ref} {...rest} value={firstValue} checked={value === firstValue} />
        <label className={cn(postType)} htmlFor={firstValue}>
          {firstValue}
        </label>
      </div>
      <div className={cn("rightInput", postType)}>
        <input id={secondValue} type="radio" {...rest} ref={ref} value={secondValue} checked={value === secondValue} />
        <label className={cn(postType)} htmlFor={secondValue}>
          {secondValue}
        </label>
      </div>
    </div>
  );
});

import { ComponentProps, Ref, forwardRef } from "react";

import classNames from "classnames/bind";
import { Locale } from "date-fns";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styles from "@/components/common/DatePicker/DatePicker.module.scss";

const cn = classNames.bind(styles);

interface CustomDatePickerProps {
  locale: Locale;
  selected: Date;
  onChange: (date: Date) => void;
  dateFormat: string;
  customInputRef?: Ref<HTMLButtonElement>;
}

interface CustomInputProps extends ComponentProps<"button"> {}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(function CustomInput(props, ref) {
  return (
    <button type="button" className={cn("button")} onClick={props.onClick} ref={ref}>
      {props.value}
    </button>
  );
});

export default forwardRef<HTMLButtonElement, CustomDatePickerProps>(function CustomDatePicker(
  { locale, selected, onChange, dateFormat, customInputRef },
  ref,
) {
  return (
    <DatePicker
      locale={locale}
      selected={selected}
      onChange={onChange}
      dateFormat={dateFormat}
      customInput={<CustomInput ref={customInputRef} />}
      showPopperArrow={false}
    />
  );
});

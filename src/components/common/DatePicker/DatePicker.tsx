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
  customInputRef?: Ref<HTMLInputElement>;
  classNames?: string;
  placeholder?: string;
}

interface CustomInputProps extends ComponentProps<"input"> {
  classNames?: string;
  placeholders?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(function CustomInput(props, ref) {
  return (
    <input
      className={cn(props.classNames, "input")}
      onClick={props.onClick}
      ref={ref}
      placeholder={props.placeholders}
      value={props.value}
      readOnly
    />
  );
});

export default forwardRef<HTMLInputElement, CustomDatePickerProps>(function CustomDatePicker(
  { locale, selected, onChange, dateFormat, customInputRef, classNames, placeholder },
  ref,
) {
  return (
    <DatePicker
      locale={locale}
      selected={selected}
      onChange={onChange}
      dateFormat={dateFormat}
      customInput={<CustomInput placeholders={placeholder} classNames={classNames} ref={customInputRef} />}
      showPopperArrow={false}
    />
  );
});

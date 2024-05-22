import { ComponentProps, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "@/components/common/DatePicker/DatePicker.module.scss";
import classNames from "classnames/bind";
import { Locale } from "date-fns";

const cn = classNames.bind(styles);

interface CustomDatePickerProps {
  locale: Locale;
  selected: Date;
  onChange: (date: Date) => void;
  dateFormat: string;
}

interface CustomInputProps extends ComponentProps<"button"> {}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(function CustomInput(props, ref) {
  return (
    <button type="button" className={cn("button")} onClick={props.onClick} ref={ref}>
      {props.value}
    </button>
  );
});

export default function CustomDatePicker({ locale, selected, onChange, dateFormat }: CustomDatePickerProps) {
  return (
    <DatePicker
      locale={locale}
      selected={selected}
      onChange={onChange}
      dateFormat={dateFormat}
      customInput={<CustomInput />}
      showPopperArrow={false}
    />
  );
}

import { ComponentProps, Ref, forwardRef } from "react";

import classNames from "classnames/bind";
import { getMonth, getYear, Locale } from "date-fns";
import DatePicker from "react-datepicker";

import styles from "@/components/common/DatePicker/DatePicker.module.scss";
import Arrow from "@/icons/arrow.svg";
import "react-datepicker/dist/react-datepicker.css";

const cn = classNames.bind(styles);

const MONTHS = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
const YEARS = Array.from({ length: getYear(new Date()) + 1 - 1900 }, (_, i) => getYear(new Date()) - i);

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
      renderCustomHeader={({ date, changeYear, decreaseMonth, increaseMonth }) => (
        <DatePickerHeader
          increaseMonth={increaseMonth}
          changeYear={changeYear}
          date={date}
          decreaseMonth={decreaseMonth}
        />
      )}
    />
  );
});

interface DatePickerHeaderProps {
  date: Date;
  changeYear: (year: number) => void;
  decreaseMonth: () => void;
  increaseMonth: () => void;
}

function DatePickerHeader({ date, changeYear, decreaseMonth, increaseMonth }: DatePickerHeaderProps) {
  return (
    <div className={cn("customHeaderContainer")}>
      <div className={cn("monthYearBox")}>
        <select value={getYear(date)} className={cn("year")} onChange={({ target: { value } }) => changeYear(+value)}>
          {YEARS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className={cn("month")}>{MONTHS[getMonth(date)]}</span>
      </div>
      <div className={cn("buttonBox")}>
        <button type="button" onClick={decreaseMonth} className={cn("prevMonthButton")}>
          <Arrow />
        </button>
        <button type="button" onClick={increaseMonth} className={cn("afterMonthButton")}>
          <Arrow />
        </button>
      </div>
    </div>
  );
}

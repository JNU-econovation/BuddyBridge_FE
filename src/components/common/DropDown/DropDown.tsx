import React, { ComponentProps, forwardRef, useEffect, useRef, useState } from "react";

import classNames from "classnames/bind";

import styles from "@/components/common/DropDown/DropDown.module.scss";
import useDetectClose from "@/components/common/DropDown/hooks/useDetectClose";
import DropDownImg from "@/icons/dropdown.svg";

import Input from "../Input/Input";

const cn = classNames.bind(styles);

interface DropdownProps extends ComponentProps<"input"> {
  options: string[];
  onSelection: (option: string) => void;
}

export default forwardRef<HTMLInputElement, DropdownProps>(function Dropdown({ options, onSelection, ...rest }, ref) {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useDetectClose(dropdownRef, false);

  const toggleDropdown = () => setIsOpen((prevState) => !prevState);

  const handleOptionSelect = (option: string) => {
    setIsOpen(false);
    onSelection(option);
  };

  return (
    <div ref={dropdownRef} className={cn("container")}>
      <Input onClick={toggleDropdown} className={cn("input")} readOnly {...rest} ref={ref} />
      <DropDownImg className={cn("img")} onClick={toggleDropdown} />
      {isOpen && (
        <div className={cn("dropDownContainer")}>
          {options?.map((option) => {
            return (
              <button className={cn("option")} key={option} onClick={() => handleOptionSelect(option)} type="button">
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

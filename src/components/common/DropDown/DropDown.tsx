import React, { useRef, useState } from "react";
import useDetectClose from "@/components/common/DropDown/hooks/useDetectClose";

import DropDownImg from "@/icons/dropdown.svg";

import styles from "@/components/common/DropDown/DropDown.module.scss";
import classNames from "classnames/bind";
import Input from "../Input/Input";

const cn = classNames.bind(styles);

interface DropdownProps {
  options: string[];
  id: string;
}

export default function Dropdown({ options }: DropdownProps) {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useDetectClose(dropdownRef, false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => setIsOpen((prevState) => !prevState);

  const handleOptionSelect = (option: string) => {
    setIsOpen(false);
    setSelectedOption(option);
  };

  return (
    <div ref={dropdownRef} className={cn("container")}>
      <Input onClick={toggleDropdown} className={cn("input")} readOnly value={selectedOption} />
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
}

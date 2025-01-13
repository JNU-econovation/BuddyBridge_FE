import { useState } from "react";

import classNames from "classnames/bind";

import { useRouter } from "next/router";

import DropDown from "@/icons/dropdown.svg";

import { Options } from "./constants";
import styles from "./MyWriteFilter.module.scss";

const cn = classNames.bind(styles);

interface FilterDropdownProps {
  selectedOption: string;
  onChangeOption: (filter: string) => void;
}

export default function MyWriteFilter({ selectedOption, onChangeOption }: FilterDropdownProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleFilter = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChangeOption = (e: { target: { value: string } }) => {
    console.log(e);
    const selectValue = e.target.value;
    onChangeOption(e.target.value);

    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        state: selectValue,
      },
    });
  };

  return (
    <div className={cn("filterBox")}>
      <button onClick={handleToggleFilter} className={cn("selectedOption")}>
        {Options.map((option) => (option.value === selectedOption ? option.label : ""))}
        <DropDown />
      </button>
      {isOpen && (
        <div className={cn("optionBox")}>
          {Options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setIsOpen(false);
                handleChangeOption({ target: { value: option.value } });
              }}
              className={cn("option")}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

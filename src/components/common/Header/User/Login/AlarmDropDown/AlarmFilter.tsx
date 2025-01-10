import { useState } from "react";

import classNames from "classnames/bind";

import styles from "@/components/common/Header/User/Login/AlarmDropDown/AlarmFilter.module.scss";

import { Categories } from "./constants";

const cn = classNames.bind(styles);

interface DropdownOption {
    label: string;
    value: string;
};

interface AlarmFilterProps {
    selectedOption: DropdownOption | null;
    onSelectOption: (option: DropdownOption) => void;
}

export default function AlarmFilter({ selectedOption, onSelectOption }: AlarmFilterProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };
    return (
        <div className={cn("filterBox")}>
            <button className={cn("openOptionBtn")} onClick={handleToggleDropdown}>
                {selectedOption ? selectedOption.label : "전체" } ▼
            </button>
            {isOpen && (
                <div className={cn("optionBox")}>
                    {Categories.map((option) => (
                        <button className={cn("option")} key={option.value} onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(false);
                            onSelectOption(option);
                        }} >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

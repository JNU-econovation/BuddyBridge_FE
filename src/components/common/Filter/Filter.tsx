import classNames from "classnames/bind";

import React, { useState } from 'react';
import { queryOptions, useQuery } from "@tanstack/react-query";
import filterGiverPost from './apis/filterGiverPost';
import filterTakerPost from './apis/filterTakerPost';
import styles from './Filter.module.scss';
import { useRef, useEffect } from "react";

const cn = classNames.bind(styles);

const categories = {
    disabilityType: ['시각장애', '청각장애', '지적장애', '지체장애', '자폐성장애', '뇌병변장애', '정신장애'],
    assistanceType: ['교육', '생활'],
};

interface FilterProps {
    postType: string;
    clicked: boolean;
    clickedChange(params:boolean): void;
}
  
const Filter: React.FC<FilterProps> = ({postType,clicked,clickedChange}) => {
    const [selectedOptions, setSelectedOptions] = useState<{ [category: string]: string }>({
    disabilityType: "",
    assistanceType: "",
    });
  
    const handleOptionChange = (category: string, optionId: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [category]: prev[category] === optionId ? "" : optionId, 
        }));
    };

    const handleClickDeleteBtn = (category: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [category]: ""
        }));
    };

    const [isVisible, setIsVisible] = useState<boolean>(clicked);
  
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            clickedChange(false);
            //setIsVisible(false);
        }
        console.log("바깥쪽 클릭", isVisible);
    };
    
    useEffect(() => {
        setIsVisible(clicked);
    }, [clicked]);
    
    useEffect(() => {
        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
            console.log(isVisible);
        } else {
            console.log(isVisible);
            document.removeEventListener("mousedown", handleClickOutside);
            console.log("리스너 삭제");
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            console.log(isVisible);
        };
    }, [isVisible]);

    const { data } = useQuery({
        queryKey:["filteredPosts", postType, selectedOptions],
        queryFn: () => postType === 'giver' 
            ? filterGiverPost({ disabilityType: selectedOptions.disabilityType, assistanceType: selectedOptions.assistanceType })
            : filterTakerPost({ disabilityType: selectedOptions.disabilityType, assistanceType: selectedOptions.assistanceType }),
        // queryOptions: {
        //      enabled: !!selectedOptions.disabilityType || !!selectedOptions.assistanceType, 
        //      keepPreviousData: true, 
        // }
    });
    
  
    return (
        <>
        {isVisible &&
            (
            <div className={cn("container")} ref={modalRef}>
                <div className={cn("tag-container")}>
                    {Object.entries(selectedOptions)
                    .filter(([, value]) => value)
                    .map(([category, optionName]) => (
                        <span className={cn("tag")} key={optionName} >
                            {categories[category as keyof typeof categories]?.find((option) => option === optionName)}
                            <button className={cn("deleteBtn")} onClick={()=>handleClickDeleteBtn(category)}>X</button>
                        </span>
                    ))}
                </div>
                <div className={cn("filter-container")}>
                {Object.entries(categories).map(([categoryName, categoryOptions]) => (
                    <div className={cn("filter-column")} key={categoryName}
                        style={categoryName === 'disabilityType' ? { borderRight: 'solid 1px lightgray' } : {}}
                    >
                        {categoryOptions.map((option) => (
                            <div className={cn("option-label")} key={option} >
                            <input
                                className={cn("checkbox")}
                                type="checkbox"
                                checked={selectedOptions[categoryName] === option}
                                onChange={() => handleOptionChange(categoryName, option)}
                            />
                            {option}
                            </div>
                        ))}
                    </div>
                ))}
                </div>
            </div>
            )}
            
         </>
    );
  };
  
export default Filter;
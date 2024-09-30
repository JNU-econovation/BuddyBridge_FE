import classNames from "classnames/bind";

import styles from './Filter.module.scss';
import { forwardRef } from "react";

import { Categories } from "./constants";

const cn = classNames.bind(styles);

interface FilterProps {
    searchParams: URLSearchParams;
    handleFilter: (category: string, optionId: string) => void;
}
  
export default forwardRef<HTMLDivElement, FilterProps>(
    function Filter(props: FilterProps, ref: React.Ref<HTMLDivElement>) {
        const {searchParams, handleFilter} = props;
    
        return (
            <div className={cn("container")} ref={ref}>
                {Object.entries(Categories).map(([categoryName, categoryOptions]) => (
                    <div className={cn("filterColumn", { "borderRight": categoryName === 'disabilityType'})} key={categoryName}>
                        {categoryOptions.map((option) => (
                            <div className={cn("optionLabel")} key={option} >
                                <input
                                    className={cn("checkbox")}
                                    type="checkbox"
                                    checked={searchParams.get(categoryName) === option}
                                    onChange={() => handleFilter(categoryName, option)}
                                />
                                {option}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
);

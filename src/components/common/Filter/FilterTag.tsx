import classNames from "classnames/bind";

import { forwardRef } from "react";
import styles from './Filter.module.scss';

const cn = classNames.bind(styles);

interface FilterTagProps {
    searchParams: URLSearchParams;
    handleFilter: (category: string, optionId: string) => void;
}

const Tag: React.FC<{ categoryName: string; option: string; handleFilter: (category: string, option: string) => void }> = ({ categoryName, option, handleFilter }) => {
    return (
        <span className={cn("tag")}>
            {option}
            <button className={cn("deleteBtn")} onClick={()=>handleFilter(categoryName, option)}>X</button>
        </span>
    );
};
  
function FilterTagging (props: FilterTagProps, ref: React.Ref<HTMLDivElement>) {
    const {searchParams, handleFilter} = props;
    const disabilityType = searchParams.get("disabilityType");
    const assistanceType = searchParams.get("assistanceType");

    return (
      <div className={cn("tagContainer")} ref={ref}>
        {disabilityType && <Tag categoryName="disabilityType" option={disabilityType} handleFilter={handleFilter}/>}
        {assistanceType && <Tag categoryName="assistanceType" option={assistanceType} handleFilter={handleFilter}/>}
      </div>
    );
};

const FilterTag = forwardRef<HTMLDivElement, FilterTagProps>(FilterTagging);

export default FilterTag;

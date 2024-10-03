import classNames from "classnames/bind";

import { forwardRef } from "react";
import styles from './Filter.module.scss';

const cn = classNames.bind(styles);

interface FilterTagProps {
    searchParams: URLSearchParams;
    handleFilter: (category: string, optionId: string) => void;
}

function Tag({ categoryName, option, handleFilter }: { categoryName: string; option: string; handleFilter: (category: string, option: string) => void }) {
    return (
        <span className={cn("tag")}>
            {option}
            <button className={cn("deleteBtn")} onClick={() => handleFilter(categoryName, option)}>X</button>
        </span>
    );
}
  
export default forwardRef<HTMLDivElement, FilterTagProps>(
    function FilterTag ({searchParams, handleFilter}:FilterTagProps, ref: React.Ref<HTMLDivElement>) {
        const disabilityType = searchParams.get("disabilityType");
        const assistanceType = searchParams.get("assistanceType");
        var disabilityOption:string[]=[];
        var assistanceOption:string[]=[];


        if(disabilityType){
            disabilityOption = disabilityType.split(',');
        }
        if(assistanceType){
            assistanceOption = assistanceType.split(',');
        }

        return (
            <div className={cn("tagContainer")} ref={ref}>
                { disabilityOption && disabilityOption.map((type)=>
                    <Tag categoryName="disabilityType" option={type} handleFilter={handleFilter}/>) 
                }
                { assistanceOption && assistanceOption.map((type)=>
                    <Tag categoryName="disabilityType" option={type} handleFilter={handleFilter}/>) 
                }
                {/* {disabilityType && <Tag categoryName="disabilityType" option={disabilityType} handleFilter={handleFilter}/>}
                {assistanceType && <Tag categoryName="assistanceType" option={assistanceType} handleFilter={handleFilter}/>} */}
            </div>
        );
    }
);

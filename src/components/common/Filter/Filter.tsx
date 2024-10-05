import classNames from "classnames/bind";

import styles from './Filter.module.scss';
import { forwardRef } from "react";

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Categories } from "./constants";

import Arrow from "@/../public/icons/arrow_down.svg";

const cn = classNames.bind(styles);

interface FilterProps {
    searchParams: URLSearchParams;
    handleFilter: (category: string, optionId: string) => void;
}
  

function Filtering(props: FilterProps, ref: React.Ref<HTMLDivElement>) {
    const {searchParams, handleFilter} = props;

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        //initialSlide: 0,
        //nextArrow: <NextArrow/>

    };
    
    return (
        <div className={cn("container")} ref={ref}>
            <Slider {...settings}>
                {Object.entries(Categories).flatMap(([categoryName, categoryOptions]) => (
                    categoryOptions.map((option) => {
                        const selectedOptions = searchParams.get(categoryName)?.split(",") || [];
                        const isSelected = selectedOptions.includes(option);

                        return (
                            <div>
                                <button
                                    key={option}
                                    className={cn("slideItem", {
                                        [`category-${categoryName}`]: true,
                                        selected: isSelected,
                                    })}
                                    onClick={() => handleFilter(categoryName, option)}
                                    >
                                    {option}
                                </button>
                            </div>
                        );
                  })
                ))}
              </Slider>
            </div>
          );
};

const Filter = forwardRef<HTMLDivElement, FilterProps>(Filtering);

export default Filter;
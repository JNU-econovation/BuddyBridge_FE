import { useRef, useCallback } from "react";

import classNames from "classnames/bind";
import Slider from "react-slick";

import Arrow from "@/../public/icons/arrow_down.svg";

import { Categories } from "./constants";
import styles from "./Filter.module.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cn = classNames.bind(styles);

interface FilterProps {
  searchParams: URLSearchParams;
  handleFilter: (category: string, optionId: string) => void;
}

export default function Filter({ searchParams, handleFilter }: FilterProps) {
  const slickRef = useRef<Slider | null>(null);

  const previous = useCallback(() => slickRef?.current?.slickPrev(), []);
  const next = useCallback(() => slickRef?.current?.slickNext(), []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    arrows: false,
  };

  return (
    <div className={cn("container")}>
      <div className={cn("prevArrow")} onClick={previous}>
        <Arrow width={23} height={23} />
      </div>
      <div className={cn("sliderContainer")}>
        <Slider {...settings} ref={slickRef}>
          {Object.entries(Categories).flatMap(([categoryName, categoryOptions]) =>
            categoryOptions.map((option) => {
              const selectedOptions = searchParams.get(categoryName)?.split(",") || [];
              const isSelected = selectedOptions.includes(option);
              const displayOption =
                categoryName === "postStatus"
                  ? option === "RECRUITING"
                    ? "모집중"
                    : option === "FINISHED"
                    ? "모집완료"
                    : option
                  : option;
              return (
                <div key={option}>
                  <button
                    key={option}
                    className={cn("slideItem", {
                      [`${categoryName}`]: true,
                      selected: isSelected,
                    })}
                    onClick={() => handleFilter(categoryName, option)}
                  >
                    {categoryName === "assistanceType" ? displayOption + "도움" : displayOption}
                  </button>
                </div>
              );
            }),
          )}
        </Slider>
      </div>
      <div className={cn("nextArrow")} onClick={next}>
        <Arrow width={23} height={23} />
      </div>
    </div>
  );
}

import classNames from "classnames/bind";

import styles from "@/components/common/Pagenation/Pagenation.module.scss";
import PaginationProps from "@/components/common/Pagenation/types/index";
import Arrow from "@/icons/arrow.svg";
import DoubleArrow from "@/icons/doubleArrow.svg";

const cn = classNames.bind(styles);

export default function Pagination({ currentPage, totalItems, itemsPerPage, setPage, type }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPagesToShow = 5;
  const currentGroup = Math.ceil(currentPage / maxPagesToShow);
  const startPage = (currentGroup - 1) * maxPagesToShow + 1;
  const endPage = Math.min(currentGroup * maxPagesToShow, totalPages);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const goToFirstPage = () => setPage(1);

  const goToPreviousGroup = () => {
    const previousGroupFirstPage = startPage - maxPagesToShow;
    if (previousGroupFirstPage >= 1) setPage(previousGroupFirstPage);
  };

  const goToNextGroup = () => {
    const nextGroupFirstPage = endPage + 1;
    if (nextGroupFirstPage <= totalPages) setPage(nextGroupFirstPage);
  };

  const goToLastPage = () => setPage(totalPages);

  return (
    <div className={cn("pagination")}>
      {totalPages > maxPagesToShow && (
        <>
          <button className={cn("arrow")} onClick={goToFirstPage} disabled={currentPage === 1}>
            <DoubleArrow className={cn("leftArrow")} />
          </button>
          <button className={cn("arrow")} onClick={goToPreviousGroup} disabled={currentPage <= maxPagesToShow}>
            <Arrow className={cn("leftArrow")} />
          </button>
        </>
      )}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setPage(page)}
          className={cn("button", type, { active: currentPage === page })}
        >
          {page}
        </button>
      ))}
      {totalPages > maxPagesToShow && (
        <>
          <button className={cn("arrow")} onClick={goToNextGroup} disabled={endPage >= totalPages}>
            <Arrow className={cn("rightArrow")} />
          </button>
          <button className={cn("arrow")} onClick={goToLastPage} disabled={endPage === totalPages}>
            <DoubleArrow className={cn("rightArrow")} />
          </button>
        </>
      )}
    </div>
  );
}

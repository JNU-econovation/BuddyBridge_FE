export default interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  setPage: (page: number) => void;
}

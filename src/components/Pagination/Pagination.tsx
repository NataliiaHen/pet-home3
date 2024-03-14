import './Pagination.scss';
import React, { memo } from 'react';
import ReactPaginate from 'react-paginate';

type Props = {
  pageCount: number,
  handlePageChange: (selected: number) => void,
};

export const Pagination: React.FC<Props> = memo(({
  pageCount, handlePageChange,
}) => {
  const handleClick = (selectedItem: {
    selected: number;
  }) => {
    handlePageChange(selectedItem.selected);
  };

  return (
    <ReactPaginate
      onPageChange={handleClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousLabel="<"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextLabel=">"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
    />
  );
});

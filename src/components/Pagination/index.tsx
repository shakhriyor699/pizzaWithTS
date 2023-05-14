import React, { FC } from 'react'
import ReactPaginate from 'react-paginate';
import cls from './Pagination.module.scss';

type PaginationPros = {
  value: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationPros> = ({ value, onPageChange }) => {
  return (
    <ReactPaginate
      className={cls.root}
      breakLabel="..."
      nextLabel=" >"
      onPageChange={e => onPageChange(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      previousLabel="< "
      renderOnZeroPageCount={null}
      forcePage={value - 1}
    />
  )
}

export default Pagination
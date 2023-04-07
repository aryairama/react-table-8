import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';
import usePagination from './usePagination';

const Index = ({ totalData, pageSize, currentPage, numberOfButtons, setPage, ...props }) => {
  const { pagination } = usePagination({ totalData, pageSize, currentPage, numberOfButtons });
  return (
    <ul className={style['pagination']}>
      <li
        className={`${(pagination[0] === currentPage || totalData === 0) && style['disabled']} ${style['next-prev']}`}
        onClick={() => setPage(currentPage - 2)}
      >
        Previous
      </li>
      {pagination.map((page, index) => (
        <li key={index} className={`${currentPage === page && style['active']}`} onClick={() => setPage(page - 1)}>
          {page}
        </li>
      ))}
      <li
        className={`${(pagination.reverse()[0] === currentPage || totalData === 0) && style['disabled']} ${
          style['next-prev']
        }`}
        onClick={() => setPage(currentPage)}
      >
        Next
      </li>
    </ul>
  );
};

Index.propTypes = {
  totalData: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  numberOfButtons: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Index;

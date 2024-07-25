import React from 'react'
import PropTypes from 'prop-types'
import { Pagination } from '@zendeskgarden/react-pagination'

const TablePagination = ({page, setPage, pageCount}) => {

  return (
    <Pagination
      totalPages={pageCount}
      pagePadding={3}
      currentPage={page}
      onChange={setPage}
    />
  )
}

export default TablePagination

TablePagination.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
  pageCount: PropTypes.number,
}
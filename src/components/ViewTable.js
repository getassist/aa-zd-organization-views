import React from 'react'
import { Body, Cell, Head, HeaderCell, HeaderRow, Row, Table } from '@zendeskgarden/react-tables'
import { Well } from '@zendeskgarden/react-notifications'
import PropTypes from 'prop-types'
import { createColumnHelper, useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table'

const ViewTable = ({columns, data}) => {
  const columnHelper = createColumnHelper()

  const renderCell = (cell, column) => {
    if (column.type === 'dropdown') {
      const value = cell.getValue()
      if (!value) return ''

      const option = column.custom_field_options.find((x) => x.value === value)
      if (option) return option.name
      return value
    }

    return cell.getValue()
  }

  const getColumns = () => {
    return columns.map((column) => {
      return columnHelper.accessor(column.key, {
        header: column.title,
        cell: ({cell}) => renderCell(cell, column)
      })
    })
  }

  const table = useReactTable({columns: getColumns(), data, getCoreRowModel: getCoreRowModel()})

  if (!data) return null

  return (
    <Well>
      <div style={{ overflowX: 'auto', border: 1 }}>
        <Table style={{ minWidth: 500 }}>
          <Head>
            {table.getHeaderGroups().map((headerGroup) => (
              <HeaderRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <HeaderCell key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </HeaderCell>
                ))}
              </HeaderRow>
            ))}
          </Head>
          <Body>
            {table.getRowModel().rows.map((row) =>(
              <Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Cell>
                ))}
              </Row>
            ))}
          </Body>
        </Table>
      </div>
    </Well>
  )
}

export default ViewTable

ViewTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
}
import React from 'react'
import PropTypes from 'prop-types'
import {
  Head,
  HeaderRow,
  Table,
  HeaderCell,
  Body,
  Row,
  Cell,
} from '@zendeskgarden/react-tables'
import {
  createColumnHelper,
  useReactTable,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table'
import { Checkbox, Field, Label } from '@zendeskgarden/react-forms'
import SkeletonTable from '../../../components/SkeletonTable'
import useDisplayView from '../hooks/useDisplayView'

const ViewsTable = ({ columns, data }) => {
  const {handleRowClick} = useDisplayView()
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

  const table = useReactTable({
    data,
    columns: getColumns(),
    getCoreRowModel: getCoreRowModel(),
  })

  if (!data || !data.length) return <SkeletonTable />

  return (
    <>
      <Table style={{ minWidth: 500 }}>
        <Head>
          {table.getHeaderGroups().map((headerGroup) => (
            <HeaderRow key={headerGroup.id}>
              <HeaderCell isMinimum>
                <Field>
                  <Checkbox disabled>
                    <Label hidden>Select all</Label>
                  </Checkbox>
                </Field>
              </HeaderCell>
              {headerGroup.headers.map((header) => (
                <HeaderCell key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </HeaderCell>
              ))}
            </HeaderRow>
          ))}
        </Head>
        <Body>
          {table.getRowModel().rows.map((row) => (
            <Row key={row.id} onClick={() => handleRowClick(row)} style={{cursor: 'pointer'}}>
              <Cell isMinimum>
                <Field>
                  <Checkbox disabled>
                    <Label hidden>Select</Label>
                  </Checkbox>
                </Field>
              </Cell>
              {row.getVisibleCells().map((cell) => (
                <Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Cell>
              ))}
            </Row>
          ))}
        </Body>
      </Table>
    </>
  )
}

export default ViewsTable

ViewsTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
}
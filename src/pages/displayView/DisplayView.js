import React from 'react'
import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { XXL, SM } from '@zendeskgarden/react-typography'
import { Item, Menu } from '@zendeskgarden/react-dropdowns.next'
import useDisplayView from './hooks/useDisplayView'
import ViewsTable from './components/ViewsTable'
import { shortenNumber } from '../../providers/Helpers'
import TablePagination from './components/TablePagination'
import { useParams } from 'react-router-dom'
import { Inline } from '@zendeskgarden/react-loaders'
import EmptyView from '../../components/EmptyView'
import { MenuActions } from '../../providers/Constants'
import ConfirmModal from '../../components/ConfirmModal'

const DisplayView = () => {
  const { id } = useParams()
  const {
    view,
    columns,
    data,
    count,
    page,
    pageCount,
    setPage,
    confirmModal,
    loadingExports,
    handleMenu,
  } = useDisplayView(id)

  if (!view) return <EmptyView />

  return (
    <Grid>
      <Row>
        <Col>
          <XXL>{view.title}</XXL>
        </Col>

        {loadingExports && (
          <Col size={2} textAlign='end' style={{ marginTop: 10 }}>
            <SM>
              {'Exporting '}
              <Inline />
            </SM>
          </Col>
        )}

        <Col size={2} textAlign='end'>
          <Menu onChange={handleMenu} button='Actions'>
            {MenuActions.map((action) => (
              <Item key={action.value} {...action} />
            ))}
          </Menu>
        </Col>
      </Row>

      <Row style={{ marginTop: 30 }}>
        <Col>
          <div>{`${shortenNumber(count)} organizations`}</div>
        </Col>
      </Row>

      <Row style={{ marginTop: 10 }}>
        <Col>
          <ViewsTable columns={columns} data={data} />
        </Col>
      </Row>

      <Row style={{ marginTop: 10 }}>
        <Col>
          <TablePagination pageCount={pageCount} page={page} setPage={setPage} />
        </Col>
      </Row>

      <ConfirmModal {...confirmModal} />
    </Grid>
  )
}

export default DisplayView
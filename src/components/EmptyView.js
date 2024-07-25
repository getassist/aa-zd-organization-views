import React from 'react'
import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { XL, XXL } from '@zendeskgarden/react-typography'
import ArrowLeftIcon from '@zendeskgarden/svg-icons/src/16/arrow-left-fill.svg'

const EmptyView = () => {
  return (
    <Grid>
      <Row>
        <Col size={12}>
          <XL>
            <ArrowLeftIcon style={{ marginRight: 30 }} />
            Click this button to create a view
          </XL>
        </Col>
      </Row>
      <Row style={{ marginTop: 60 }}>
        <Col>
          <XL>
            <ArrowLeftIcon style={{ marginRight: 30 }} />
            Select views here
          </XL>
        </Col>
      </Row>
    </Grid>
  )
}

export default EmptyView
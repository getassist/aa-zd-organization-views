import React from 'react'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Spinner } from '@zendeskgarden/react-loaders'

const Loading = () => {
  return (
    <Grid>
      <Row alignItems='stretch' style={{height: '60vh'}}>
        <Col alignSelf='center' size={12} textAlign='center'>
          <Spinner size='200' />
        </Col>
      </Row>
    </Grid>
  )
}

export default Loading
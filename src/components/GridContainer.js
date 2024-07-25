import React from 'react'
import PropTypes from 'prop-types'
import { Col, Grid, Row } from '@zendeskgarden/react-grid'

const GridContainer = ({ children }) => {
  return (
    <Grid>
      <Row>
        <Col lg={10}>
          <Grid gutters={false}>
            {children}
          </Grid>
        </Col>
      </Row>
    </Grid>
  )
}

export default GridContainer

GridContainer.propTypes = {
  children: PropTypes.any,
}
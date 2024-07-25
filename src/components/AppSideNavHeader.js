import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { Field, MediaInput } from '@zendeskgarden/react-forms'
import StartIcon from '@zendeskgarden/svg-icons/src/16/search-stroke.svg'
import PlusIcon from '@zendeskgarden/svg-icons/src/16/plus-stroke.svg'
import { IconButton } from '@zendeskgarden/react-buttons'
import { useNavigate } from 'react-router-dom'
import useInput from '../hooks/useInput'

const AppSideNavHeader = ({handleSearch}) => {
  const navigate = useNavigate()
  const [value, handleChange] = useInput('', 500)

  useEffect(() => {
    handleSearch(value)
  }, [value])
  
  return (
    <Grid style={{ paddingTop: 20, paddingBottom: 10 }}>
      <Row justifyContent='between'>
        <Col size={10}>
          <Field>
            <MediaInput isCompact start={<StartIcon />} onChange={handleChange} />
          </Field>
        </Col>
        <Col size={2}>
          <IconButton size='small' isPill={false} isPrimary onClick={() => navigate('/create')}>
            <PlusIcon />
          </IconButton>
        </Col>
      </Row>
    </Grid>
  )
}

export default AppSideNavHeader

AppSideNavHeader.propTypes = {
  handleSearch: PropTypes.func,
}

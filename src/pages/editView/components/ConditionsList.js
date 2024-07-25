import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { LG } from '@zendeskgarden/react-typography'
import { Button } from '@zendeskgarden/react-buttons'
import ConditionsItem from './ConditionsItem'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import useConditionsList from '../hooks/useConditionsList'
import { IConditionsList } from '../../../providers/Interfaces'
import { Field, Message } from '@zendeskgarden/react-forms'


const ConditionsList = ({ value, handleChange, validation }) => {
  const { conditions, handleAdd, handleUpdate, handleRemove } = useConditionsList(value, handleChange)

  return (
    <Grid gutters={false}>
      <Row>
        <Col>
          <LG>Conditions</LG>
        </Col>
      </Row>

      {validation && (typeof validation === 'string') && (
        <Row>
          <Col>
            <Field style={{ marginTop: 20 }}>
              <Message validation='error' validationLabel='validation'>
                {validation}
              </Message>
            </Field>
          </Col>
        </Row>
      )}

      {conditions && conditions.map((condition) => (
        <Row key={condition.id}>
          <Col>
            <ConditionsItem
              value={condition}
              handleRemove={() => handleRemove(condition)}
              handleUpdate={handleUpdate}
              validation={validation ? validation[condition.id] : ''}
            />
          </Col>
        </Row>
      ))}

      <Row>
        <Col>
          <Button style={{ marginTop: 20 }} onClick={handleAdd}>
            Add Condition
          </Button>
        </Col>
      </Row>

    </Grid>
  )
}

export default ConditionsList

ConditionsList.propTypes = IConditionsList
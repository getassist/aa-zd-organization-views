import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Field } from '@zendeskgarden/react-dropdowns.next'
import { Input } from '@zendeskgarden/react-forms'
import { Datepicker } from '@zendeskgarden/react-datepickers'
import { Col, Row } from '@zendeskgarden/react-grid'
import Select from '../../../components/Select'
import useDatePicker from '../../../hooks/useDatePicker'
import { CheckboxValues } from '../../../providers/Constants'
import { DisabledSelect } from '../../../components/DisabledSelect'

const ConditionsItemInput = ({ field, value, operator, handleInput }) => {
  const {
    date,
    dateStart,
    dateEnd,
    setDate,
    setDateStart,
    setDateEnd,
  } = useDatePicker(handleInput)

  const handleChange = (e) => {
    handleInput(e.target.value)
  }

  if (!field) return null

  if (!field.type) return 'no type'

  if (field.type === 'text' || field.type === 'textarea') {
    return (
      <div>
        <Field>
          <Input onChange={handleChange} defaultValue={value} />
        </Field>
      </div>
    )
  }
  
  if (field.type === 'dropdown') {
   return (
    <Select options={field.custom_field_options} value={value} handleChange={handleInput} /> 
   )
  }

  if (field.type === 'checkbox') {
    return (
     <Select options={CheckboxValues} value={value} handleChange={handleInput} /> 
    )
   }

  if (field.type === 'date' && operator && operator.value === '><') {
    return (
      <div>
        <Row>
          <Col>
            <Field>
              <Datepicker onChange={setDateStart} value={dateStart}>
                <Input placeholder='Start Date' />
              </Datepicker>
            </Field>
          </Col>
          <Col>
            <Field>
              <Datepicker onChange={setDateEnd} value={dateEnd} minValue={dateStart}>
                <Input placeholder='End Date' />
              </Datepicker>
            </Field>
          </Col>
        </Row>
      </div>
    )
  }

  if (field.type === 'date') {
    return (
      <div>
        <Field>
          <Datepicker onChange={setDate} value={date}>
            <Input />
          </Datepicker>
        </Field>
      </div>
    )
  }

  if (field.type === 'lookup') {
    return (
      <DisabledSelect message='Lookup not yet supported' />
    )
  }

  if (field.type === 'decimal') {
    return (
      <div>
        <Field onChange={handleChange} defaultValue={value}>
          <Input type='number' />
        </Field>
      </div>
    )
  }

  return null
}

export default ConditionsItemInput


ConditionsItemInput.propTypes = {
  field: PropTypes.object,
  value: PropTypes.any,
  operator: PropTypes.object,
  handleInput: PropTypes.func,
}
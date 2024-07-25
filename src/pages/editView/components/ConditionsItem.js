import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { IconButton } from '@zendeskgarden/react-buttons'
import XIcon from '@zendeskgarden/svg-icons/src/16/x-stroke.svg'
import { Message } from '@zendeskgarden/react-forms'
import useConditionsItem from '../hooks/useConditionsItem'
import Select from '../../../components/Select'
import ConditionsItemInput from './ConditionsItemInput'

const CustomCol = ({ children }) => {
  return <Col style={{ marginRight: 15 }} size={3}>{children}</Col>
}

const ConditionsItem = ({value, handleRemove, handleUpdate, validation}) => {
  const {
    condition,
    fieldOptions,
    selectedField,
    selectedOperator,
    operatorOptions,
    selectedValue,
    handleSelectField,
    handleSelectOperator,
    handleInputValue,
  } = useConditionsItem(value)

  useEffect(() => {
    if (condition && condition.id) handleUpdate(condition)  
  }, [condition])

  if (!condition) return null

  return (
    <Grid gutters={false} style={{ marginTop: 15 }}>
      <Row justifyContent='between'>

        <CustomCol>
          <Select options={fieldOptions} value={selectedField} handleChange={handleSelectField} />
        </CustomCol>

        {selectedField && (
          <CustomCol>
            <Select options={operatorOptions} value={selectedOperator} handleChange={handleSelectOperator} />
          </CustomCol>
        )}

        {selectedField && (
          <CustomCol>
            <ConditionsItemInput field={selectedField} operator={selectedOperator} value={selectedValue} handleInput={handleInputValue} />
          </CustomCol>
        )}

        <Col size={1}>
          <IconButton isPill={false} onClick={handleRemove}>
            <XIcon />
          </IconButton>
        </Col>
      </Row>

      {validation && (
        <Row style={{marginTop: 5}}>
          <Col>
            <Message validation='error' validationLabel='validation'>{validation}</Message>
          </Col>
        </Row>
      )}
      
    </Grid>
  )
}

export default ConditionsItem


CustomCol.propTypes = {
  children: PropTypes.any,
}

ConditionsItem.propTypes = {
  handleRemove: PropTypes.func,
  value: PropTypes.object,
  handleUpdate: PropTypes.func,
  validation: PropTypes.string,
}
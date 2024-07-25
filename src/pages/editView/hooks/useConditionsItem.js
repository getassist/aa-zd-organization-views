import { useState, useEffect } from 'react'
import { FieldTypes } from '../../../providers/Constants'
import useOrganizationFields from '../../../hooks/useOrganizationFields'

const useConditionsItem = (initialValue) => {
  const organizationFields = useOrganizationFields()
  const [condition, setCondition] = useState()
  const [fieldOptions, setFieldOptions] = useState([])
  const [selectedField, setSelectedField] = useState(null)
  const [operatorOptions, setOperatorOptions] = useState([])
  const [selectedOperator, setSelectedOperator] = useState(null)
  const [selectedValue, setSelectedValue] = useState(null)

  const handleSelectField = (field) => {
    if (!field) return null
    setSelectedField(field)

    // set operators and value field
    const fieldType = FieldTypes.find((x) => x.type === field.type)
    setOperatorOptions(fieldType.operators)
  }

  const handleSelectOperator = (value) => {
    setSelectedOperator(value)
  }

  const handleInputValue = (value) => {
    setSelectedValue(value)
  }

  useEffect(() => {
    if (initialValue) setCondition(initialValue)
    if (initialValue.field) setSelectedField(initialValue.field)
    if (initialValue.operator) setSelectedOperator(initialValue.operator)
    if (initialValue.value) setSelectedValue(initialValue.value)
  }, [initialValue])

  useEffect(() => {
    setFieldOptions(organizationFields)
  }, [organizationFields])

  useEffect(() => {
    if (condition && condition.id) {
      const newCondition = {
        ...condition,
        field: selectedField,
        value: selectedValue,
        operator: selectedOperator,
      }

      setCondition(newCondition)
    }

  }, [selectedOperator, selectedValue, selectedField])

  return {
    condition,
    fieldOptions,
    selectedField,
    selectedOperator,
    operatorOptions,
    selectedValue,
    handleSelectField,
    handleSelectOperator,
    handleInputValue,
  }
}

export default useConditionsItem

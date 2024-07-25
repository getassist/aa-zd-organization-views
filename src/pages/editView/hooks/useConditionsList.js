import { useEffect, useState } from 'react'
import { uuid } from '../../../providers/Helpers'

const useConditionsList = (initialValue, handleChange) => {
  const [conditions, setConditions] = useState(initialValue)

  const handleAdd = () => {
    const id = uuid(8)
    const newCondition = { id, field: null, operator: null, value: null }
    setConditions([...conditions, newCondition])
  }

  const handleRemove = (condition) => {
    const newConditions = conditions.filter((x) => x.id !== condition.id)
    setConditions(newConditions)
  }

  const handleUpdate = (condition) => {
    const newConditions = conditions
    const index = newConditions.findIndex((x) => x.id === condition.id)
    newConditions[index] = condition
    setConditions(newConditions)
  }

  useEffect(() => {
    handleChange('conditions', conditions)
  }, [conditions])

  useEffect(() => {
    setConditions(initialValue)
  }, [initialValue])

  return {
    conditions,
    handleAdd,
    handleUpdate,
    handleRemove,
  }

}

export default useConditionsList

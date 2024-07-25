import { isEmptyObject } from './Helpers'

export const titleValidator = (title) => {
  if (!title) return 'Title is required.'
  if (title.length < 3) return 'Please enter at least 3 characters.'
  return null
}

export const typeValidator = (type) => {
  if (!type) return 'Please select a type.'
  return null
}

export const columnsValidator = (columns) => {
  if (!columns || !columns.length) return 'Please select a column.'
  return null
}

export const conditionValidator = (condition) => {
  if (!condition.field) return 'Missing field.'
  if (!condition.operator) return 'Missing operator.'
  if (!condition.value) return 'Missing value.'
  return null
}

export const conditionsValidator = (conditions) => {
  if (!conditions || !conditions.length) return 'Please select a condition.'

  const errors = {}
  conditions.forEach((condition) => {
    const error = conditionValidator(condition)
    if (error) errors[condition.id] = error
  })

  if (isEmptyObject(errors)) return null

  return errors
}

export const viewValidator = (view) => {  
    const errors = {
      title: titleValidator(view.title),
      type: typeValidator(view.type),
      conditions: conditionsValidator(view.conditions),
      columns: columnsValidator(view.columns)
    }

    // if no errors return true
    if (isEmptyObject(errors)) return true

    // if errors return false
    return errors
}
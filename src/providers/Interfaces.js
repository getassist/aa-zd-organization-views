import { oneOfType, string, object, func, array, any } from 'prop-types'

export const IContext = {
  children: object,
}

export const IColumnsList = {
  value: array,
  handleChange: func,
  validation: string,
}

export const ISelect = {
  value: any,
  options: array,
  label: string,
  handleChange: func,
}

export const ITitleInput = {
  value: string,
  validation: string,
  handleChange: func,
}

export const IConditionsList = {
  value: array,
  handleChange: func,
  validation: oneOfType([object, string])
}

export const IPreviewTable = {
  view: object,
  handleValidate: func,
}

export const IConfirmModal = {
  message: string,
  onCancel: func,
  onConfirm: func,
}
import React from 'react'
import { Field, Select } from '@zendeskgarden/react-forms'
import { oneOfType, string, object, func, array, any } from 'prop-types'



export const DisabledSelect = ({message}) => {
  return (
    <Field>
      <Select disabled>
          <option>{message}</option>
      </Select>
    </Field>
  )
}

DisabledSelect.propTypes = {
  message: string,
}
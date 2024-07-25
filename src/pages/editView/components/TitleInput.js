import React, { useEffect } from 'react'
import { Field, Input, Message } from '@zendeskgarden/react-forms'
import useInput from '../../../hooks/useInput'
import { ITitleInput } from '../../../providers/Interfaces'

const TitleInput = ({value, handleChange, validation}) => {
  const [input, handleInput] = useInput(value, 500)

  useEffect(() => {
    handleChange('title', input)
  }, [input])

  return (
    <Field>
      <Input placeholder='Name' onChange={handleInput} defaultValue={value} validation={validation ? 'error' : null} />
      {validation && (<Message validation='error' validationLabel='validation'>{validation}</Message>)}
    </Field>
  )
}

export default TitleInput

TitleInput.propTypes = ITitleInput
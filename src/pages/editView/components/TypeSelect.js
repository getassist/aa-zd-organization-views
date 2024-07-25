import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Select from '../../../components/Select'
import { ViewTypes } from '../../../providers/Constants'

const TypeSelect = ({options, value, handleChange}) => {
  const [selected, setSelected] = useState(value)

  useEffect(() => {
    handleChange('type', selected)
  }, [selected])

  useEffect(() => {
    setSelected(value)
  }, [value])

  return (
    <Select options={ViewTypes} value={selected} handleChange={setSelected} label='Type' />
  )
}

export default TypeSelect

TypeSelect.propTypes = {
  value: PropTypes.object,
  options: PropTypes.array,
  label: PropTypes.string,
  handleChange: PropTypes.func,
}
import React, { useEffect, useState } from 'react'
import {Combobox, Field, Option, Label} from '@zendeskgarden/react-dropdowns.next'
import { ISelect } from '../providers/Interfaces'

const Select = ({options, value, handleChange, label, defaultExpanded }) => {
  const [selected, setSelected] = useState(value)
  
  const handleSelect = (e) => {
    if (e.type !== 'option:click') return
    setSelected(e.selectionValue)
  }

  const renderValue = () => {
    if (selected) return selected.label || selected.title || selected.name || selected
  }

  useEffect(() => {
    if (selected) handleChange(selected)
  }, [selected])

  if (!options || !options.length) return null

  return (
    <Field>
      {label && <Label>{label}</Label>}
      <Combobox onChange={handleSelect} isEditable={false} renderValue={renderValue} defaultExpanded={defaultExpanded || false}>
        {options && options.map((option) => (
          <Option key={option.key || option.id || option.value} value={option} label={option.title || option.label || option.name} />
        ))}
      </Combobox>
    </Field>
  )
}

export default Select

Select.propTypes = ISelect
import { useState, useEffect } from 'react'
import { DefaultOrganizationFields } from '../providers/Constants'
import { getAll } from '../providers/Api'

const useOrganizationFields = () => {  
  const [fields, setFields] = useState([])

  const getOrganizationFields = async () => {
    const customFields = await getAll('organization_fields')

    const activeFields = customFields.filter((x) => x.active).map((x) => {
      const field = {
        key: `${x.key}`,
        title: x.title,
        type: x.type,
      }
      if (x.custom_field_options) field.custom_field_options = x.custom_field_options
      return field
    })

    setFields([...DefaultOrganizationFields, ...activeFields])
  }

  useEffect(()=> {
    getOrganizationFields()
  }, [])

  return fields
}

export default useOrganizationFields
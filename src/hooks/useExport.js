import { useState } from 'react'
import { getAllSearchResults } from '../providers/Api'
import useSearch from './useSearch'
import { downloadCsv } from '../providers/Helpers'

const useExport = () => {
  const {buildQueryString} = useSearch()
  const [loading, setLoading] = useState(false)

  const mapFields = (data, columns) => {
    const customFields = Object.keys(data[0].organization_fields)

    const mappedData = data.map((org) => {
      customFields.forEach((field) => {
        org[field] = org.organization_fields[field]
      })
      return org
    })

    return mappedData.map((org) => {
      const newOrg = {}
      columns.forEach((column) => {
        newOrg[column] = org[column]
      })
      return newOrg
    })
  }

  const exportView = async (view) => {
    setLoading(true)

    const query = buildQueryString(view.conditions)

    // extract all data
    const data = await getAllSearchResults(query)

    const columns = view.columns.map((col) => col.key)
    const mappedData = mapFields(data, columns)

    // map data
    const fileName = `${view.title}-${new Date().toISOString()}.csv`
    // download csv
    downloadCsv(mappedData, fileName)
    setLoading(false)
  }


  return {
    loadingExports: loading,
    exportView,
  }
}

export default useExport
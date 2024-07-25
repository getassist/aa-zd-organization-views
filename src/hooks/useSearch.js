import { useState, useEffect } from 'react'
import { getSearchResults } from '../providers/Api'
import { formatDate } from '../providers/Helpers'
import { PageSize } from '../providers/Constants'
import useNotifications from './useNotifications'

const useSearch = () => {
  const { alert } = useNotifications()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [resultsCount, setResultsCount] = useState(0)
  const [pageSize, setPageSize] = useState(PageSize)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  const mapCustomFields = (data) => {
    const customFields = Object.keys(data[0].organization_fields)

    return data.map((org) => {
      customFields.forEach((field) => {
        org[field] = org.organization_fields[field]
      })
      return org
    })
  }

  const buildConditionString = (condition) => {
    if (condition.field.type === 'dropdown') {
      return `${condition.field.key}${condition.operator.value}${condition.value.value}`
    }

    if (condition.field.type === 'date' && condition.operator.value === '><') {
      return `${condition.field.key}>=${formatDate(condition.value[0])} ${condition.field.key}<=${formatDate(condition.value[1])}`
    }

    if (condition.field.type === 'date') {
      return `${condition.field.key}${condition.operator.value}${formatDate(condition.value)}`
    }

    if (condition.field.type === 'checkbox') {
      return `${condition.field.key}${condition.operator.value}${condition.value.value}`
    }

    return `${condition.field.key}${condition.operator.value}${condition.value}`
  }

  const buildQuery = (conditions) => {
    let queryString = ''

    conditions.forEach((condition) => {
      const newQueryString = buildConditionString(condition)
      queryString = `${queryString} ${newQueryString}`
    })

    return `type:organization ${queryString}`
  }

  const buildQueryString = (conditions) => {
    let queryString = ''

    conditions.forEach((condition) => {
      const newQueryString = buildConditionString(condition)
      queryString = `${queryString} ${newQueryString}`
    })

    return queryString
  }

  const countTotalPages = (totalResults) => {
    return Math.ceil(totalResults / pageSize)
  }

  const handleNoResponse = () => {
    setResults([])
    setResultsCount(0)
    setPageCount(0)
  }

  const handleResponse = (response) => {
    setResults(mapCustomFields(response.results))
    setResultsCount(response.count)
    setPageCount(countTotalPages(response.count))
  }

  const handleError = (error) => {
    if (error.status === 422) {
      setResults([])
      setPage(1)
      alert('You are accessing beyond the search results limit.  Try exporting view instead.', 'error', 'Search Response Limit Reached')
    }
  }

  useEffect(() => {
    const handleSearch = async () => {
      const response = await getSearchResults(query, page, pageSize)

      if (response && response.results) return handleResponse(response)

      if (response.statusText === 'error') handleError(response)
    }

    // run search
    if (query) handleSearch()
  }, [query, page, pageSize])

  return {
    query,
    page,
    pageSize,
    results,
    resultsCount,
    pageCount,
    setQuery,
    setPage,
    setPageSize,
    buildQuery,
    buildQueryString,
    mapCustomFields,
  }
}

export default useSearch
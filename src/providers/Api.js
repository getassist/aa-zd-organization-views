import Client from './Client'

const urls = {
  export: '/api/v2/search/export?',
  search: '/api/v2/search?',
  count: '/api/v2/search/count?'
}

const getBackoffTime = (attempt) => {
  const baseDelay = 1000
  const maxDelay = 5 * 60 * 1000
  const factor = 2

  // Calculate the delay using exponential backoff
  const delay = Math.min(baseDelay * Math.pow(factor, attempt), maxDelay)
  return delay
}

const requestWithRetry = async (url, maxAttempts = 5) => {
  let attempt = 0

  while (attempt < maxAttempts) {
    try {
      const options = {
        url,
        type: 'GET',
        autoRetry: false,
        httpCompleteResponse: true,
      }
      const response = await Client.request(options)

      // handle no response
      if (!response) {
        throw new Error(`Request failed at ${url}`)
      }

      // handle success
      if (response.status === 200) {
        return response.responseJSON || response.responseText
      }

      // hendle rate-limit hit
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After')
        const delay = retryAfter ? parseInt(retryAfter, 10) * 1000 : getBackoffTime(attempt)

        // backoff
        await new Promise(resolve => setTimeout(resolve, delay))
        attempt++
      }

      // handle other response status
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    catch (error) {
      attempt++

      // backoff
      const delay = getBackoffTime(attempt)
      await new Promise(resolve => setTimeout(resolve, delay))
      
      return error
    }
  }
}

export const getAll = async (object) => {
  const apiUrl = `/api/v2/${object}`

  try {
    const data = []

    const fetchData = async (url) => {
      const response = await requestWithRetry(url)
      if (!response) throw new Error('No response received.')

      data.push(...response[object])
      if (response.next_page) await fetchData(response.next_page)
    }

    await fetchData(apiUrl)
    return data
  }
  catch (error) {
    return error
  }
}

export const getSearchCount = async (query) => {
  const url = `${urls.count}query=${query}`

  try {
    const response = await Client.request(url)
    if (response) return response.count
    return null
  }
  catch (error) {
    return error
  }
}

export const getSearchResults = async (query, page, size) => {
  const params = encodeURI(`per_page=${size}&page=${page}`)
  const url = `${urls.search}${params}&query=${query}`

  return requestWithRetry(url, 1)
}

export const getAllSearchResults = async (query) => {
  const params = encodeURI('filter[type]=organization&page[size]=1000')
  const apiUrl = `${urls.export}${params}&query=${query}` 

  try {
    const data = []

    const fetchData = async (url) => {

      const response = await requestWithRetry(url)
      if (!response) throw new Error('No response received.')

      data.push(...response.results)
      if (response.meta.has_more) await fetchData(response.links.next)
    }

    await fetchData(apiUrl)
    return data
  }
  catch (error) {
    return error
  }

}
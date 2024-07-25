import Papa from 'papaparse'

export const downloadCsv = (data, filename = 'data.csv') => {
  const csv = Papa.unparse(data)
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  
  document.body.appendChild(a)
  a.click()
  
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export const uuid = (length = 20) => {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let autoId = ''

  for (let i = 0; i < length; i += 1) {
      autoId += CHARS.charAt(
          Math.floor(Math.random() * CHARS.length),
      )
  }
  return autoId
}

export function isEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export const isEmptyObject = (object) => {
  let isEmpty = Object.values(object).every((x) => x === null)
  return isEmpty
}

export const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const shortenNumber = (number) => {
  let shortNumber = parseFloat(number)

  if (number < 1000) return number

  let magnitude = 0
  while (Math.abs(shortNumber) >= 1000) {
      magnitude++
      shortNumber /= 1000.0
  }

  let suffix = ''
  if (magnitude === 1) {
      suffix = 'K'
  } else if (magnitude === 2) {
      suffix = 'M'
  } else if (magnitude === 3) {
      suffix = 'B'
  } else if (magnitude === 4) {
      suffix = 'T'
  }

  return shortNumber.toFixed(1) + suffix
}

export const isFirstInArray = (array, item, field) => {
  const index = array.findIndex((x) => x[field] === item[field])
  return index === 0
}

export const sortArray = (array, field) => {
  const sorted = [...array].sort((a, b) => {
    const fieldA = a[field].toLowerCase()
    const fieldB = b[field].toLowerCase()
    if (fieldA < fieldB) return -1
    if (fieldA > fieldB) return 1
    return 0
  })
  return sorted
}

export const filterArray = (array, field, filter) => {
  const fieldType = typeof (array[0][field])

  return array.filter((item) => {
    
    // handle strings
    if (fieldType === 'string') {
      const fitlerValue = item[field].toLowerCase()
      if (fitlerValue.includes(filter.toLowerCase())) return item
    }

  })
}

export const filterArrayFromArray = (array1, array2, field) => {
  return array1.filter((x) => !array2.some((y) => y[field] === x[field]))
}
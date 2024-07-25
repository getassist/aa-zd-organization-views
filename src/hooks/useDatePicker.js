import { useEffect, useState } from 'react'

const useDatePicker = (handleInput) => {
  const [date, setDate] = useState(null)
  const [dateStart, setDateStart] = useState(null)
  const [dateEnd, setDateEnd] = useState(null)

  useEffect(() => {
    if (date) handleInput(date)
    if (dateStart && dateEnd) handleInput([dateStart, dateEnd])
  }, [date, dateStart, dateEnd])

  return {
    date,
    dateStart,
    dateEnd,
    setDate,
    setDateStart,
    setDateEnd,
  }
}

export default useDatePicker
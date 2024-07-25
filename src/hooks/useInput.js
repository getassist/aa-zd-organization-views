import { useState, useEffect, useMemo } from 'react'

const useInput = (initialValue, delay = 1000) => {
  const [input, setInput] = useState(initialValue)
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(input)
    }, delay)

    return () => clearTimeout(timeout)
  }, [input, delay])

  const handleChange = useMemo(() => {
    return (event) => {
      setInput(event.target.value)
    }
  }, [])

  return [value, handleChange]
}

export default useInput
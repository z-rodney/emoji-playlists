import { useState } from 'react'

export const useInput = function (initialState) {
  const [value, setValue] = useState(initialState)

  const handleChange = function (event) {
    setValue(event.target.value)
  }

  return [value, handleChange]
}

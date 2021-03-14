import React, { useState } from 'react'

export const useDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = React.useCallback(() => {
    setShowDropdown(!showDropdown)
  }, [showDropdown])

  return {
    showDropdown,
    toggleDropdown,
  }
}

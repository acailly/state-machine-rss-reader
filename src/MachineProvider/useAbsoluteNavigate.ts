// trick from https://github.com/remix-run/react-router/issues/7634#issuecomment-1094099414

import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// it creates an "absolute navigate", ie. avoid doing .back() with it, that doesn't change at every location change
const useAbsoluteNavigate = () => {
  const navigate = useNavigate()
  const navigateRef = useRef({ navigate })
  useEffect(() => {
    navigateRef.current.navigate = navigate
  }, [navigate])
  return useCallback((location: string) => {
    navigateRef.current.navigate(location)
  }, [])
}

export default useAbsoluteNavigate

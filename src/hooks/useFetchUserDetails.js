import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchUserDetails = (userId) => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
        )
        setUser(response.data)
        setLoading(false)
      } catch (e) {
        setError(e)
        setLoading(false)
      }
    }

    if (userId) {
      fetchUserDetails()
    }
  }, [userId])

  return { user, loading, error }
}

export default useFetchUserDetails

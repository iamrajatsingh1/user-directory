import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users',
        )
        setUsers(response.data)
        setLoading(false)
      } catch (e) {
        setError(e)
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return { users, loading, error }
}

export default useFetchUsers

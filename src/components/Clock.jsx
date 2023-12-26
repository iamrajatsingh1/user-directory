import React, { useState, useEffect, useRef } from 'react'
import '../styles/Clock.css'
import axios from 'axios'

const Clock = () => {
  const [time, setTime] = useState(new Date())
  const [isPaused, setIsPaused] = useState(false)
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('Asia/Kolkata')

  const intervalRef = useRef(null)
  const pausedTime = useRef(null)

  // Fetch the list of countries on Component Mount
  useEffect(() => {
    axios
      .get('http://worldtimeapi.org/api/timezone')
      .then((response) => {
        setCountries(response.data)
      })
      .catch((error) => {
        console.error('Error fetching countries:', error)
      })
  }, [])

  useEffect(() => {
    const tick = () => {
      if (!isPaused) {
        const now = new Date(time.getTime() + 1000)
        setTime(now)
      }
    }

    intervalRef.current = setInterval(tick, 1000)

    return () => clearInterval(intervalRef.current)
  }, [time, isPaused])

  const handlePauseResume = () => {
    if (isPaused) {
      // Resume
      setIsPaused(false)
      const newTime = pausedTime.current
      setTime(new Date(newTime))
    } else {
      // Pause
      pausedTime.current = time
      setIsPaused(true)
    }
  }

  const handleCountryChange = async (event) => {
    try {
      const selectedCountry = event.target.value
      const response = await axios.get(
        `http://worldtimeapi.org/api/timezone/${selectedCountry}`,
      )
      const tz = response.data.timezone

      setSelectedCountry(selectedCountry)

      // Set the time using the timezone
      const currentTime = new Date().toLocaleString('en-US', {
        timeZone: tz,
      })

      setTime(new Date(currentTime))
    } catch (error) {
      console.error('Error fetching timezone data:', error)
    }
  }

  return (
    <div className="clock-container">
      <div>
        <label htmlFor="countrySelect">Select Country:</label>
        <select
          id="countrySelect"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="" disabled>
            ----Select----
          </option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <h1 className="clock-display">
        {time.toLocaleTimeString('en-US', {
          hour12: false,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        })}
      </h1>
      <button onClick={handlePauseResume}>
        {isPaused ? 'Resume' : 'Pause'}
      </button>
    </div>
  )
}

export default Clock

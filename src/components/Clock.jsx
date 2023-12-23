import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

/**
 * Clock component which shows current time of the selected timzone 
 * and by default it is current time of the client's timezone.
 * 
 * Note: 
 * selectedCountry is being set as "Asia/Kolkata" 
 * because "Intl.DateTimeFormat().resolvedOptions().timeZone" gives Asia/Calcutta
 * and Asia/Calcutta is not present in the dropdown api
 * @returns JSX
 * 
 */
const Clock = () => {
  // const [countries, setCountries] = useState([]);
  // const [selectedCountry, setSelectedCountry] = useState("Asia/Kolkata");
  const [clockPaused, setClockPaused] = useState(false);
  const [displayTime, setDisplayTime] = useState(new Date());
  // const [offSetInMinutes, setOffSetInMinutes] = useState((new Date()).getTimezoneOffset());
  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [timeElapsed, setTimeElapsed] = useState(null);

  // // Fetch the list of countries on Component Mount
  // useEffect(() => {
  //   axios.get('http://worldtimeapi.org/api/timezone')
  //     .then(response => {
  //       setCountries(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching countries:', error);
  //     });

  // }, []);

  // fix this effect to take time stored in tempTime 
  const intervalRef = useRef(null); // Using useRef to store the interval
  useEffect(() => {
    if (!clockPaused) {
      intervalRef.current = setInterval(() => {
        const now = new Date();
        const newDisplayTime = timeElapsed ?  new Date(new Date().getTime() - timeElapsed.getTime()) : new Date();
        console.log("running", newDisplayTime);
        setDisplayTime(newDisplayTime);
      }, 1000);
    } else {
      console.log("pausing");
      // Store timeElapsed
      setTimeElapsed(new Date());
      setDisplayTime(new Date());
      clearInterval(intervalRef.current);
    }
  
    return () => clearInterval(intervalRef.current);
  }, [clockPaused]);

// Additional useEffect to handle offset changes
// useEffect(() => {
//   if (timeElapsed) {
//     // Update displayTime using timeElapsed
//     const now = new Date();
//     const newDisplayTime = new Date(now.getTime() - timeElapsed.getTime() + offSetInMinutes * 60000);
//     setDisplayTime(new Date());
//   }
// }, [timeElapsed, offSetInMinutes]);




  // const handleCountryChange = async (event) => {
  //   const selectedCountry = event.target.value;
  //   setSelectedCountry(selectedCountry);
  //   try {
  //     // Fetch the current time for the selected country
  //     const response = await axios.get(`http://worldtimeapi.org/api/timezone/${selectedCountry}`);
  //     const utcOffset = response.data.utc_offset;
  //     setTimeZone(response.data.timezone)

  //     // Set the startTime with the current time adjusted by the UTC offset
  //     const currentTime = new Date();
  //     const offsetInMinutes = parseInt(utcOffset.split(':')[0]) * 60 + parseInt(utcOffset.split(':')[1]);
  //     // setOffSetInMinutes(offsetInMinutes);
  //     setDisplayTime(new Date(currentTime.getTime() + offsetInMinutes * 60000));
  //   } catch (error) {
  //     console.error('Error fetching current time:', error);
  //   }
  // }

  const toggleClock = () => {
    setClockPaused(clockPaused => !clockPaused);
  };

  return (
    <div className='clock-container'>
      {/* <div>
        <label htmlFor="countrySelect">Select Country:</label>
        <select id="countrySelect" value={selectedCountry} onChange={handleCountryChange}>
          <option value="" disabled>----Select----</option>
          {countries.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div> */}
      <div className='clock-display'>
        <p>Current Time:</p>
        <div>{displayTime.toLocaleTimeString('en-US', { timeZone: timeZone, hour12: false })}</div>
        {/* <div>{new Date().toLocaleString('en-US', { timeZone: timeZone, hour12: false })}</div> */}
      </div>
      <div>
        <button onClick={toggleClock}>{clockPaused ? 'Resume Clock' : 'Pause Clock'}</button>
      </div>
    </div>
  );
};

export default Clock;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clock = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [clockPaused, setClockPaused] = useState(false);

    useEffect(() => {
        // Fetch the list of countries
        axios.get('http://worldtimeapi.org/api/timezone')
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });

        // Set the default start time to the current time of the browser
        setStartTime(new Date());
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!clockPaused) {
                const now = new Date();
                setStartTime(now);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [clockPaused]);

    const handleCountryChange = async (event) => {
        const selectedCountry = event.target.value;
        setSelectedCountry(selectedCountry);

        try {
            // Fetch the current time for the selected country
            const response = await axios.get(`http://worldtimeapi.org/api/timezone/${selectedCountry}`);
            const utcOffset = response.data.utc_offset;
            console.log(response.data.utc_datetime);
            // Set the startTime with the current time adjusted by the UTC offset
            const currentTime = new Date();
            const offsetInMinutes = parseInt(utcOffset.split(':')[0]) * 60 + parseInt(utcOffset.split(':')[1]);
            setStartTime(new Date(currentTime.getTime() + offsetInMinutes * 60000));
        } catch (error) {
            console.error('Error fetching current time:', error);
        }
    };

    const toggleClock = () => {
        setClockPaused(prevClockPaused => {
            if (prevClockPaused) {
                // If the clock is currently paused, store the paused time
                setStoredTime(new Date());
            } else {
                // If the clock is currently running, set the start time to the stored time
                setStartTime(prevStoredTime => prevStoredTime || new Date());
            }
            return !prevClockPaused;
        });
    };


    return (
        <div className='clock-container'>
            <div>
                <label htmlFor="countrySelect">Select Country:</label>
                <select id="countrySelect" value={selectedCountry} onChange={handleCountryChange}>
                    <option value="" disabled>----Select----</option>
                    {countries.map(country => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>
            <div className='clock-display'>
                <p>Current Time:</p>
                <div>{startTime.toLocaleTimeString()}</div>
            </div>
            <div>
                <button onClick={toggleClock}>{clockPaused ? 'Resume Clock' : 'Pause Clock'}</button>
            </div>
        </div>
    );
};

export default Clock;

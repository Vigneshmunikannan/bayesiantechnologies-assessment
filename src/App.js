import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import CustomDropdown from './CustomDropdown';
import logo from "./logo.jpg"
const App = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [cabin, setCabin] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const originOptions = ['JFK', 'DEL', 'SYD', 'BOM', 'BNE', 'BLR'];
  const destinationOptions = ['JFK', 'DEL', 'SYD', 'LHR', 'CDG', 'DOH', 'SIN'];
  const cabinOptions = ['Economy', 'Business', 'First'];

  const json_data = {
    origin,
    destination,
    partnerPrograms: [
      'Air Canada',
      'United Airlines',
      'KLM',
      'Qantas',
      'American Airlines',
      'Etihad Airways',
      'Alaska Airlines',
      'Qatar Airways',
      'LifeMiles',
    ],
    stops: 2,
    departureTimeFrom: '2024-07-09T00:00:00Z',
    departureTimeTo: '2024-10-07T00:00:00Z',
    isOldData: false,
    limit: 302,
    offset: 0,
    cabinSelection: [cabin],
    date: new Date().toISOString(),
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post('https://cardgpt.in/apitest', json_data);
      if (response.data.data.length === 0) {
        setError('No data found.');
      } else {
        setResults(response.data.data);
        setError('');
      }
    } catch (error) {
      setError('Try another search route.');
      setResults([]);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="flight-search">
      <div>
        <h1>Choose Origin and Destination</h1>
        <div className="form">
          <div className="label-wrapper">
            <CustomDropdown options={originOptions} value={origin} onChange={setOrigin} placeholder="Origin" />
          </div>
          <div className="label-wrapper">
            <CustomDropdown
              options={destinationOptions}
              value={destination}
              onChange={setDestination}
              placeholder="Destination"
            />
          </div>
          <div className="label-wrapper">
            <CustomDropdown options={cabinOptions} value={cabin} onChange={setCabin} placeholder="Cabin Selection" />
          </div>

          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="results">
          {error ? (
            <p>{error}</p>
          ) : results.length > 0 ? (
            results.map((result, index) => (
              <div key={index} className="result-box">
                <img src={logo} alt="Logo" className="logo" />
                <h2 style={{textAlign:"center"}}>{result.partner_program}</h2>
                <h3 style={{textAlign:"center"}}>{origin}->{destination}</h3>
                <h5 style={{textAlign:"center"}}>{formatDate(json_data.departureTimeFrom)} - {formatDate(json_data.departureTimeTo)}</h5>

                <h1 style={{textAlign:"center"}}>{result.min_business_miles || "N/A"} <span style={{fontSize:"20px"}}>
                {result.min_business_tax ? `+ $${result.min_business_tax}`: ""}</span></h1>
                <p style={{textAlign:"center",marginTop:"-25px"}}>Min Business Miles</p>

                <h1 style={{textAlign:"center"}}>{result.min_economy_miles || "N/A"} <span style={{fontSize:"20px"}}>
                {result.min_economy_tax ? `+ $${result.min_economy_tax}`: ""}</span></h1>
                <p style={{textAlign:"center",marginTop:"-25px"}}>Min Economy Miles</p>


                <h1 style={{textAlign:"center"}}>{result.min_first_miles || "N/A"} <span style={{fontSize:"20px"}}>
                {result.min_first_tax ? `+ $${result.min_first_tax}`: ""}</span></h1>
                <p style={{textAlign:"center",marginTop:"-25px"}}>Min Economy Miles</p>
              </div>
            ))
          ) : (
            <p>No results found. Try another search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

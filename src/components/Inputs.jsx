import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { toast } from "react-toastify";
import axios from "axios";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  console.log(latitude, longitude)
  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleWeatherRequest = () => {
    if (latitude, longitude !== "") setQuery({ lat: latitude, lon: longitude });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((position) => {

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <><div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search for city...."
          className="text-l font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase" />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick} />
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick} />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
    <form>
        <label htmlFor="latitude" className="text-white">Latitude:</label>
        <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input onChange={(e) => setLatitude(e.currentTarget.value)} type="text" id="latitude" value={latitude} 
        placeholder="Search for Latitude...."
        className="text-l font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase" />
        </div>
        <label htmlFor="longitude" className="text-white">Longitude:</label>
        <div className="flex flex-row w-5/6 items-center justify-center space-x-4">
        <input onChange={(e) => setLongitude(e.currentTarget.value)} type="text" id="longitude" value={longitude} 
        placeholder="Search for Longitude...."
        className="text-l font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"/>
        <UilSearch
          size={25}
          className="text-white cursor-pointer hover:scale-125"
          onClick={handleWeatherRequest} /></div>
    </form></>
  );
}

export default Inputs;

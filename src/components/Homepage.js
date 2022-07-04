import "./homepage.css";
import { useQuery } from "react-query";
import React, { useState } from "react";

const apiKey = `4df426ce1423e6a019e20c71208dd422ffd9d376`;
const fetchHolidays = async (countryCode) => {
  const response = await fetch(
    `https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=${countryCode}&year=2020`
  );
  return response.json();
};

export default function Gettinginfo() {
  const [inputValue, setInputValue] = useState(null);
  const [countryCode, setCountryCode] = useState("US");

  const { status, data, error, isLoading } = useQuery(
    ["holidays", countryCode],
    () => fetchHolidays(countryCode),
    {
      staleTime: Infinity,
    }
  );

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleFindClick() {
    setCountryCode(inputValue);
  }

  const holidays = data && data.response && data.response.holidays;

  return (
    <>
      <div>
        {countryCode && <h1>{countryCode}</h1>}

        <input
          className="homePageinput-field"
          type="text"
          onChange={handleInputChange}
        ></input>
        <button onClick={handleFindClick}>Find holidays</button>
      </div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          holidays?.map((holiday, i) => <div key={i}>{holiday.name}</div>)
        )}
      </div>
    </>
  );
}

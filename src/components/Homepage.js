import "./homepage.css";
import { useQuery } from "react-query";
import React, { useState } from "react";

export default function Gettinginfo() {
  const [country, getCountry] = useState(null);
  const [search, setSearch] = useState(false);
  const apiKey = `4df426ce1423e6a019e20c71208dd422ffd9d376`;

  function getData(event) {
    getCountry(event.target.value);
    setSearch(false);
    console.log(event.target.value);
  }

  const fetchHolidays = async () => {
    const response = await fetch(
      `https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=US&year=2020`
    );
    return response.json();
  };

  const { status, data, error } = useQuery("holidays", fetchHolidays, {
    staleTime: Infinity,
  });
  const holidays = data && data.response && data.response.holidays;
  // console.log(data.response.holidays);

  return (
    <>
      <div>
        {search ? <h1>{country}</h1> : null}

        <input
          className="homePageinput-field"
          type="text"
          onChange={getData}
        ></input>
        <button onClick={() => setSearch(true)}>Find holidays</button>
      </div>
      <div>
        {holidays?.map((holiday, i) => (
          <div key={i}>{holiday.name}</div>
        ))}
      </div>
    </>
  );
}

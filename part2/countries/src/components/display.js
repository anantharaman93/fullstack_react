import React, { useState } from "react";

const Languages = ({ languages }) => {
  return languages.map((l) => <li key={l.name}>{l.name}</li>);
};

const CountryDetail = ({ country }) => {
  return (
    <>
      <b>{country.name}</b>
      <br />
      <b>Capital </b> {country.capital}
      <br />
      <b>Population </b> {country.population}
      <br />
      <b>Languages</b>
      <ul>
        <Languages languages={country.languages} />
      </ul>
      <img src={country.flag} height={100} width={100} />
    </>
  );
};

const ShowButton = ({ country }) => {
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <div>
        <CountryDetail country={country} />
      </div>
    );
  } else {
    return (
      <>
        <button onClick={() => setShow(true)}>show</button>
      </>
    );
  }
};

const Display = ({ count, countries, countryName }) => {
  if (countryName === "") {
    return <></>;
  }

  const countriesToDisplay = countries.filter((c) =>
    c.name.toLowerCase().startsWith(countryName.toLowerCase())
  );

  if (countriesToDisplay.length > count) {
    return <div>Too many countries to show</div>;
  }
  if (countriesToDisplay.length === 1) {
    return (
      <>
        <CountryDetail country={countriesToDisplay[0]} />
      </>
    );
  } else {
    return countriesToDisplay.map((c) => (
      <div key={c.name}>
        {c.name} <ShowButton text="show" country={c} />
      </div>
    ));
  }
};

export default Display;

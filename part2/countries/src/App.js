import React, { useEffect, useState } from "react";
import axios from "axios";

import Filter from "./components/filter";
import Display from "./components/display";

const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  const [countryName, setCountryName] = useState("");

  return (
    <div>
      <Filter
        countryName={countryName}
        onChange={(e) => setCountryName(e.target.value)}
      />

      <Display count={10} countries={countries} countryName={countryName} />
    </div>
  );
};

export default App;

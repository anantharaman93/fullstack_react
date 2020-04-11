import React from "react";

const Filter = ({ countryName, onChange }) => (
  <div>
    Find countries : <input input={countryName} onChange={onChange} />
  </div>
);

export default Filter;

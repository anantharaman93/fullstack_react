import React from "react";

const Filter = ({ filterText, doFilter }) => {
  return (
    <div>
      filter : <input value={filterText} onChange={doFilter} />
    </div>
  );
};

export default Filter;

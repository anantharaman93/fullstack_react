import React from "react";

const Persons = ({ persons }) => {
  return persons.map((p) => (
    <p key={p.name}>
      {p.name} {p.number}
    </p>
  ));
};

export default Persons;

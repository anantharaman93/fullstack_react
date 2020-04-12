import React from "react";

import personService from "../services/person";

const Persons = ({
  persons,
  setPersons,
  successNotification,
  failureNotification,
}) => {
  const handlePersonDelete = (personToDelete) => {
    const { id, name } = personToDelete;
    const answer = window.confirm(`Delete ${name}?`);
    if (answer) {
      personService
        .deletePerson(id)
        .then((data) => {
          successNotification(`Successfully deleted person ${name}`);
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((err) => {
          failureNotification(`Failed when deleting ${name}`);
        });
    }
  };

  return (
    <>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => handlePersonDelete(person)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default Persons;

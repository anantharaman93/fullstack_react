import React, { useState, useEffect } from "react";

import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

import personService from "./services/person";

const App = () => {
  const [filterText, setFilterText] = useState("");
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [notification, setNotification] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const duplicatePersons = persons.filter((p) => p.name === newName);

    if (duplicatePersons.length > 0) {
      const personToUpdate = duplicatePersons[0];
      if (
        window.confirm(
          `${newName} is already added to phonebook, need to update ?`
        )
      ) {
        const newPerson = { ...personToUpdate, number: newNumber };
        personService.update(newPerson).then((createdPerson) => {
          const personsToSet = persons.map((person) =>
            person.id === createdPerson.id ? createdPerson : person
          );
          setPersons(personsToSet);
          setNotification(
            `Person update ${newName} updated with number ${newNumber}`
          ).catch((err) => {
            setErrorMessage(`Error while updating ${newName}`);
          });
        });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      personService
        .create(newPerson)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          setNotification(
            `Person ${newName} added with phone number ${newNumber}`
          );
        })
        .catch((err) => {
          setErrorMessage(`Error while creating person ${newName}`);
        });
    }

    setNewName("");
    setNewNumber("");
  };

  const doFilter = (event) => {
    setFilterText(event.target.value);
  };

  const personsToShow = persons.filter((p) =>
    p.name.toLowerCase().startsWith(filterText.toLowerCase())
  );

  return (
    <div>
      {errorMessage ? (
        <Notification message={errorMessage} isError={true} />
      ) : null}
      {notification ? <Notification message={notification} /> : null}

      <h2>Filter</h2>
      <Filter filterText={filterText} doFilter={doFilter} />

      <h2>Phonebook</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        setPersons={setPersons}
        successNotification={(msg) => setNotification(msg)}
        failureNotification={(msg) => setNotification(msg)}
      />
    </div>
  );
};

export default App;

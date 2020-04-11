import React, { useState, useEffect } from "react";
import axios from "axios";

import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const check = persons.filter((p) => p.name === newName).length > 0;

    if (check) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = persons.concat({ name: newName, number: newNumber });
      setPersons(newPerson);
    }
    setNewName("");
    setNewNumber("");
  };

  const doFilter = (event) => {
    setFilterText(event.target.value);
  };

  const personsToShow = persons.filter((p) => p.name.startsWith(filterText));

  return (
    <div>
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
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;

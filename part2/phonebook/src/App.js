import React, { useState } from "react";

import Persons from "./component/persons";
import PersonForm from "./component/personform";
import Filter from "./component/filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [filterText, setFilterText] = useState("");

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

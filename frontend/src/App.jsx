import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

axios.defaults.baseURL = "http://localhost:8080";

function App() {
  const [persons, setPersons] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    axios.get("/persons").then((response) => {
      setPersons(response.data._embedded.persons);
    });
  }, []);

  function handleAdd(event) {
    event.preventDefault();
    const data = {
      firstName: firstName,
      lastName: lastName,
    };
    if (id === 0) {
      axios
        .post("/persons", data)
        .then((response) => {
          console.log(response);
          setPersons([...persons, response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // handleUpdatePerson(data);
      axios.put(`/persons/${id}`, data).then((response) => {
        console.log(response);
        setPersons(
          persons.map((person) => (person.id === id ? response.data : person))
        );
      });
      setFirstName("");
      setLastName("");
      setId(0);
      document.getElementById("send-button").innerHTML = "Add";
    }
  }
  function handleDelete(id) {
    axios.delete(`/persons/${id}`).then((response) => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  }
  function handleEdit(id) {
    document.getElementById("send-button").innerHTML = "Update";
    persons.find((person) => {
      if (person.id === id) {
        setId(id);
        setFirstName(person.firstName);
        setLastName(person.lastName);
      }
    });
  }

  return (
    <div className="App">
      <h1>Persons</h1>
      <section>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          required
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          required
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <button type="submit" onClick={handleAdd} id="send-button">
          Add
        </button>
      </section>
      <section>
        <ul>
          {persons.length === 0 ? (
            <p>No persons</p>
          ) : (
            persons.map((person, index) => (
              <li key={person.id}>
                {person.firstName} {person.lastName}
                <button onClick={() => handleEdit(person.id)}>Edit</button>
                <button onClick={() => handleDelete(person.id)}>Delete</button>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}

export default App;

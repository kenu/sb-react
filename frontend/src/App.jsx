import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const client = axios.create({
  baseURL: "http://localhost:8080",
});

const App = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [users, setUsers] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await client.get("/users");
        setUsers(response.data._embedded.users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  function handleEdit(userId) {
    const user = users.find((user) => user.id === userId);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setId(user.id);
    console.log(user);
  }

  function handleChangeFirstName(event) {
    setFirstName(event.target.value);
  }
  function handleChangeLastName(event) {
    setLastName(event.target.value);
  }

  function sendData() {
    const user = {
      id,
      firstName,
      lastName,
    };
    if (user.id) {
      client.put(`/users/${user.id}`, user).then((_response) => {
        window.location.reload();
      });
    } else {
      client.post("/users", user).then((response) => {
        setFirstName("");
        setLastName("");
        setUsers([...users, response.data]);
        alert("success");
      });
    }
  }

  return (
    <>
      <div>
        <h1>Hello, React!</h1>
        <input
          type="text"
          name="firstName"
          placeholder="first name"
          value={firstName}
          onChange={handleChangeFirstName}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="last name"
          value={lastName}
          onChange={handleChangeLastName}
          required
        />
        <button onClick={sendData}>send</button>
        <button
          onClick={() => {
            setId("");
            setFirstName("");
            setLastName("");
          }}
        >
          clear
        </button>
      </div>
      <ul>
        {users.length > 0 ? (
          users.map((user) => {
            return (
              <li key={user.id}>
                {user.id} {user.firstName} {user.lastName}
                <button onClick={() => handleEdit(user.id)}>edit</button>
              </li>
            );
          })
        ) : (
          <li>No user</li>
        )}
      </ul>
    </>
  );
};

export default App;

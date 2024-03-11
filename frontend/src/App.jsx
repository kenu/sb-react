import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const client = axios.create({
  baseURL: "http://localhost:8080",
});

const App = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <>
      <div>
        <h1>Hello, React!</h1>
        <input type="text" name="firstName" placeholder="first name" required />
        <input type="text" name="lastName" placeholder="last name" required />
        <button>send</button>
      </div>
      <ul>
        {users.length > 0 ? (
          users.map((user) => {
            return (
              <li key={user.id}>
              {user.id}  {user.firstName} {user.lastName}
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

import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.firstName}</h2>
          <p>{user.lastName}</p>
        </div>
      ))}
    </div>
  );
};

export default App;

import "./App.css";

function App() {
  let list = [
    {
      id: 1,
      firstName: "Elon",
      lastName: "Mask",
    },
    {
      id: 2,
      firstName: "Bill",
      lastName: "Jobs",
    },
  ];
  list = [];
  return (
    <>
      <div>
        <h1>Hello, React!</h1>
        <input type="text" name="firstName" placeholder="first name" required/>
        <input type="text" name="lastName" placeholder="last name" required/>
        <button>send</button>
      </div>
      <ul>
        {list.length > 0 ? list.map(user => {
          return (
            <li>{user.firstName} {user.lastName}</li>
          )
        }) : <li>No user</li>}
      </ul>
    </>
  );
}

export default App;

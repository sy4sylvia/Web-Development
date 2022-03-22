import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });

  function handleChange(event) {
    const curVal = event.target.value;
    const information = event.target.name;

    setContact(preVal => {
      if (information === "fName") {
        return {
          fName: curVal,
          lName: preVal.lName,
          email: preVal.email
        }
      }
      else if (information === "lName") {
        return {
          fName: preVal.fName,
          lName: curVal,
          email: preVal.email
        }
      }
      else {
        return {
          fName: preVal.fName,
          lName: preVal.lName,
          email: curVal
        }
      }
    });
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form>
        <input onChange={handleChange} name="fName" placeholder="First Name" value = {contact.fName} />
        <input onChange={handleChange} name="lName" placeholder="Last Name" value={contact.lName} />
        <input onChange={handleChange} name="email" placeholder="Email" value = {contact.email} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;

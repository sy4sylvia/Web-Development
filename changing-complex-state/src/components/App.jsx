import React, {useState} from "react";

function App() {
  const [fullName, setFullName] = useState({
    fName: "",
    lName: ""
  });

  function handleChange(event) {
    const curVal = event.target.value;
    const inputName = event.target.name;

    // const {val, name} = event.target;

    setFullName(prevValue => {
      if (inputName === "fName") {
        return {
          fName: curVal,
          lName: prevValue.lName
        }
      }
      else {
        return {
          fName: prevValue.fName,
          lName: curVal
        }
      }

    });
  }


  // const [fName, setFName] = useState("");
  // const [lName, setLName] = useState("");

  // const[headingText1, setHeadingText1] = useState("");
  // const[headingText2, setHeadingText2] = useState("");

  // function handleChangeFName(event) {
  //   setFName(event.target.value);
  // }

  // function handleChangeLName(event) {
  //   setLName(event.target.value);
  // }

  // function handleClick(event) {
  //   setHeadingText1(fName);
  //   setHeadingText2(lName);
  //   event.preventDefault();
  // }

  return (
    <div className="container">
      <h1>Hello {fullName.fName} {fullName.lName}</h1>
      <form>
        <input onChange={handleChange} name="fName" placeholder="First Name" value = {fullName.fName} />
        <input onChange={handleChange} name="lName" placeholder="Last Name" value = {fullName.lName} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;

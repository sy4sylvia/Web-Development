import React, {useState} from "react";

function App() {

  const[input, setInput] = useState("");
  const[items, setItems] = useState([]);
  
  function handleChange(event) {
    const val = event.target.value; //get hold of the value
    setInput(val);
  }

  function handleClick() {
    setItems(preVal => {
      return [input, ...preVal];
    });
    setInput(""); //restore
  }


  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value = {input} />
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
        {items.map(eachItem => <li> {eachItem} </li> )}
        </ul>
      </div>
    </div>
  );
}

export default App;

import React, {useState} from "react";

function App() {

  const [name, setName] = useState("");
  const [headingText, setHeadingText] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleClick(event) {
    setHeadingText(name);
    event.preventDefault(); //preventing the webpage being refreshed
  }

  return (
    <div className="container">
      <h1>Hello {headingText} </h1>
      {/* form would refresh the page */}
      <form onSubmit={handleClick}>
        <input onChange = {handleChange} type="text" placeholder="What's your name?" value={name} />
        <button onClick={handleClick}>Submit</button>
      </form>
    </div>
  );
}

export default App;

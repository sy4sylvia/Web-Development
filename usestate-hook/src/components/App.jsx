import React from "react";

function App() {
 
  const [cnt, setCnt] = React.useState(1000);

  function increase() {
    setCnt(cnt + 1);
  }

  function decrease() {
    setCnt(cnt - 1);
  }

  return (
     <div className="container">
    <h1>{cnt}</h1>
    <button onClick={increase}>+</button>
    <button onClick={decrease}>-</button>
  </div>

  );
}

export default App;
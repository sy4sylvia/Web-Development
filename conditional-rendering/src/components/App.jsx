import React from "react";
import Login from "./Login";

var logged = false;

// function renderConditionally() {
//   if (logged) return <h1>Hello</h1>;
//   else return <Login />;
// }
// const curTime = new Date(2020, 11,5,15).getHours();

function App() {
  return (
    <div className="container">
      {logged ? <h1>Hello</h1> : <div><h1>Hi</h1> <Login /></div>}
    </div>
  );
}

export default App;

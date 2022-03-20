import React from "react";

function App() {


  setInterval(update, 1000);

  const now = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  });
  console.log(time);

  const [time, setTime] = React.useState(now);
  function update(){
    const newTime = new Date().toLocaleTimeString(
      "en-US", {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      }
    );
    setTime(newTime);
  }

  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={update}>Get Time</button>
    </div>
  );
}

export default App;

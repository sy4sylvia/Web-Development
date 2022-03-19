import React from "react";
import Input from "./Input";

//login form
function Login() {
  return (
    <form className="form">
      <Input  //create props here -> then go back to Input.jsx and add props
        type = "text"
        placeholder = "Username"/>
      <Input  
        type = "password"
        placeholder = "Password" />
      <button type="submit">Login</button>
    </form>
  );
    
}

export default Login;
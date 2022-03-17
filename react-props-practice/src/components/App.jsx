import React from "react";
import Card from "./Card";
import contacts from "../contacts";
import Avatar from "./Avatar";

function createCard(singleContact) {
  return (<Card 
    key = {singleContact.id} //unique
    idProp = {singleContact.id}
    name = {singleContact.name}
    img ={singleContact.imgURL}
    tel = {singleContact.phone}
    email = {singleContact.email} />);
}

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      <Avatar 
      img = "https://media-exp1.licdn.com/dms/image/C4E03AQEPe7NBrxn9Lw/profile-displayphoto-shrink_400_400/0/1624616540501?e=1652918400&v=beta&t=CPtv3MkdMrk_EBGdfxODSB3v1BmThzzjrSQqUN8XfTk"/>
      
      {contacts.map(createCard)}

    </div>
  );
}



export default App;

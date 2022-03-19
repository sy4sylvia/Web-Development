import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";


function App() {
  return (
    <div>
      <Header />
      {notes.map((noteItem) =>  (
          <Note 
          key = {noteItem.key}
          title = {noteItem.title}
          content = {noteItem.content}
          />)
      )}
      <Note 
      title = "This is the note title"
      content = "This is the note content" //2 props
      />
      <Footer />
    </div>
  );
}

export default App;

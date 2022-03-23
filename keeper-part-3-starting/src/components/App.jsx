import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {

  const [notes, setNotes] = useState([]);

  function addNote(n) {
    setNotes(prevN => {
      return [n, ...prevN];
    })
  }

  function deleteNote(id) {
    setNotes(prevN => {
      return prevN.filter((eachNote, idx) => {
        return idx !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd ={addNote} />
        {notes.map((eachNote, idx) => {
          return <Note 
            key = {idx}
            id = {idx}
            title = {eachNote.title}
            content = {eachNote.content}
            onDelete = {deleteNote}
          />;
        })
        }
      {/* <Note key={1} title="Note title" content="Note content" /> */}
      <Footer />
    </div>
  );
}

export default App;

import React, {useState} from "react";

function CreateArea(props) {

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const {name, value} = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function handleAdd(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    }); //after adding, set to default

    event.preventDefault();
  }


  return (
    <div>
      <form>
        <input name="title" placeholder="Title" 
        value = {note.title} onChange = {handleChange} />

        <textarea name="content" placeholder="Take a note..." rows="3" 
        value={note.content} onChange = {handleChange} />

        <button onClick={handleAdd}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;

import React, {useState} from "react";

function ToDoItem(props) {
    const [isDone, setIsDone] = useState(false);
    
    function handleClick() {
        setIsDone(preVal => {return !preVal});
    }



    return (
    <div onClick={() => {props.onChecked(props.id);}}>
    <li>
    {/* <li style={{textDecoration: isDone? "line-through": "none"}}> */}
    {props.text}
    </li>
    </div>);
    
}

export default ToDoItem;
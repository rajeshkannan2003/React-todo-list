import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({ input, setInput, todos, setTodos , editTodo , setEditTodo }) => {
  
    const updateTodo = (title, id, completed) => {
        const newTodo = todos.map((todo) => 
            todo.id === id ? { title , id , completed } : todo
        );
        setTodos(newTodo);
        setEditTodo("");
    };

    useEffect(() => {
        if (editTodo) {
            setInput(editTodo.title);
        } else {
            setInput("");
        }
    }, [setInput, editTodo]);

    const onInputChange = (event) => {
    setInput(event.target.value);
    };

  const onFormSubmit = (event) => {
    event.preventDefault();
    if(!editTodo){
    setTodos([...todos, {id: uuidv4(), title: input, completed: false}]);
    setInput("");
    } else {
        updateTodo(input, editTodo.id, editTodo.completed)
    }
  };

  return (
    <>
    <div className="header-content">
    <h1>TODAY TASKS...</h1>
    <form className="inputarea" onSubmit={onFormSubmit}>
    <button id="btn" type="sumbit">
        {editTodo ? "" : ""}
      </button>
      <input
        type="text"
        placeholder="Create a new task"
        value={input}
        required
        onChange={onInputChange}
      />
    </form>
    <div className="action-view">
                <button className="all">All</button>
                <button className="all act">Active</button>
                <button className="all cmpld">Completed</button>
            </div>
        </div>
        <div className="bottom-view"></div>
    </>
    
    
  );
};

export default Form;
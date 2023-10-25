import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";




const App = () => {
  const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(initialState);
  const [editTodo, setEditTodo] = useState(null);
  const [filteredOn, setFilteredOn] = useState("all");


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id, completed } : todo
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
    if (!editTodo) {
      setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  };

  const handleComplete = (todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  // const handleEdit = ({ id }) => {
  //   const findTodo = todos.find((todo) => todo.id === id);
  //   setEditTodo(findTodo);
  // }

  const handleDelete = ({ id }) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const taskview = () => {
    return <div className="task-count">Total tasks {todos.length}, completed {todos.filter(t => t.completed === true).length}</div>;
  };

  const nolist = () => {
    return <div className="no-list">your todos list empty</div>;
  }

  let filteredTodos;

  switch(filteredOn){
    case 'all': 
        filteredTodos = todos;
    break;
    case 'complete': 
        filteredTodos = todos.filter(t => t.completed === true);
    break;
    case 'active': 
        filteredTodos = todos.filter(t => t.completed === false);
    break;
}

  return (
    <div>
      <div className="header-content">
        <h1>TODAY TASKS...</h1>
        <form className="inputarea" onSubmit={onFormSubmit}>
          <button id="btn" type="sumbit">
          {(input.length > 0) && (
              <svg id="view" onClick={() => setInput("")} className="w-full h-full text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
          )}
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
          {todos.length > 0 && taskview()}
          <button onClick={() => setFilteredOn('all')} className="all">All</button>
          <button onClick={() => setFilteredOn('active')} className="all act">Active</button>
          <button onClick={() => setFilteredOn('complete')} className="all cmpld">Completed</button>
          {todos.length ?
          <div>
          {filteredTodos.map((todo) => (
            <li className="list-view" key={todo.id}>
              <button
                className="button-complete task-button"
                onClick={() => handleComplete(todo)}
              >
                <i className="fa fa-check-circle"></i>
              </button>
              <div
                type="text"
                value={todo.title}
                className={`list ${todo.completed ? "complete" : ""}`}
                onChange={(event) => event.preventDefault()}
              >
                {todo.title}
              </div>
              <div>
                

                <button
                  className="button-delete task-button"
                  onClick={() => handleDelete(todo)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </li>
          ))}
          </div>: nolist()}
        </div>
      </div>
      <div className="bottom-view"></div>
    </div>
  );
};

export default App;
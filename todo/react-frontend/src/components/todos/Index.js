import React from "react";

export default function Index(props) {
  return (
    <div className="box">
      <h2>Todo List</h2>
      <a href="#" onClick={() => props.setMode("create")}>
        <i className="fas fa-plus-square fa-2x" />
      </a>
      <div className="cover">
        <input type="text" onChange={props.filter} placeholder="search" />
        {props.todos
          ? props.todos.map((todo, index) => (
              <div key={index} className="list">
                <span
                  className="clickable"
                  onClick={() => props.selectTodo(index)}
                >
                  {todo.todoText}
                </span>{" "}
                <a
                  href="#"
                  onClick={() => props.handleDelete(todo._id)}
                  // onClick={props.handleDelete.bind(this, todo._id)}
                  style={{ float: "right" }}
                >
                  <i className="fas fa-trash-alt" />
                </a>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

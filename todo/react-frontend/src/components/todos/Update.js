import React from "react";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";

export default function Update(props) {
  const todo = props.todo;
  const date = props.todo.dueDate;
  return (
    <div className="box">
      <h2>Update Todo</h2>
      <a href="#" onClick={() => props.setMode("index")}>
        <i className="fas fa-caret-square-left" /> BACK
      </a>
      <form onSubmit={props.handleUpdate}>
        <label>Todo</label>
        <input
          id="todoText"
          type="text"
          placeholder="Enter todo here"
          onChange={e => props.handleChange(e)}
          value={todo.todoText}
          required
        />

        <label>Assignee Email</label>
        <input
          id="assignee"
          type="email"
          placeholder="Enter assignee email address"
          onChange={e => props.handleChange(e)}
          required
          value={todo.assignee}
        />

        <label>Due Date</label>
        <Flatpickr
          data-enable-time
          value={date}
          onChange={date => props.setDate(date)}
        />

        <div className="wrapper">
          <div className="file-upload">
            <input type="file" onChange={props.upload} />

            {props.uploading ? (
              <i className="fas fa-spinner fa-spin" />
            ) : (
              <i className="fa fa-arrow-up" />
            )}
          </div>
        </div>

        {todo.docs.length > 1
          ? todo.docs.map((doc, index) => (
              <div key={index}>
                <a href={"https://yourdomain/" + doc.docname}>{doc.docname}</a>
              </div>
            ))
          : null}

        <input type="submit" />
      </form>
    </div>
  );
}

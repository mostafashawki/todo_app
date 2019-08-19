import React from "react";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";

export default function Create(props) {
  const date = props.todo.dueDate;
  return (
    <div className="box">
      <h2>Add New Todo</h2>
      <a href="#" onClick={() => props.setMode("index")}>
        <i className="fas fa-caret-square-left" /> BACK
      </a>
      <form onSubmit={props.handleCreate}>
        <label>Todo</label>
        <input
          id="todoText"
          type="text"
          placeholder="Enter todo here"
          onChange={e => props.handleChange(e)}
          required
        />

        <label>Assignee Email</label>
        <input
          id="assignee"
          type="email"
          placeholder="Enter assignee email address"
          onChange={e => props.handleChange(e)}
          required
        />

        <label>Due Date</label>
        <Flatpickr
          data-enable-time
          value={date}
          onChange={date => props.setDate(date)}
        />

        <input type="submit" />
      </form>
    </div>
  );
}

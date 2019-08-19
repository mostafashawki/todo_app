const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

// Create Schema
const TodoSchema = new Schema({
  urlId: {
    type: String,
    default: shortid.generate
  },
  byUserEmail: {
    type: String,
    max: 255,
    required: true
  },
  assignee: {
    type: String,
    max: 255,
    required: true
  },
  todoText: {
    type: String,
    max: 5000,
    required: true
  },
  SEQUENCE: {
    type: Number,
    default: 0
  },
  subToDos: [
    {
      subToDoText: {
        type: String,
        max: 1000,
        required: false
      },
      completed: {
        type: Boolean,
        required: false
      }
    }
  ],
  comments: [
    {
      commentText: {
        type: String,
        max: 5000,
        required: false
      },
      byUserEmail: {
        type: String,
        max: 255,
        required: false
      }
    }
  ],
  docs: [
    {
      docname: {
        type: String,
        max: 50,
        required: false
      },
      by: {
        type: String,
        max: 255,
        required: false
      },
      fileId: {
        type: String,
        max: 16,
        required: false
      }
    }
  ],
  dueDate: {
    type: Date,
    default: new Date("2100-1-1")
  },
  lastUpdate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Todo = mongoose.model("todo", TodoSchema);

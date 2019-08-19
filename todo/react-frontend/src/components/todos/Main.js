import React, { Component } from "react";
import Index from "./Index";
import Create from "./Create";
import Update from "./Update";
import Preloader from "../Preloader";
import shortid from "shortid";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import { apiTodo, apiDocs } from "../../global/conn";
const headers = JSON.parse(sessionStorage.getItem("headers"));
let user = {};
try {
  user = JSON.parse(sessionStorage.getItem("user"));
} catch (error) {}

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "loading",
      todos: [],
      todo: {},
      selectedIndex: null,
      uploading: false
    };
  }
  componentDidMount() {
    console.log("workssss");
    const url = apiTodo + "/";

    //////////////////////////////////////
    fetch(url, {
      method: "GET",
      headers
    })
      .then(res => res.json())
      .then(data => {
        if (data == "unauth") {
          sessionStorage.clear();
          window.location.href = "/";
          return false;
        }
        console.log("RETREIVED DATA IS: XXXXXXXXXXX", data);
        this.setState({ todos: data.reverse() }); //to get the new at the top
        this.setState({ mode: "index" });
      })
      .catch(err => console.log(err));
  }

  setMode = newMode => {
    console.log(newMode);
    if (newMode === "create") this.setState({ todo: {} });
    this.setState({ mode: newMode });
  };

  handleChange = e => {
    const todo = this.state.todo;
    todo[e.target.id] = e.target.value;
    this.setState({ todo });
    console.log("todo is -> ", this.state.todo);
  };

  handleCreate = e => {
    e.preventDefault();
    console.log(this.state.todo);
    const todo = this.state.todo;
    todo.byUserEmail = user.email;
    const url = apiTodo + "/";

    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(todo)
    })
      .then(res => res.json())
      .then(data => {
        console.log("data from server ->", data);
        const todos = this.state.todos;
        todos.unshift(data);
        this.setState({ todos });
        this.setState({ mode: "index" });
      })
      .catch(err => console.log(err));
  };

  handleUpdate = e => {
    e.preventDefault();
    console.log(this.state.todo);
    const url = apiTodo + "/";

    fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(this.state.todo)
    })
      .then(res => res.json())
      .then(data => {
        console.log("data from server ->", data);
        const todos = this.state.todos;
        todos[this.state.selectedIndex] = data;
        this.setState({ todos });
        this.setState({ mode: "index" });
      })
      .catch(err => console.log(err));
  };

  handleDelete = id => {
    console.log(id);
    console.log(this.state.todo);
    const url = apiTodo + `/${id}`;

    fetch(url, {
      method: "DELETE",
      headers
    })
      .then(res => res.json())
      .then(data => {
        console.log("data from server ->", data);
        const todos = this.state.todos;
        const filteredTodos = todos.filter(todo => {
          return todo._id !== data._id;
        });
        this.setState({ todos: filteredTodos });
      })
      .catch(err => console.log(err));
  };

  selectTodo = selectedIndex => {
    const selectedTodo = Object.assign({}, this.state.todos[selectedIndex]);
    // const selectedTodo = this.state.todos[selectedIndex];
    this.setState({ todo: selectedTodo });
    this.setState({ selectedIndex });
    this.setState({ mode: "update" });
    // console.log("selected TODO", todo);
    console.log("selected Index ", selectedIndex);
  };

  upload = e => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    console.log("size is: ", e.target.files[0].size / 1024 / 1024);
    let fileInput = e.target;
    let filePath = fileInput.value;
    console.log("file path is:", filePath);
    //validation first
    let allowedExtensions = /(\.xlsx|\.xls|\.doc|\.docx|\.ppt|\.pptx|\.txt|\.pdf)$/i;
    //.xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf
    if (!allowedExtensions.exec(filePath)) {
      Alert.error(
        "Allowed Extensions .xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf"
      );
      fileInput.value = "";
      return false;
    }
    let fileSize = e.target.files[0].size / 1024 / 1024;
    fileSize = fileSize.toFixed(2);
    if (fileSize > 5) {
      // alert('too big')
      Alert.error("Maximum file size is 5 MB");
      fileInput.value = "";
      return false;
    }
    this.setState({ uploading: true });

    let form = new FormData();
    form.append("file", file);
    const data = {
      docname: fileInput.files[0].name,
      fileId:
        shortid.generate() + "." + fileInput.files[0].name.split(".").pop(),
      by: user.email
    };
    form.append("data", JSON.stringify(data));
    const todo = this.state.todo;
    todo.docs.push(data);
    console.log("before sending", form);
    const docUrl = apiDocs + "/upload";
    const todoUrl = apiTodo + "/";

    Promise.all([
      fetch(docUrl, {
        method: "POST",
        headers: { Authorization: user.token }, //no content-type with formData
        body: form
      }),
      fetch(todoUrl, {
        method: "PUT",
        headers,
        body: JSON.stringify(todo)
      })
    ])
      .then(([doc_api, todo_api]) => {
        console.log(doc_api.status);
        console.log(doc_api);
        if (doc_api.status == 200 && todo_api.status == 200) {
          this.setState({ uploading: false });
          this.setState({ todo });
          Alert.success("saved successfuly");
        } else Alert.error("Oops something went wrong!");
      })
      .catch(err => {
        console.log(err);
        Alert.error("Oops something went wrong!");
      });
    //////////////////////////////////////////

    //just upload file without updating the todo
    // fetch(url, {
    //   method: "POST",
    //   headers: { Authorization: user.token }, //no content-type with formData
    //   body: form
    // })
    //   .then(res => res.json())
    //   .then(doc => {
    //     if (doc == "unauth") {
    //       sessionStorage.clear();
    //       window.location.href = "/";
    //     } else if (doc == "invalid") {
    //       Alert.error("Invalid!");
    //       this.setState({ uploading: false });

    //       return false;
    //     } else if (doc == "infected") {
    //       Alert.error("Infected File!");
    //       this.setState({ uploading: false });
    //       return false;
    //     }
    //     console.log(doc);
    //     this.setState({ uploading: false });
    //     Alert.success("saved successfuly");
    //     // return false;
    //   })
    //   .catch(err => {
    //     console.log("the error is------", err);
    //     Alert.error("Oops something went wrong!");
    //     this.setState({ uploading: false });
    //     return false;
    //   });
  };

  setDate = date => {
    const todo = this.state.todo;
    todo.dueDate = date[0];
    this.setState({ todo });
    console.log("todo after date", this.state.todo);
  };

  filter = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const mode = this.state.mode;
    let todos = this.state.todos;
    if (this.state.filter) {
      todos = todos.filter(todo =>
        todo.todoText.toLowerCase().includes(this.state.filter.toLowerCase())
      );
    }
    if (mode === "index")
      return (
        <Index
          todos={todos}
          setMode={this.setMode}
          selectTodo={this.selectTodo}
          filter={this.filter}
          handleDelete={this.handleDelete}
        />
      );
    else if (mode === "create")
      return (
        <Create
          setMode={this.setMode}
          handleChange={this.handleChange}
          handleCreate={this.handleCreate}
          todo={this.state.todo}
          setDate={this.setDate}
        />
      );
    else if (mode === "update")
      return (
        <Update
          todo={this.state.todo}
          setMode={this.setMode}
          handleChange={this.handleChange}
          handleUpdate={this.handleUpdate}
          setDate={this.setDate}
          upload={this.upload}
          uploading={this.state.uploading}
        />
      );
    else if (mode === "loading") return <Preloader />;
  }
}

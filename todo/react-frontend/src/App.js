import React, { Component } from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import { apiAuth } from "./global/conn";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import Login from "./components/auth/Login";
import ToDos from "./components/todos/Main";
import Profile from "./components/profile";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./App.css";

let isLogged = false;
try {
  isLogged = sessionStorage.getItem("isLogged");
} catch (error) {}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLogged: false
    };
  }

  handleChange = e => {
    const user = this.state.user;
    console.log("user before is:::::: ", this.state.user);
    user[e.target.id] = e.target.value;
    this.setState({ user });
    console.log("user is:::::: ", this.state.user);
  };

  handleSubmitLogin = e => {
    e.preventDefault();

    const url = apiAuth + "/login";

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.user)
    })
      .then(res => res.json())
      .then(data => {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", data);
        if (data === "Email not found!" || data === "Password incorrect!") {
          Alert.error("Email or password are not correct!");
          return;
        } else {
          sessionStorage.setItem("user", JSON.stringify(data));
          sessionStorage.setItem("isLogged", true);
          console.log(sessionStorage.getItem("isLogged"));
          const user = JSON.parse(sessionStorage.getItem("user"));
          const headers = {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: user.token
          };
          sessionStorage.setItem("headers", JSON.stringify(headers));

          this.setState({ user });
          window.location.href = "/";
        }
      })
      .catch(err => {
        Alert.error("Oops something went wrong!");
      });
  };

  copyToClipboard = (e, id) => {
    e.preventDefault();
    var copyText = document.getElementById(id);
    var textArea = document.createElement("textarea");
    textArea.value = copyText.value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    //alert("Copied the text: " + textArea.value);
    textArea.remove();
    Alert.success("Copied to clipboard!");
  };

  render() {
    isLogged = sessionStorage.getItem("isLogged");
    return (
      <HashRouter>
        <div className="App">
          <Header />
          <main>
            <Route
              exact
              path="/"
              render={() => (isLogged ? <ToDos /> : <Redirect to="/login" />)}
            />

            {/* <Route exact path="/" /> */}

            {/* <Route
            path="/"
            render={() => (isLogged ? <ToDos /> : <Redirect to="/login" />)}
          /> */}

            {/* <Route path="/update/:id" component={UpdateTodo} /> */}

            <Route
              path="/login"
              render={props =>
                isLogged ? (
                  <Redirect to="/" />
                ) : (
                  <Login
                    {...props}
                    handleChange={this.handleChange}
                    handleSubmitLogin={this.handleSubmitLogin}
                    handleChangeRecaptcha={this.handleChangeRecaptcha}
                    isRecaptchaVerifiedLogin={
                      this.state.isRecaptchaVerifiedLogin
                    }
                    isSubmitted={this.state.isSubmitted}
                  />
                )
              }
            />

            <Route
              path="/profile"
              render={props =>
                isLogged ? (
                  <Profile
                    {...props}
                    handleSubmitProfile={this.handleSubmitProfile}
                    handleChangeProfile={this.handleChangeProfile}
                    user={JSON.parse(sessionStorage.getItem("user"))}
                    copyToClipboard={this.copyToClipboard}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Footer />
            <Alert stack={{ limit: 3 }} />
          </main>
        </div>
      </HashRouter>
    );
  }
}

export default App;

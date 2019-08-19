import React from "react";

const Login = props => {
  return (
    <div className="box" style={{ maxWidth: "640px" }}>
      <div className="cover">
        <h2>Login Page</h2>
        <p>For Testing</p>
        <p>Email: user@gmail.com</p>
        <p>Password: Password2019</p>
        <form onSubmit={props.handleSubmitLogin}>
          <div>
            <label>Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              onChange={props.handleChange}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={props.handleChange}
              required
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};
export default Login;

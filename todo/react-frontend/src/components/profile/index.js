import React from "react";

const Index = props => {
  return (
    <React.Fragment>
      <div className="box">
        <h2>Profile</h2>

        <form onSubmit={props.handleSubmitProfile}>
          <label>Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            onChange={props.handleChangeProfile}
            defaultValue={props.user.name}
          />

          <label>Email</label>
          <input
            id="email"
            type="email"
            placeholder="Your Email Address"
            defaultValue={props.user.email}
            readOnly
          />

          <input type="submit" />
          <h4>My Calendar Feeds</h4>

          <div style={{ display: "flex" }}>
            <div style={{ flex: "6" }}>
              <input
                id="me"
                type="text"
                readOnly
                defaultValue={`http://ical.wdev24x7.com/users/${props.user.email
                  .replace("@", "")
                  .replace(".", "")}.ics`}
              />
            </div>
            &nbsp;&nbsp;&nbsp;
            <div style={{ flex: "1" }}>
              <a href="#" onClick={e => props.copyToClipboard(e, "me")}>
                <i className="far fa-copy fa-3x" />
              </a>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default Index;

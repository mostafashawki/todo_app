import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        {new Date().getFullYear()}&nbsp; © Made with{" "}
        <i className="fas fa-heart" /> by&nbsp;
        <a href="https://www.linkedin.com/in/mostafashawki/" target="_blank">
          Mostafa Shawki{" "}
        </a>{" "}
        for better web.
      </p>
    </footer>
  );
}

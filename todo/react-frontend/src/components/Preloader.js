import React from "react";

export default function Preloader() {
  return (
    <div
      id="preloader"
      style={{ width: "100px", margin: "0 auto", marginTop: "70px" }}
    >
      <i className="fas fa-spinner fa-5x fa-spin" />
    </div>
  );
}

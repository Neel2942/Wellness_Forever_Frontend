import React from "react";
import logo from "../../logo 1.png";


export default function Header() {
  return (
    <header>
      <div className="container-fluid"> {/* Wrap the header in a container */}
        <nav className="navbar  navbar-light custom-bg">
          <div className="container d-flex justify-content-between align-items-center">
            <div className="col d-flex ">
              <img src={logo} width={"20%"} height={"20%"} />
            </div>
            <a className="navbar-brand col text-center text-black" href="/">
              Wellness Forever
            </a>

            <div
              className=" col d-flex justify-content-end"
              id="navbarNav"
            >
              <a href="/" className="btn btn-primary">
                Login
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

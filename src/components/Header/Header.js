// Header.js
import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header>
      <div className={styles.navbar}>
      <div className={styles.logo}>
        <a href="/">Wellness Forever</a>
      </div>
        <ul className="links">
          <li><a href="hero">Home</a></li>
          <li><a href="about">About</a></li>
          <li><a href="services">Services</a></li>
          <li><a href="contact">Contact</a></li>
        </ul>
        <a href="/" className={styles.action_btn}>Login</a>
      </div>
    </header>
  );
}

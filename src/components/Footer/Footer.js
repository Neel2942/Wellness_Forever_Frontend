import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <div className={styles.footer_content}>
        <div className={styles.logo}>
          <a href="/">Wellness Forever</a>
        </div>
        <p>&copy; 2024 Wellness Forever. All rights reserved.</p>
      </div>
    </footer>
  );
}

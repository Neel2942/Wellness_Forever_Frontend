import React from "react";

export default function Footer() {
  return (
    <footer className="custom-bg text-black py-4">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
          <div className="mr-2">
            <a href="/" className="text-black text-decoration-none">
              <strong>Wellness Forever</strong>
            </a>
          </div>
          <p className="mb-0">&copy; 2024 Wellness Forever. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

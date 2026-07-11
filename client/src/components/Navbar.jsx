import React from "react";
import { Link } from "react-router-dom";
import AuthButtons from "./AuthButton";
import "../index.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="app-name">SnippetHub</Link>
      </div>
      <div className="navbar-right">
        <AuthButtons />
      </div>
    </nav>
  );
}
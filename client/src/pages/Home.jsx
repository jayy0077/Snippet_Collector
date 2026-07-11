import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="homepage">
      <h1 className="heading">Welcome to SnippetHub</h1>
      <p className="text">Effortlessly manage and explore your code snippets.</p>
      <div className="actions">
        <Link to="/create" className="button">Create Snippet</Link>
        <Link to="/snippets" className="button">View Snippets</Link>
      </div>
      <footer className="footer">&copy; 2025 SnippetHub | Made with ❤️ By Jaydeep</footer>
    </div>
  );
}
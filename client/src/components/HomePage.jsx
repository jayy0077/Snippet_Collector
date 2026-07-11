import React from "react";

export default function HomePage() {
  return (
    <div className="homepage-container">
      <section className="intro">
        <h1>Welcome to SnippetHub</h1>
        <p>Your one-stop platform to manage and explore your code snippets efficiently.</p>
      </section>

      <section className="actions">
        <button className="btn primary">Create Snippet</button>
        <button className="btn secondary">See All Snippets</button>
      </section>

      <footer className="footer">
        <p>© 2025 SnippetHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

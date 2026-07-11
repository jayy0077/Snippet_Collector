import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SnippetForm from "./components/SnippetForm";
import SnippetList from "./components/SnippetList";
import Profile from "./pages/Profile";
import "./index.css";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<SnippetForm />} />
        <Route path="/snippets" element={<SnippetList />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
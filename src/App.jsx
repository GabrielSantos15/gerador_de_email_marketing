import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Gerador from "./Pages/Gerador";

export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gerador" element={<Gerador />} />
      </Routes>
    </Router>
    </>
  );
}

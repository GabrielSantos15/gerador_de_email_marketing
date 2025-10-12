import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home/home";
import Gerador from "./Pages/Gerador/ComunicadoMaker";
import Header from "./Components/Header";

export default function App() {
  return (
    <Router>
      <Header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/gerador">Gerador</Link>
            </li>
          </ul>
        </nav>
      </Header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gerador" element={<Gerador />} />
      </Routes>
    </Router>
  );
}

import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState, useEffect } from "react";

import Navbar from "./components/Navigation/Navigation";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
      </div>
    </Router>
  );
}

export default App;

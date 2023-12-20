import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Contacts } from "./Contacts";
const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/contacts">Contacts</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Table from "./components/Table";
import Carousel from "./pages/Carousel"; // Create this component
import Services from "./pages/Services"; // Create this component
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="dashboard">
        <Sidebar />
        <div className="main-content">
          {/* <Header /> */}
        
          <Routes>
            <Route path="/" element={<Carousel />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


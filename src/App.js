import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Synchronizer from "./components/synchronize";

function App() {
  return (
    <>
    <Router>
      <div className="h-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/synchronize" element={<Synchronizer />} />
     

        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;

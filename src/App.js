import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InsertCashflows from "./components/InsertCashflows";
import InsertTrades from "./components/InsertTrades";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/insert-cashflows" element={<InsertCashflows />} />
          <Route path="/insert-trades" element={<InsertTrades />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

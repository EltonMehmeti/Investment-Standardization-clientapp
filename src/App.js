import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Synchronizer from "./components/synchronize";
import Trade from "./components/Trade";
import CashFlow from "./components/CashFlow";
import TradeDetail from "./components/SingleTrade";
import Task from "./components/Task";

function App() {
  return (
    <>
    <Router>
      <div className="h-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/synchronize" element={<Synchronizer />} />
          <Route path="/trades" element={<Trade />} />
          <Route path="/trade/:id" element={<TradeDetail />} />
          <Route path="/cashflow" element={<CashFlow />} />
          <Route path="/task/:id" element={<Task />} />
     

        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InsertCashflows from "./components/InsertCashflows";
import InsertTrades from "./components/InsertTrades";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DragDrop from "./components/DragDrop";
import TradeList from "./components/TradeList";
import SingleTrade from "./components/SingleTrade";

function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/insert-cashflows" element={<InsertCashflows />} />
          <Route path="/insert-trades" element={<InsertTrades />} />
          <Route path="/trades-list" element={<TradeList />} />
          <Route path={`/trade/:identifier`} element={<SingleTrade />} />

        </Routes>
      </div>
    </Router>
      {/* <div className="App">
        <DragDrop />
      </div> */}
    </DndProvider>
    </>
  );
}

export default App;

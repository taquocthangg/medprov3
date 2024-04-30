import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from './componnets/Header/Header';
import Fooder from './componnets/Footer/Fooder';
import ScrollToTop from "./componnets/ScrollToTop.js";
import BackToTop from "./componnets/BackToTop.js";
import MenuBar from "./Admin/componnents/MenuBar.jsx";
import AppRouter from "./componnets/AppRouter.jsx";
import AdHeader from "./Admin/componnents/AdHeader.jsx";
import QueryAdmin from "./Admin/service/QueryContext.js";

function App() {
  const role_id = 'R4';
  const isAdmin = ['R1', 'R2', 'R3'].includes(role_id);
  const [QueryValue, setQueryValue] = useState("")
  const handleUpdateQuery = (value) => {
    setQueryValue(value)
  }
  return (
    <div className="App">
      <QueryAdmin.Provider value={{ QueryValue, setQueryValue }}>
        <Router>
          {isAdmin ? <AdHeader /> : <Header />}
          <BackToTop />
          <ScrollToTop >
            {isAdmin ? <MenuBar role_id={role_id} /> : <AppRouter />}
          </ScrollToTop>
          <Fooder />
        </Router>
      </QueryAdmin.Provider>
    </div>
  );
}

export default App;

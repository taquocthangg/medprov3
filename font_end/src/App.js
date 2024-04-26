
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from './componnets/Header/Header';
import Fooder from './componnets/Footer/Fooder';
import ScrollToTop from "./componnets/ScrollToTop.js";
import BackToTop from "./componnets/BackToTop.js";
import MenuBar from "./Admin/componnents/MenuBar.jsx";
import AppRouter from "./componnets/AppRouter.jsx";
import AdHeader from "./Admin/componnents/AdHeader.jsx";


function App() {
  const role_id = 'R1'
  return (
    <div className="App">
      {
        <Router>
          {role_id == 'R4' ? <Header /> : <AdHeader />}
          <BackToTop />
          <ScrollToTop >
            {role_id == 'R4' ? <AppRouter /> : <MenuBar role_id={role_id} />}
          </ScrollToTop>
          <Fooder />
        </Router>
      }
    </div>
  );
}

export default App;

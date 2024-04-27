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
<<<<<<< HEAD
  const role_id = 'R1';
=======
  const role_id = 'R4';
>>>>>>> b98c1fdf4ae575b094537ca74e39fd1ca64e7fc0
  const isAdmin = ['R1', 'R2', 'R3'].includes(role_id);

  return (
    <div className="App">
      <Router>
        {isAdmin ? <AdHeader /> : <Header />}
        <BackToTop />
        <ScrollToTop >
          {isAdmin ? <MenuBar role_id={role_id} /> : <AppRouter />}
        </ScrollToTop>
       {/* <Fooder />  */}
      </Router>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from './componnets/Header/Header';
import Fooder from './componnets/Footer/Fooder';
import ScrollToTop from "./componnets/ScrollToTop.js";
import BackToTop from "./componnets/BackToTop.js";
import MenuBar from "./Admin/componnents/MenuBar.jsx";
import AppRouter from "./componnets/AppRouter.jsx";
import AdHeader from "./Admin/componnents/AdHeader.jsx";
import QueryAdmin from "./Admin/service/QueryContext.js";
import { decodeAccessToken, isAuthenticated } from "./api/auth.js";
import { getCurentUser } from "./api/index.js";
import User from "./pages/User.jsx";

function App() {
  const [QueryValue, setQueryValue] = useState("")
  const [inforUser, setInforUser] = useState();
  const [role_id, setRole_id] = useState([]);
  const [pathname, set_Path_Name] = useState(['']);
  const isAdmin = ['R1', 'R2', 'R3'].includes(role_id);
  const isUser = ['/user', '/phieu-kham-benh',].includes(pathname);
  const location = useLocation();
  useEffect(() => {
    set_Path_Name(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    async function fetchData() {
      const userIsAuthenticated = isAuthenticated();
      if (userIsAuthenticated) {
        const decodedToken = decodeAccessToken();
        setRole_id(decodedToken.role_id)
        try {
          const userData = await getCurentUser(decodedToken.id);
          setInforUser(userData.user);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.log('User not logged in. Redirecting to login page.');
      }
    }

    fetchData();
  }, [setInforUser, role_id, isAdmin]);
  const handleUpdateQuery = (value) => {
    setQueryValue(value)
  }
  console.log(role_id)
  return (
    <div className="App">
      <QueryAdmin.Provider value={{ QueryValue, setQueryValue }}>

        {isAdmin ? <AdHeader /> : <Header inforUser={inforUser} />}
        <BackToTop />
        <ScrollToTop >
          {isAdmin ? <MenuBar role_id={role_id} /> : <AppRouter inforUser={inforUser} setRole_id={setRole_id} setInforUser={setInforUser} />}
          {isUser ? <User /> : null}
        </ScrollToTop>
        <Fooder />
      </QueryAdmin.Provider>
    </div>
  );
}

export default App;

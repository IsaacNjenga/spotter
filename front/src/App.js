import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import LogTrip from "./pages/logTrip";
import Auth from "./pages/auth";
import axios from "axios";
import Cookies from "universal-cookie";
import LocationLog from "./pages/locationLog";
import UpdateLog from "./pages/updateLog";
import UpdateShippingLog from "./pages/updateShippingLog";
import AllLogs from "./pages/allLogs";

const cookies = new Cookies();

export const UserContext = createContext();

axios.defaults.baseURL = "http://localhost:3001/spotter";
axios.defaults.withCredentials = true;

const authToken = cookies.get("token");

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = cookies.get("userId");
    if (userId) {
      setUser(userId);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!authToken) {
    return <Auth />;
  }
  return (
    <UserContext.Provider value={{ isMobile, user }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="log-trip" element={<LogTrip />} />
            <Route path="log-location" element={<LocationLog />} />
            <Route path="logs" element={<AllLogs />} />
            <Route path="update-log/:id" element={<UpdateLog />} />
            <Route
              path="update-shipping-log/:id"
              element={<UpdateShippingLog />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

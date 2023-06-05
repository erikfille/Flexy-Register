import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./views/Login/Login";
import InfoModal from "./components/InfoModal";
import ForgotPassModal from "./components/ForgotPassModal";
import "./App.css";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") navigate("signup");
  }, [window.location]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
      </Routes>
      <InfoModal />
      <ForgotPassModal />
    </div>
  );
}

export default App;

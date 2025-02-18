import "./App.css";
import React, { useEffect, useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserList } from "./components/UserList";
import ResetPassword from "./components/ResetPassword";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if accessToken exists in localStorage on app load
    const userData = localStorage.getItem("musicUserData");
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route
          path="/artists"
          element={isLoggedIn ? <MainPage /> : <Navigate to="/login" replace />}
        />
        <Route path="/artists" element={<MainPage />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;

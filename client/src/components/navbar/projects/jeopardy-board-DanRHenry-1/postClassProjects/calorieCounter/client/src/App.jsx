// freecodecamp has this file as App.js
// code from freecodecamp
import React from "react";

//import axios from 'axios'; -- Deal with this later?

import "./App.css";
// import { useState } from "react";
import Auth from "./components/auth/Auth";
import { Routes, Route } from "react-router-dom";
import GatherInfo from "./components/auth/register/GatherInfo";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  // const [sessionToken, setSessionToken] = useState("Sample Token");
  const updateToken = (newToken) => {
    // console.log("newToken:", newToken);
    localStorage.setItem("token", newToken);
    // ^ .setItem(key, value)
    // setSessionToken(newToken);
  };

  return (
    <div className="App">
      <Routes>
        Login Page
        <Route path="/" element={<Auth updateToken={updateToken} />} />
        <Route path="/gatherInfo" element={<GatherInfo updateToken={updateToken}/>}/>
        <Route path="/dashboard" element={<Dashboard updateToken={updateToken}/>}/>
      </Routes>
    </div>
  );
}

export default App;

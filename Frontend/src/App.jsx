import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignUP from "./pages/SignUp";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";

const App = () => (
  <>
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<SignUP />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<Dashboard key={new Date().getTime()} />}
        />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;

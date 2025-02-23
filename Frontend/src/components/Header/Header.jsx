import React from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-light bg-light d-flex justify-content-between px-4">
      <h1 className="text-dark fw-bold ">Expense Management System</h1>
      <div>
        <button className="btn btn-primary me-4 " onClick={() => navigate("/")}>
          Login
        </button>
        <button
          className="btn btn-secondary me-4"
          onClick={() => navigate("/Register")}
        >
          Register
        </button>
        <button className="btn btn-danger">Logout</button>
      </div>
    </nav>
  );
};

export default Header;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem("toastMessage", "Registration successful! 🎉");
    navigate("/");
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "500px" }}>
        <h2 className="text-center mb-4">
          Welcome to Expense Management System
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
          }}
        >
          <FaUser size={60} color="blue" />
        </div>
        <h2 className="text-center mb-1">Registration</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label fw-bold">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              required
            />
            <br />
            <label className="form-label fw-bold">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
            <br />
            <label className="form-label fw-bold ">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 ">
            Register
          </button>
          <div className="mt-3 text-center">
            <Link to="/" className="text-decoration-none">
              Go Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

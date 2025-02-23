import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const SignUP = () => {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate successful login
    localStorage.setItem("toastMessage", "Login successful! 🎉");
    navigate("/dashboard");
  };

  useEffect(() => {
    const message = localStorage.getItem("toastMessage");
    if (message) {
      toast.success(message);
      localStorage.removeItem("toastMessage"); // Show toast if a message exists
    }
  }, []);


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light ">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        {/* <img src="/images/key-person.png" alt="Login Icon" style={{ width: "40px", height: "auto" }}/> */}
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
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-bold">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              required
            />
            <br />
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/forgot-password" className="text-decoration-none">
            Forgot Password?
          </Link>
        </div>
        <div className="mt-3 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/Register" className="text-decoration-none">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUP;

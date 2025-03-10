import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//toast.configure();

const SignUP = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Simulate successful login
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });
      if (res.status === 200 && res.data.userId) {
        localStorage.setItem("userId", res.data.user._id); // Store id for authentication
        // console.log("Stored User ID:", res.data.user._id);
        toast.success("Login successful! 🎉");
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      } else {
        toast.error("Login failed: User ID not found in response");
      }
    } catch (err) {
      // toast.error("Error: " + err.response?.data?.message || err.message);
      // console.error("Login failed:", err.response?.data || err.message);
      toast.error("Invalid Credentials");
    }
    // localStorage.setItem("toastMessage", "Login successful! 🎉");
    // navigate("/dashboard");
  };

  // useEffect(() => {
  //   const message = localStorage.getItem("toastMessage");
  //   if (message) {
  //     toast.success(message);
  //     localStorage.removeItem("toastMessage"); // Show toast if a message exists
  //   }
  // }, []);

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

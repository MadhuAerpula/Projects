import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const location = useLocation();
  //useEffect(() => { ... }, [location.state]); syntax of useEffect
  //const navigate = useNavigate();
  // const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    amount: "",
    transactionType: "income",
    category: "",
  });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Get user ID from local storage
    if (!userId) {
      toast.error("User not logged in!");
      return;
    }

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/getTransactions/${userId}`
        );
        if (response.status === 200) {
          setTransactions(response.data.transactions);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast.error("Failed to fetch transactions");
      }
    };

    fetchTransactions();
  }, []);
  // useEffect(() => {
  //   const message = localStorage.getItem("toastMessage");
  //   if (message) {
  //     toast.success(message);
  //     localStorage.removeItem("toastMessage"); // Show toast if a message exists
  //   }
  // }, []);

  // useEffect(() => {
  //   const userId = localStorage.getItem("userId");
  //   console.log("Stored User ID:", userId);  // Debugging
  // }, []);

  const handleShowForm = () => setShowForm(!showForm);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const userId = localStorage.getItem("userId");
    console.log("Sending User ID:", userId); // Retrieve user ID from localStorage
    if (!userId) {
      toast.error("User not logged in!");
      return;
    }

    const newExpense = { ...formData, amount: Number(formData.amount), userId };
    console.log("New Expense Data:", newExpense);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/addTransaction",
        newExpense
      );
      if (response.status === 201) {
        toast.success("Expense added successfully!");
        setShowForm(false);
        setFormData({
          date: "",
          title: "",
          amount: "",
          type: "Income",
          category: "",
        }); // Reset form
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(
        "Error adding expense:",
        error.response?.data || error.message
      );
      toast.error("Failed to add expense");
    }
  };
  // const samePage = () => {
  //   navigate("/dashboard");
  // };

  const handleDelete = async (transactionId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User not logged in!");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:4000/api/v1/deleteTransaction/${transactionId}`,
        {
          data: { userId },
        }
      );
      toast.success("Transaction deleted successfully!");

      // Update UI by removing the deleted transaction
      setTransactions(transactions.filter((txn) => txn._id !== transactionId));
    } catch (error) {
      console.error(
        "Error deleting transaction:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to delete transaction");
    }
  };

  return (
    <div className="p-3 mb-2 bg-secondary-subtle text-secondary-emphasis">
      <Header />
      <br />
      <div className="d-flex align-items-center gap-2">
        <Form.Select className="w-25 me-2">
          <option>Last Week</option>
          <option>Last Month</option>
        </Form.Select>

        <Form.Select className="w-25 me-2">
          <option>All</option>
          <option>Income</option>
          <option>Expense</option>
        </Form.Select>

        <Button variant="primary" className="me-2">
          Reset Filter
        </Button>
        <Button variant="primary" onClick={handleShowForm}>
          Add New
        </Button>
      </div>
      {showForm && (
        <div className="card p-3 mb-3 mx-auto" style={{ maxWidth: "400px" }}>
          <h6 className="text-center">Add New Expense</h6>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label className="small">Date</Form.Label>
              <Form.Control
                type="date"
                size="sm"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                size="sm"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small">Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small">Type</Form.Label>
              <Form.Select
                size="sm"
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
              >
                <option>Income</option>
                <option>Expense</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small">Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                size="sm"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="success" size="sm" onClick={handleSave}>
                Save
              </Button>
              <Button variant="danger" size="sm" onClick={handleShowForm}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      )}
      <div className="container mt-4 ">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((txn) => (
                <tr key={txn._id}>
                  <td>{new Date(txn.date).toLocaleDateString()}</td>
                  <td>{txn.title}</td>
                  <td>${txn.amount}</td>
                  <td>{txn.transactionType}</td>
                  <td>{txn.category}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(txn._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No Transactions Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

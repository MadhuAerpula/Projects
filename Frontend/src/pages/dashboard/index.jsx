import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header/Header";
import { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  //useEffect(() => { ... }, [location.state]); syntax of useEffect
  useEffect(() => {
    const message = localStorage.getItem("toastMessage");
    if (message) {
      toast.success(message);
      localStorage.removeItem("toastMessage"); // Show toast if a message exists
    }
  }, []);

  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => setShowForm(!showForm);
  const navigate = useNavigate();
  const samePage = () => {
    navigate("/dashboard");
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
              <Form.Control type="date" size="sm" />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small">Title</Form.Label>
              <Form.Control type="text" placeholder="Enter Title" size="sm" />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small">Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Amount"
                size="sm"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small">Type</Form.Label>
              <Form.Select size="sm">
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
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="success" size="sm" onClick={samePage}>
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
            <tr>
              <td>01/01/2025</td>
              <td>Salary</td>
              <td>$1000</td>
              <td>Income</td>
              <td>Work</td>
              <td>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;

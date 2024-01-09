import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
function HistoryAdmin() {
  const [history, setHistory] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getHis = () => {
    axios
      .get(`http://localhost:3001/api/v1/cart/history`)
      .then((res) => setHistory(res.data.history))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getHis();
  }, []);

  const handleStatus = (userId, orderId, currentStatus) => {
    let newStatus = "";
    if (currentStatus === "Delivery") {
      newStatus = "Accept";
    } else {
      newStatus = "Delivery";
    }
    axios
      .patch(`http://localhost:3001/api/v1/cart/status/${userId}`, {
        status: newStatus,
        userId: userId,
        orderId: orderId,
      })
      .then((res) => {
        getHis();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteHis = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3001/api/v1/cart/status/${id}`)
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              title: "Deleted!",
              text: "The product has been deleted.",
              icon: "success",
            });
            getHis();
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: "Error",
              text: "An error occurred while deleting the product.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleView = (userId, orderId) => {
    handleShow();
    axios
      .get(`http://localhost:3001/api/v1/cart/status/${orderId}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <HeaderAdmin />
      <h1>History Bill</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <span>Bill ID</span>
            </th>
            <th>Status</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h, i) => (
            <tr key={i}>
              <td>{h.orderId}</td>
              <td>
                {h.status === "Accept" ? (
                  <Button variant="outline-success">{h.status}</Button>
                ) : (
                  <Button
                    variant={
                      h.status === "Pending"
                        ? "outline-primary"
                        : h.status === "Delivery"
                        ? "outline-warning"
                        : "outline-success"
                    }
                    onClick={() => handleStatus(h.userId, h.orderId, h.status)}
                  >
                    {h.status}
                  </Button>
                )}
              </td>
              <td>{h.total}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleView(h.userId, h.orderId)}
                >
                  View
                </Button>
                {h.status !== "Accept" && (
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteHis(h.orderId)}
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>View Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HistoryAdmin;

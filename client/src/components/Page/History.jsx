import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
function History() {
  const [bill, setBill] = useState([]);
  const { userId } = JSON.parse(localStorage.getItem("user"));
  const baseUrl = "http://localhost:3001/api/v1";
  const [show2, setShow2] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const getData = () => {
    axios
      .get(`${baseUrl}/cart/history/${userId}`)
      .then((res) => {
        setBill(res.data.history);
      })
      .catch((err) => console.log(err));
  };
  const handleUpdateModal = (address, phone) => {
    handleShow2();
    setPhone(phone);
    setAddress(address);
  };

  const handleUpdateInfo = async () => {
    const phoneRegex = /^\d{10}$/;
    if (!phone.match(phoneRegex)) {
      toast.error("Phone number must be 10 digits.");
      return;
    }

    const newOrderInfo = {
      userId: userId,
      address: address,
      phone: phone,
    };
    try {
      const response = await axios.patch(
        `${baseUrl}/cart/history/${userId}`,
        newOrderInfo
      );
      toast.success("Update successfully");
      getData();
      handleClose2();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Header />
      <div
        style={{
          marginTop: "2em",
          border: "1px solid gray",
          borderRadius: "10px",
          borderBottom: "none",
          marginBottom: "2em",
        }}
      >
        {bill.map((b, i) => (
          <div
            key={i}
            style={{
              border: "1px solid gray",
              borderBottom: "none",
              display: "flex",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                paddingTop: "1em",
                marginLeft: "1em",
                width: "30%",
                borderRight: "1px solid black",
              }}
            >
              {i === 0 || b.orderId !== bill[i - 1].orderId ? (
                <div>
                  <p>
                    <b>BILL - ID : {b.orderId} &ensp;</b>
                    {b.status === "pending" && (
                      <Button
                        variant="outline-warning"
                        onClick={() => {
                          handleUpdateModal(b.address, b.phone);
                        }}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Button>
                    )}
                  </p>
                  <p>
                    <b>Phone: {b.phone}</b>
                  </p>
                  <p>
                    <b>Address: {b.address}</b>
                  </p>
                  <p>
                    <b>Status : {b.status}</b>
                  </p>
                  <p>
                    <b>Total: ${b.total}</b>
                  </p>
                </div>
              ) : null}
            </div>
            <div
              style={{
                paddingLeft: "10%",
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                borderBottom: "1px solid black",
              }}
            >
              <div
                style={{
                  width: "15em",
                  marginTop: "1em",
                }}
              >
                <p>
                  <b>Name : {b.title}</b>
                </p>
                <img
                  src={b.image}
                  alt={b.title}
                  style={{
                    width: "10em",
                    padding: "10px",
                    marginBottom: "5px",
                  }}
                />
              </div>
              <div style={{ marginTop: "1em" }}>
                <p>
                  <b>Price : ${b.price}</b>
                </p>
                <p>
                  <b>Quantity : {b.quantity}</b>
                </p>
              </div>
              <div style={{ marginTop: "1em" }}></div>
            </div>
          </div>
        ))}
      </div>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateInfo}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default History;

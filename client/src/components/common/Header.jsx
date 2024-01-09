import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Badge } from "antd";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
function Header({ status }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [favourites, setFavourites] = useState([]);
  const isLogin = localStorage.getItem("isLogin");
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState([]);
  const baseUrl = "http://localhost:3001/api/v1";
  const getCart = () => {
    axios
      .get(`${baseUrl}/cart/${user.userId}:`)
      .then((res) => setCart(res.data.cart))
      .catch((err) => console.log(err));
  };
  const getFavourite = () => {
    axios
      .get(`${baseUrl}/favourites/${user.userId}`)
      .then((res) => setFavourites(res.data.cart))
      .catch((err) => console.log(err));
  };
  const [totalPrice, setTotalPrice] = useState(0);
  const calculateTotalPrice = () => {
    let total = 0;
    for (const c of cart) {
      total += c.price * c.quantity;
    }
    return total;
  };
  const [totalPrice2, setTotalPrice2] = useState(0);
  const calculateTotalPrice2 = () => {
    let total = 0;
    for (const f of favourites) {
      total += f.price * f.quantity;
    }
    return total;
  };
  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    window.href.reload();
  };
  const handleUpdate = (quantity, productId, userId) => {
    if (parseInt(quantity) > 0) {
      const newUpdate = {
        productId: productId,
        userId: userId,
        quantity: quantity,
      };
      try {
        axios
          .post(`${baseUrl}/cart/update`, newUpdate)
          .then((res) => getCart())
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = (cartId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be removed from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${baseUrl}/cart/${cartId}`)
          .then((res) => {
            console.log(res.data);
            Swal.fire(
              "Deleted!",
              "The product has been removed from your cart.",
              "success"
            );
            getCart();
          })
          .catch((error) => {
            console.error(error);
            Swal.fire(
              "Error",
              "An error occurred while trying to remove the product.",
              "error"
            );
          });
      }
    });
  };
  const handleUpdateFavourites = (quantity, productId, userId) => {
    if (parseInt(quantity) > 0) {
      const newUpdate = {
        productId: productId,
        userId: userId,
        quantity: quantity,
      };
      try {
        axios
          .post(`${baseUrl}/favourites/update`, newUpdate)
          .then((res) => getFavourite())
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleDeleteFavourites = (favouritesId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be removed from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${baseUrl}/favourites/${favouritesId}`)
          .then((res) => {
            console.log(res.data);
            Swal.fire(
              "Deleted!",
              "The product has been removed from your cart.",
              "success"
            );
            getFavourite();
          })
          .catch((error) => {
            console.error(error);
            Swal.fire(
              "Error",
              "An error occurred while trying to remove the product.",
              "error"
            );
          });
      }
    });
  };
  const handleOrder = () => {
    handleClose2();
    if (cart.length === 0) {
      toast.error("Cannot place an order without items in the cart.");
      return;
    }

    if (phone && address) {
      const phoneRegex = /^\d{10}$/;
      if (!phone.match(phoneRegex)) {
        toast.error("Phone number must be 10 digits.");
        return;
      }

      const orderData = {
        userId: +user.userId,
        address: address,
        phone: phone,
      };

      axios
        .post(`${baseUrl}/cart/order`, orderData)
        .then((res) => {
          setPhone("");
          setAddress("");
          toast.success("Order successfully, waiting for order confirmation");
          getCart();
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Phone and address must have values.");
    }
  };

  const handleModalFavourites = () => {
    handleShow3();
  };
  useEffect(() => {
    if (user) {
      getCart();
      getFavourite();
    }
  }, [status]);

  useEffect(() => {
    if (cart.length > 0) {
      const total = calculateTotalPrice();
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  useEffect(() => {
    if (favourites.length > 0) {
      const total = calculateTotalPrice2();
      setTotalPrice2(total);
    } else {
      setTotalPrice2(0);
    }
  }, [favourites]);
  return (
    <div>
      <header className="header_section">
        <nav className="navbar2 navbar-expand-lg custom_nav-container ">
          <div className="user_option" style={{ marginLeft: "44.5%" }}>
            <NavLink to="/" className="navbar-brand">
              <img
                src="/images/hatrn.png"
                style={{ width: "12rem", height: "10rem" }}
              />
            </NavLink>
            <div>
              {isLogin ? (
                <>
                  <NavLink to={`/history/${user.userId}`}>
                    <span style={{ cursor: "pointer" }}>
                      {user.username} &ensp;
                    </span>
                  </NavLink>

                  <NavLink to="/" onClick={handleLogout}>
                    <i
                      className="fa fa-right-from-bracket"
                      aria-hidden="true"
                    />
                    <span>Logout</span>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/login">
                    <i className="fa fa-user" aria-hidden="true" />
                    <span>Login</span>
                  </NavLink>
                  <NavLink to="/register">
                    <i className="fa fa-user-plus" aria-hidden="true" />
                    <span>Register</span>
                  </NavLink>
                </>
              )}

              <Badge count={cart.length} offset={[8]} onClick={handleShow}>
                <span className="ant-scroll-number-only">
                  <i
                    className="fa fa-shopping-bag"
                    aria-hidden="true"
                    style={{ fontSize: "20px" }}
                  />
                </span>
              </Badge>
              <Badge count={favourites.length} offset={[10]}>
                <span className="ant-scroll-number-only">
                  <i
                    onClick={handleModalFavourites}
                    class="fa-regular fa-heart"
                    aria-hidden="true"
                    style={{ fontSize: "20px", marginLeft: "1em" }}
                  ></i>
                </span>
              </Badge>
            </div>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ">
              <li
                className={`nav-item ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                <NavLink className="nav-link" to="/">
                  <b>Home</b> <span className="sr-only"></span>
                </NavLink>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/shop" ? "active" : ""
                }`}
              >
                <NavLink className="nav-link" to="/shop">
                  <b>Shop</b>
                </NavLink>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/whyus" ? "active" : ""
                }`}
              >
                <NavLink className="nav-link" to="/whyus">
                  <b>Why Us</b>
                </NavLink>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/testimonial" ? "active" : ""
                }`}
              >
                <NavLink className="nav-link" to="/testimonial">
                  <b>Testimonial</b>
                </NavLink>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/contact" ? "active" : ""
                }`}
              >
                <NavLink className="nav-link" to="/contact">
                  <b>Contact Us</b>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Backpage</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {cart.map((c, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  border: "1px solid black",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  position: "relative",
                }}
              >
                <i
                  onClick={() => handleDelete(c.cartId)}
                  class="fa-solid fa-xmark"
                  style={{
                    fontSize: "1.5em",
                    cursor: "pointer",
                    position: "absolute",
                    right: "2%",
                  }}
                ></i>
                <div>
                  <img
                    src={c.image}
                    style={{ width: "8em", marginBottom: "2em" }}
                  ></img>
                </div>
                <div>
                  <p style={{ fontWeight: "bold" }}>{c.title}</p>
                  <p style={{ fontWeight: "bold" }}>{c.price * c.quantity}$</p>
                  <input
                    style={{ borderRadius: "10px" }}
                    value={c.quantity}
                    type="number"
                    onChange={(e) =>
                      handleUpdate(e.target.value, c.productId, c.userId)
                    }
                  ></input>
                </div>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                Total: {totalPrice.toFixed(2)}$
              </p>
              <Button
                variant="primary"
                style={{
                  width: "60%",
                  fontSize: "2em",
                  backgroundColor: "#ffb0bd",
                  border: "none",
                }}
                onClick={() => handleShow2()}
              >
                Check Out
              </Button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Order </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleOrder}>
              Order
            </Button>
          </Modal.Footer>
        </Modal>
        <Offcanvas show={show3} onHide={handleClose3} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Favourites</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {favourites.map((c, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  border: "1px solid black",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  position: "relative",
                }}
              >
                <i
                  onClick={() => handleDeleteFavourites(c.favouritesId)}
                  class="fa-solid fa-xmark"
                  style={{
                    fontSize: "1.5em",
                    cursor: "pointer",
                    position: "absolute",
                    right: "2%",
                  }}
                ></i>
                <div>
                  <img
                    src={c.image}
                    style={{ width: "8em", marginBottom: "2em" }}
                  ></img>
                </div>
                <div>
                  <p style={{ fontWeight: "bold" }}>{c.title}</p>
                  <p style={{ fontWeight: "bold" }}>{c.price * c.quantity}$</p>
                  <input
                    style={{ borderRadius: "10px" }}
                    value={c.quantity}
                    type="number"
                    onChange={(e) =>
                      handleUpdateFavourites(
                        e.target.value,
                        c.productId,
                        c.userId
                      )
                    }
                  ></input>
                </div>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                Total: {totalPrice2.toFixed(2)}$
              </p>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
        <ToastContainer></ToastContainer>
      </header>
    </div>
  );
}

export default Header;

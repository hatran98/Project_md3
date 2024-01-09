import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
function HeaderAdmin() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        <i class="fa-solid fa-bars"></i>
      </Button>

      <Offcanvas show={show} onHide={handleClose} style={{ width: "15%" }}>
        <Offcanvas.Header closeButton>
          <NavLink
            to="/dashboard"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Offcanvas.Title>Dashboard</Offcanvas.Title>
          </NavLink>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <NavLink to="/admin/users">
            <Button
              variant="dark"
              style={{ width: "100%", marginBottom: "10px" }}
            >
              Users
            </Button>
          </NavLink>
          <NavLink to="/admin/product">
            <Button
              variant="dark"
              style={{ width: "100%", marginBottom: "10px" }}
            >
              Products
            </Button>
          </NavLink>
          <NavLink to="/admin/history">
            <Button variant="dark" style={{ width: "100%" }}>
              History
            </Button>
          </NavLink>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default HeaderAdmin;

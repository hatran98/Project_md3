import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";
function Dashboard() {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("Admin");
  useEffect(() => {
    if (!adminToken) {
      navigate("/login-admin");
    }
  }, []);

  return (
    <div>
      <HeaderAdmin />
      <div className="row">
        <h1>Đây là DashBoard</h1>
      </div>
    </div>
  );
}

export default Dashboard;

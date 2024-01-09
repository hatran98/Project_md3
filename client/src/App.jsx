import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Page/Homepage";
import Shop from "./components/Page/Shop";
import WhyUs from "./components/Page/WhyUs";
import Testimonial from "./components/Page/Testimonial";
import ContactUs from "./components/Page/ContactUs";
import Register from "./components/AccountUser/Register";
import Login from "./components/AccountUser/Login";
import Detail from "./components/Page/Detail";
import History from "./components/Page/History";
import LoginAdmin from "./components/Admin/LoginAdmin";
import Dashboard from "./components/Admin/Dashboard";
import UsersAdmin from "./components/Admin/UsersAdmin";
import ProductAdmin from "./components/Admin/ProductAdmin";
import HistoryAdmin from "./components/Admin/HistoryAdmin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/shop" element={<Shop></Shop>}></Route>
        <Route path="/whyus" element={<WhyUs />}></Route>
        <Route path="/testimonial" element={<Testimonial />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/product/:id" element={<Detail />}></Route>
        <Route path="/history/:id" element={<History />}></Route>
        <Route path="/login-admin" element={<LoginAdmin />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/admin/users" element={<UsersAdmin />}></Route>
        <Route path="/admin/product" element={<ProductAdmin />}></Route>
        <Route path="/admin/history" element={<HistoryAdmin />}></Route>
      </Routes>
    </>
  );
}

export default App;

import React from "react";
import { Button, Form, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import axios from "axios";
import Swal from "sweetalert2";
function Login() {
  const navigate = useNavigate();
  const baseURL = "http://localhost:3001/api/v1";
  const onFinish = async (values) => {
    try {
      const newUser = {
        email: values.email,
        password: values.password,
      };
      await axios
        .post(`${baseURL}/auth/login`, newUser)
        .then((res) => {
          if (res.data.message === "Sign in successfully") {
            const user = res.data.rows[0];
            if (user.block === 1) {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Your account is blocked. Please contact support for assistance.",
                timer: 2000,
              });
            } else {
              localStorage.setItem("isLogin", res.data.access_token);
              localStorage.setItem("user", JSON.stringify(user));
              Swal.fire({
                icon: "success",
                title: "Good Job",
                text: res.data.message,
                timer: 1000,
              });
              navigate("/");
            }
          } else {
            if (
              res.data.message === "Password is incorrect" ||
              res.data.message === "User not found"
            ) {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: res.data.message,
                timer: 1000,
              });
            }
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Header></Header>
      <Form
        className="container"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          marginTop: "2em",
          marginRight: "48em",
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="ant-form-item-control" style={{ marginLeft: "15rem" }}>
          <img
            src="./public/images/loginlogo.png"
            alt="Login Logo"
            style={{ width: "18em", marginBottom: "1em" }}
          />
          <h5 style={{ marginBottom: "1em" }}>
            &ensp;&ensp; YOUR ACCOUNT FOR <br></br>EVERYTHING MR.HÀ SHOP
          </h5>
        </div>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <div>
            <p className="ant-form-text">
              Not a member?{" "}
              <NavLink to="/register" style={{ color: "black" }}>
                Register
              </NavLink>
            </p>
          </div>

          <Button
            type="primary"
            style={{ backgroundColor: "#ffb0bd", color: "black" }}
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
      <Footer></Footer>
    </div>
  );
}

export default Login;

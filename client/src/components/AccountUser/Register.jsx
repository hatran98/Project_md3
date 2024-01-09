import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import Header from "../common/Header";
import Footer from "../common/Footer";
import axios from "axios";
import Swal from "sweetalert2";
function Register() {
  const navigate = useNavigate();
  const baseURL = "http://localhost:3001/api/v1";

  const onFinish = async (values) => {
    if (values.password !== values.confirmpassword) {
      throw new Error("Confirmed password does not match the password.");
    }
    try {
      const newUser = {
        username: values.username,
        email: values.email,
        password: values.password,
        address: values.address || null,
      };
      await axios
        .post(`${baseURL}/auth/register`, newUser)
        .then((res) => {
          if (res.data.message == "Register successfully") {
            Swal.fire({
              icon: "success",
              title: "Good job",
              text: res.data.message,
              timer: 1500,
            });
            navigate("/login");
          } else {
            if (res.data.error.errno == 1062)
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Email already exists",
              });
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const validateUsername = (_, value) => {
    const usernameRegex = /^[a-zA-Z0-9_]{8,}$/;
    if (!usernameRegex.test(value)) {
      return Promise.reject(
        "Username must be at least 8 characters long and can only contain letters, numbers, and underscores."
      );
    }

    return Promise.resolve();
  };

  const validatePassword = (_, value) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!regex.test(value)) {
      return Promise.reject(
        "Password must be at least 8 characters long, start with a letter, and contain at least one uppercase letter, one lowercase letter, and one digit."
      );
    }

    return Promise.resolve();
  };

  const validateEmail = (_, value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;

    if (!emailRegex.test(value)) {
      return Promise.reject("Please enter a valid Gmail email address.");
    }

    return Promise.resolve();
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
          marginRight: "49em",
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="ant-form-item" style={{ marginLeft: "12rem" }}>
          <img
            src="./public/images/registerlogo.png"
            alt="Register Logo"
            style={{ width: "23rem", height: "15rem" }}
          />
          <p
            className="ant-typography registration-text"
            style={{ color: "#A9A9A9", textAlign: "center", fontSize: "13px" }}
          >
            &ensp;&ensp; Create your Mr.Hà Shop Member profile and get first
            access to the very best of Mr.Hà products, inspiration and
            community.
          </p>
        </div>

        <Form.Item
          label="Username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            {
              validator: validateUsername,
            },
          ]}
          name="username"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
            {
              validator: validateEmail,
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
            {
              validator: validatePassword,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmpassword"
          rules={[
            {
              required: true,
              message: "Please input your Confirm Password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Confirmed password does not match the password.")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <div>
            <p className="ant-form-text">
              Already have an account?{" "}
              <NavLink to="/login" style={{ color: "black" }}>
                Login
              </NavLink>
            </p>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#ffb0bd", color: "black" }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      <Footer />
    </div>
  );
}

export default Register;

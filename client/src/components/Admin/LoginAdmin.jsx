import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Form, Input } from "antd";
import axios from "axios";
function LoginAdmin() {
  const navigate = useNavigate();
  const baseURL = "http://localhost:3001/api/v1";
  useEffect(() => {
    const adminToken = localStorage.getItem("Admin");
    if (adminToken) {
      navigate("/dashboard");
    }
  }, []);
  const onFinish = async (values) => {
    try {
      const newUser = {
        email: values.email,
        password: values.password,
      };
      await axios
        .post(`${baseURL}/auth/login`, newUser)
        .then((res) => {
          if (res.data.message == "Sign in successfully") {
            const user = res.data.rows[0];
            if (user.roles === 1) {
              localStorage.setItem("Admin", res.data.access_token);
              Swal.fire({
                icon: "success",
                title: "Good Job",
                text: res.data.message,
                timer: 1000,
              });
              navigate("/dashboard");
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error",
                timer: 1000,
              });
            }
          } else {
            if (res.data.message == "Password is incorrect") {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: res.data.message,
                timer: 1000,
              });
            } else if (res.data.message == "User not found") {
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
    <div style={{ display: "flex" }}>
      <div>
        <img
          src="https://images.pexels.com/photos/1264919/pexels-photo-1264919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          style={{ height: "100vh", width: "100vh" }}
        ></img>
      </div>
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
          paddingRight: "5em",
          maxWidth: 1000,
          border: "1px solid ",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <img
          src="https://c.pxhere.com/images/5e/ec/e45447b3795067dcd163285f4850-1437977.jpg!d"
          style={{
            width: "50%",
            marginLeft: "35%",
            marginTop: "10%",
            marginBottom: "10%",
            borderRadius: "10px",
          }}
        ></img>
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
          <Button
            type="primary"
            style={{ backgroundColor: "#ffb0bd", color: "black" }}
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginAdmin;

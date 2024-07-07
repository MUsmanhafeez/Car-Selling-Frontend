import React, { useState } from "react";
import { Form, Input, Button, Typography, Row, Col } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { login } from "../api/auth";
import toast from "react-hot-toast";
import { SyncLoader } from "react-spinners";

const Login = () => {
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (values) => {
    const { email, password } = values;
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    let details = {
      email,
      password,
    };
    try {
      setLoading(true); // Set loading state to true
      const response = await login(details);
      if (response.token) {
        localStorage.setItem("token", response.token);
        toast.success(response.message);
        // Redirect to submit-car page
        window.location.href = "/car";
      } else {
        toast.error(response.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("An unexpected error occurred during login");
      console.error("Error during login:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      {loading ? (
        <div className="loader-style">
          <div className="text-center my-5">
            <SyncLoader color="#1677ff" />
          </div>
        </div>
      ) : (
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
          <Col xs={24} sm={20} md={16} lg={12} xl={10}>
            <Typography.Title level={2} align="center">
              Login
            </Typography.Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleLogin}
              initialValues={{ remember: true }}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input.Password
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  visibilityToggle
                  onClick={() => setShowPassword(!showPassword)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Login;

// demo auth component
"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  Tabs,
  Form,
  Input,
  Checkbox,
  Typography,
  Alert,
  notification,
} from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";

const { Title, Text } = Typography;

export default function Page() {
  const [registerForm] = Form.useForm();
  const [loginForm] = Form.useForm();

  const [activeTab, setActiveTab] = useState("login");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const router = useRouter();

  // onclick login navigate to dashboard
  const handleLogin = async () => {
    router.push("/dashboard", { scroll: false });
  };

  type User = {
    email: string;
    username?: string;
    password: string;
    notifications?: number;
  };

  const onFinishlogin = (values: User) => {
    const { email, password } = values;

    const baseUrl = "http://localhost:5000/api/v1/auth";
    const url = `${baseUrl}/login`;
    const data = { email, password };

    const login = async (data: { email: string; password: string }) => {
      try {
        setLoginLoading(true);
        setLoginError("");
        const response = await axios.post(url, data);
        if (response.status === 200) {
          setLoginLoading(false);
          // store the token in local storage and the user
          localStorage.setItem("token", response.data.authToken);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          notification.success({
            message: "Successfully logged in!",
            description: "You will be redirected to the dashboard.",
          });
          loginForm.resetFields();
          handleLogin();
        } else {
          setLoginError("An error occurred.");
          setLoginLoading(false);
        }
      } catch (error: any) {
        setLoginError(
          error.response?.data?.error || error.message || "An error occurred."
        );
        notification.error({
          message: "An error occurred",
          description:
            error.response?.data?.error ||
            error.message ||
            "An error occurred.",
        });
        setLoginLoading(false);
      }
    };

    login(data);
  };

  const onFinishregister = (values: User) => {
    const { email, password } = values;

    const baseUrl = "http://localhost:5000/api/v1/auth";
    const url = `${baseUrl}/register`;
    const data = { email, password };

    const register = async (data: { email: string; password: string }) => {
      try {
        setRegisterLoading(true);
        setRegisterError("");
        const response = await axios.post(url, data);
        if (response.status === 201) {
          setRegisterLoading(false);
          notification.success({
            message: "Successfully registered!",
            description: "You can now login.",
          });
          registerForm.resetFields();
          setActiveTab("login");
        } else {
          setRegisterError("An error occurred.");
          setRegisterLoading(false);
        }
      } catch (error: any) {
        setRegisterError(
          error.response?.data?.error || error.message || "An error occurred."
        );
        notification.error({
          message: "An error occurred",
          description:
            error.response?.data?.error ||
            error.message ||
            "An error occurred.",
        });
        setRegisterLoading(false);
      }
    };

    register(data);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      {/* nice intro message */}
      <Card style={{ width: "100%", marginBottom: 20, border: "none" }}>
        <Title level={1}>Welcome to cryptallion</Title>
        <Text>
          Cryptallion is a platform for managing your cryptocurrencies and
          transactions.
        </Text>
      </Card>
      <Card style={{ width: "100%" }}>
        {activeTab === "register" && registerError && (
          <Alert
            message={registerError}
            type="error"
            showIcon
            closable
            style={{ marginBottom: "1rem" }}
          />
        )}
        {activeTab === "login" && loginError && (
          <Alert
            message={loginError}
            type="error"
            showIcon
            closable
            style={{ marginBottom: "1rem" }}
          />
        )}
        <Tabs
          defaultActiveKey="login"
          activeKey={activeTab}
          onChange={setActiveTab}
        >
          <Tabs.TabPane tab="Login" key="login">
            <Form
              name="login"
              initialValues={{ remember: true }}
              layout="vertical"
              onFinish={onFinishlogin}
              form={loginForm}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                loading={loginLoading}
              >
                Login
              </Button>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Register" key="register">
            <Form
              name="register"
              initialValues={{ remember: true }}
              layout="vertical"
              onFinish={onFinishregister}
              form={registerForm}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                loading={registerLoading}
              >
                Register
              </Button>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

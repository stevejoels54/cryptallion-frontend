// demo auth component
"use client";

import React from "react";
import { Button, Card, Tabs, Form, Input, Checkbox, Typography } from "antd";
import { useRouter } from "next/navigation";
// import { useAuth } from "@/hooks/useAuth";

const { Title, Text } = Typography;

export default function Page() {
  //   const { login, logout, user } = useAuth();

  const router = useRouter();

  // onclick login navigate to dashboard
  const handleLogin = async () => {
    router.push("/dashboard", { scroll: false });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh",
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
        <Tabs defaultActiveKey="login">
          <Tabs.TabPane tab="Login" key="login">
            <Form
              name="login"
              initialValues={{ remember: true }}
              layout="vertical"
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  { required: true, message: "Please input your username!" },
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
              <Button type="primary" block onClick={handleLogin}>
                Login
              </Button>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Register" key="register">
            <Form
              name="register"
              initialValues={{ remember: true }}
              layout="vertical"
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
            >
              {/* <Form.Item
                name="username"
                label="Username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item> */}

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
              <Button type="primary" block>
                Register
              </Button>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

"use client";

import React from "react";
import { Typography, Avatar, List } from "antd";
import Image from "next/image";
import { FcComboChart, FcLock, FcBarChart } from "react-icons/fc";

const { Title, Text } = Typography;

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="auth-layout">
      <section className="intro-column">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            src="/images/logo.png"
            size={200}
            style={{ marginBottom: "1rem" }}
          />
        </div>
        <Title level={1}>Unlock Your Crypto Potential</Title>
        <Text>
          Track your crypto investments effortlessly and make informed decisions
          with Cryptallion powerful features.
        </Text>
        <List
          itemLayout="horizontal"
          style={{ marginTop: "1rem" }}
          dataSource={[
            {
              icon: <FcComboChart />,
              content: "Track real-time market data and visualize performance",
            },
            {
              icon: <FcLock />,
              content:
                "Securely manage your portfolio with advanced encryption",
            },
            {
              icon: <FcBarChart />,
              content: "Analyze trends and make informed investment decisions",
            },
          ]}
          renderItem={(item) => (
            <List.Item key={item.content}>
              <List.Item.Meta avatar={item.icon} />
              <Text>{item.content}</Text>
            </List.Item>
          )}
        />
      </section>
      <section className="auth-form">{children}</section>
    </div>
  );
};

export default AuthLayout;

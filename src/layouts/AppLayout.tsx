"use client";

import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { FcBarChart } from "react-icons/fc";
import { FcMoneyTransfer } from "react-icons/fc";
import { FcBriefcase } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import { FcSettings } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import {
  Layout,
  Menu,
  Button,
  theme,
  Typography,
  Avatar,
  Breadcrumb,
} from "antd";
import { useRouter, usePathname } from "next/navigation";
import ProfileAvatar from "@/components/header/ProfileAvatar";
import Image from "next/image";

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

type AppLayoutProps = {
  children: React.ReactNode;
  activeMenu?: string;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children, activeMenu }) => {
  const router = useRouter();
  const pathname = usePathname();

  // function that takes in pathname, removes the starting "/" and capitalizes the first letter
  function formatPathname(pathname: string) {
    return pathname.charAt(1).toUpperCase() + pathname.slice(2);
  }

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div style={{ height: "100vh" }} className="flex">
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ background: colorBgContainer, maxHeight: "100%" }}
        >
          <div
            className="demo-logo-vertical"
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "16px",
            }}
            onClick={() => router.push("/", { scroll: false })}
          >
            <Image
              src="/images/logo.png" // Route of the image file
              height={100} // Desired size with correct aspect ratio
              width={100} // Desired size with correct aspect ratio
              alt="Cryptallion Logo"
              style={{ cursor: "pointer" }}
            />
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            selectedKeys={[activeMenu || "1"]}
            items={[
              {
                key: "1",
                icon: <FcBarChart />,
                label: "Dashboard",
                onClick: () => {
                  router.push("/dashboard", { scroll: false });
                },
              },
              {
                key: "2",
                icon: <FcMoneyTransfer />,
                label: "Transactions",
                onClick: () => {
                  router.push("/transactions", { scroll: false });
                },
              },
              {
                key: "3",
                icon: <FcBriefcase />,
                label: "Portfolio",
                onClick: () => {
                  router.push("/portfolio", { scroll: false });
                },
              },
              {
                key: "4",
                icon: <FcCurrencyExchange />,
                label: "Cryptocurrencies",
                onClick: () => {
                  router.push("/cryptocurrencies", { scroll: false });
                },
              },
              {
                key: "5",
                icon: <FcSettings />,
                label: "Settings",
                onClick: () => {
                  router.push("/settings", { scroll: false });
                },
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 5,
              background: colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <FcNext /> : <FcPrevious />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <ProfileAvatar notifications={5} />
          </Header>
          <Breadcrumb style={{ margin: "16px", cursor: "pointer" }}>
            <Breadcrumb.Item
              onClick={() => {
                router.push("/", { scroll: false });
              }}
            >
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>{formatPathname(pathname)}</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
          {/* <Footer style={{ textAlign: "center" }}>
            <Title level={5}>
              Cryptallion ©2024 Created by Cryptallion Team
            </Title>
          </Footer> */}
        </Layout>
      </Layout>
    </div>
  );
};

export default AppLayout;

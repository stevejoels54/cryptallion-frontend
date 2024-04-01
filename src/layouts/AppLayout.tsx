"use client";

import React, { useState, memo } from "react";
import { FcBarChart } from "react-icons/fc";
import { FcMoneyTransfer } from "react-icons/fc";
import { FcBriefcase } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import { FcSettings } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import { FcMenu } from "react-icons/fc";
import {
  Layout,
  Menu,
  Button,
  theme,
  Typography,
  Avatar,
  Breadcrumb,
  Grid,
  Drawer,
  Space,
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

const { useBreakpoint } = Grid;

const MenuComponent: React.FC<{
  items: {
    key: string;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }[];

  activeMenu?: string;
}> = ({ items, activeMenu }) => {
  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={["1"]}
      selectedKeys={[activeMenu || "1"]}
    >
      {items.map((item) => (
        <Menu.Item
          key={item.key}
          icon={item.icon}
          onClick={item.onClick}
          style={{ cursor: "pointer" }}
        >
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );
};

const AppLayout: React.FC<AppLayoutProps> = ({ children, activeMenu }) => {
  const router = useRouter();
  const pathname = usePathname();

  const screens = useBreakpoint();

  const menuItems = [
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
  ];

  // function that takes in pathname, removes the starting "/" and capitalizes the first letter
  function formatPathname(pathname: string) {
    return pathname.charAt(1).toUpperCase() + pathname.slice(2);
  }

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div style={{ height: "100vh", width: "100vw" }} className="flex">
      <Layout>
        {screens.xs ? (
          <Drawer
            title="Cryptallion"
            placement="left"
            closable={false}
            onClose={() => setCollapsed(false)}
            open={collapsed}
            key="left"
            style={{
              background: colorBgContainer,
              padding: 0,
            }}
          >
            <MenuComponent items={menuItems} activeMenu={activeMenu} />
          </Drawer>
        ) : (
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
              background: colorBgContainer,
            }}
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
                priority
              />
            </div>
            <MenuComponent items={menuItems} activeMenu={activeMenu} />
          </Sider>
        )}
        <Layout>
          <Header
            style={{
              background: colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {
              // if screens.xs is true, show the FcMenu icon, else show the Cryptallion logo
              screens.xs ? (
                <Space>
                  <Button
                    type="text"
                    icon={<FcMenu />}
                    onClick={() => setCollapsed(!collapsed)}
                    className="cursor-pointer"
                    size="large"
                  />
                  <Avatar
                    src="/images/logo.png"
                    // size="large"
                    size={60}
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push("/", { scroll: false })}
                  />
                </Space>
              ) : (
                <Button
                  type="text"
                  icon={collapsed ? <FcNext /> : <FcPrevious />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                  className="cursor-pointer"
                />
              )
            }
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
              overflow: "auto",
              maxWidth: "95vw",
            }}
          >
            <Title level={2} style={{ textAlign: "center" }}>
              {formatPathname(pathname)}
            </Title>
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default memo(AppLayout);

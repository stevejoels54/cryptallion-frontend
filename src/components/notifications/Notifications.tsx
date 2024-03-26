// notification component that takes in a message, type and icon
import React from "react";
import { Alert, Space, Button } from "antd";

interface notification {
  message: string;
  description?: string;
  type: "success" | "info" | "warning" | "error";
  icon?: React.ReactNode;
}

export default function Notifications() {
  // demo array of notifications
  const notifications: notification[] = [
    {
      message: `You have 2 new notifications`,
      type: "info",
    },
    {
      message: `Your account was logged into from a new device`,
      type: "warning",
    },
    {
      message: `Your bitcoin transaction was successful`,
      description: "You have received 0.0001 BTC",
      type: "success",
    },
    {
      message: `Your bitcoin transaction was non successful`,
      description: "You have lost 0.0001 BTC",
      type: "error",
    },
  ];

  return (
    <div>
      {notifications.map((notification, index) => (
        <Alert
          key={index}
          message={notification.message}
          description={notification.description}
          type={notification.type}
          showIcon
          icon={notification.icon || null}
          style={{ marginBottom: "5px" }}
          // action={
          //   <Space direction="vertical">
          //     <Button size="small" type="primary">
          //       Mark as Read
          //     </Button>
          //     <Button size="small" danger ghost>
          //       Delete
          //     </Button>
          //   </Space>
          // }
        />
      ))}
    </div>
  );
}

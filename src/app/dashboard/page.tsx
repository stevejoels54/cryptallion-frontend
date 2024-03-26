"use client";

import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

export default function Page() {
  return (
    <div>
      <Title level={1}>Dashboard</Title>
      <p>This is the dashboard page content.</p>
    </div>
  );
}

"use client";

import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

export default function Page() {
  return (
    <div>
      <Title level={1}>Transactions</Title>
      <p>This is the transactions page content.</p>
    </div>
  );
}

"use client";

import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

export default function Page() {
  return (
    <div>
      <Title level={1}>Cryptocurrencies</Title>
      <p>This is the cryptocurrencies page content.</p>
    </div>
  );
}

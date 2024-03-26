"use client";

import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

export default function Page() {
  return (
    <div>
      <Title level={2}>Profile</Title>
      <p>This is the profile page content.</p>
    </div>
  );
}

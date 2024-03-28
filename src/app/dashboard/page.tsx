"use client";

import React, { memo, useState, useEffect, use } from "react";
import { Typography, notification } from "antd";

const { Title } = Typography;

function Page() {
  return (
    <div>
      <Title level={1}>Dashboard</Title>
      <p>This is the dashboard page content.</p>
    </div>
  );
}

export default memo(Page);

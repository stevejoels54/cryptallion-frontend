"use client";

import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Data = {
  month: string;
  buy: number;
  sell: number;
  transfer: number;
};

type BarChartProps = {
  data: Data[];
};

const BarChartPlot = ({ data }: BarChartProps) => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={730} height={250} data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="buy" fill="#73d13d" />
          <Bar dataKey="sell" fill="#ff4d4f" />
          <Bar dataKey="transfer" fill="#4096ff" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BarChartPlot;

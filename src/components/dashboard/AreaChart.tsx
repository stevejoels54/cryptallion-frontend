"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Data = {
  year: string;
  buy: number;
  sell: number;
  transfer: number;
};

type AreaChartProps = {
  data: Data[];
};

const AreaChartPlot = ({ data }: AreaChartProps) => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorBv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#389e0d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#389e0d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#cf1322" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#cf1322" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorTv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0958d9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0958d9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="buy"
            stroke="#389e0d"
            fillOpacity={1}
            fill="url(#colorBv)"
          />
          <Area
            type="monotone"
            dataKey="sell"
            stroke="#cf1322"
            fillOpacity={1}
            fill="url(#colorSv)"
          />
          <Area
            type="monotone"
            dataKey="transfer"
            stroke="#0958d9"
            fillOpacity={1}
            fill="url(#colorTv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default AreaChartPlot;

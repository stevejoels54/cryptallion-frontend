"use client";

import React from "react";
import {
  RadarChart,
  Radar,
  PolarAngleAxis,
  PolarGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Data = {
  day: string;
  transactions: number;
};

type RadarChartProps = {
  data: Data[];
};

const RadarChartPlot = ({ data }: RadarChartProps) => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius={90} width={730} height={250} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="day" />
          <Radar
            name="Transactions"
            dataKey="transactions"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Legend />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
};

export default RadarChartPlot;

"use client";

import React, { memo } from "react";
import { Typography, Spin } from "antd";
import AreaChartPlot from "@/components/dashboard/AreaChart";
import BarChartPlot from "@/components/dashboard/BarChart";
import PieChartPlot from "@/components/dashboard/PieChart";
import LineChartPlot from "@/components/dashboard/LineChart";
import RadarChartPlot from "@/components/dashboard/RadarChart";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Page = () => {
  type ResponseData = {
    message: string;
    yearlyData: {
      year: string;
      buy: number;
      sell: number;
      transfer: number;
    }[];
    monthlyData: {
      month: string;
      buy: number;
      sell: number;
      transfer: number;
    }[];
    lineChartData: {
      week: string;
      buy: number;
      sell: number;
      transfer: number;
    }[];
    dailyData: {
      day: string;
      transactions: number;
    }[];
    pieChartData: {
      symbol: string;
      amount: number;
    }[];
    totals: {
      buy: number;
      sell: number;
      transfer: number;
    };
  };

  const { isLoading, isError, data, error } = useQuery<ResponseData>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await axios.get(
        "https://cryptallion-backend-alx.vercel.app/api/v1/dashboard",
        {
          headers: {
            "X-Token": localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    },
  });

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <Spin />
        </div>
      )}
      <section>
        <div className="flex m-4 gap-2">
          <div className="flex-1 px-2 justify-center w-16 bg-white shadow-lg rounded h-300px">
            <div className="">
              <p className="text-gray-900 font-bold">Total returns</p>
              <p className="py-4 font-bold">
                $ {data?.totals.buy.toLocaleString()}{" "}
              </p>
              <p className="text-green-300">+11.5%</p>
            </div>
          </div>
          <div className="flex-1 px-2 justify-center w-16 bg-white shadow-lg rounded max-h-300px">
            <div className="">
              <p className="text-gray-900 font-bold">Total sales</p>
              <p className="py-4 font-bold">
                $ {data?.totals.sell.toLocaleString()}{" "}
              </p>
              <p className="text-green-300">+21.2%</p>
            </div>
          </div>
          <div className="flex-1 px-2 justify-center w-16  bg-white shadow-lg rounded max-h-300px">
            <div className="">
              <p className="text-gray-900 font-bold">Total transfers</p>
              <p className="py-4 font-bold">
                $ {data?.totals.transfer.toLocaleString()}{" "}
              </p>
              <p className="text-green-300">+2.4%</p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex my-4 px-4 gap-3">
        <div className="w-1/2 h-[300px] bg-white shadow-lg rounded">
          <AreaChartPlot data={data?.yearlyData || []} />
        </div>

        <div className="w-1/2 h-[300px] bg-white shadow-lg rounded">
          <BarChartPlot data={data?.monthlyData || []} />
        </div>
      </section>

      <section className="flex my-4 px-4 gap-2">
        <div className=" w-1/3 h-[250px] bg-white shadow-lg rounded">
          <PieChartPlot data={data?.pieChartData || []} />
        </div>
        <div className=" w-1/3 h-[250px] bg-white shadow-lg rounded">
          <LineChartPlot data={data?.lineChartData || []} />
        </div>
        <div className=" w-1/3 h-[250px] bg-white shadow-lg rounded">
          <RadarChartPlot data={data?.dailyData || []} />
        </div>
      </section>
    </>
  );
};

export default memo(Page);

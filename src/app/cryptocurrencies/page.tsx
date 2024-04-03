"use client";

import React from "react";
import { Card, Image, Alert, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";

export default function Page() {
  type Coin = {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number | null;
    fully_diluted_valuation: number | null;
    total_volume: number | null;
    high_24h: number | null;
    low_24h: number | null;
    price_change_24h: number | null;
    price_change_percentage_24h: number | null;
    market_cap_change_24h: number | null;
    market_cap_change_percentage_24h: number | null;
    circulating_supply: number | null;
    total_supply: number | null;
    max_supply: number | null;
    ath: number | null;
    ath_change_percentage: number | null;
    ath_date: string | null;
    atl: number | null;
    atl_change_percentage: number | null;
    atl_date: string | null;
    roi: number | object | null;
    last_updated: string;
  };

  type ResponseData = Coin[];

  const { isLoading, isError, data, error } = useQuery<ResponseData>({
    queryKey: ["cryptos"],
    queryFn: async () => {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
      );
      return response.data;
    },
  });

  return (
    <div>
      {isLoading && (
        <Spin
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        />
      )}
      {isError && (
        <Alert
          style={{
            margin: "20px",
          }}
          message={error?.message}
          type="error"
        />
      )}
      {data && (
        <div
          // make a grid layout
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
        >
          {data.map((coin) => (
            <Card
              key={coin.id}
              title={coin.name}
              style={{ width: 300, margin: "0 10px 20px 0" }}
            >
              <Image src={coin.image} alt={coin.name} />
              <p>Symbol: {coin.symbol.toUpperCase()}</p>
              <p>Price: ${coin.current_price}</p>
              <p>Market Cap: $ {coin.market_cap.toLocaleString() || 0}</p>
              <p>Market Cap Rank: {coin.market_cap_rank}</p>
              <p>Total Volume: ${coin.total_volume}</p>
              <p>High 24h: ${coin.high_24h}</p>
              <p>Low 24h: ${coin.low_24h}</p>
              <p>Price Change 24h: ${coin.price_change_24h}</p>
              <p>
                Price Change Percentage 24h: {coin.price_change_percentage_24h}%
              </p>
              <p>Market Cap Change 24h: ${coin.market_cap_change_24h}</p>
              <p>
                Market Cap Change Percentage 24h:{" "}
                {coin.market_cap_change_percentage_24h}%
              </p>
              <p>
                Circulating Supply:{" "}
                {coin.circulating_supply?.toLocaleString() || 0}
              </p>
              <p>Total Supply: {coin.total_supply?.toLocaleString() || 0}</p>
              <p>Max Supply: {coin.max_supply?.toLocaleString() || 0}</p>
              <p>ATH: ${coin.ath}</p>
              <p>ATH Change Percentage: {coin.ath_change_percentage}%</p>
              <p>ATH Date: {dayjs(coin.ath_date).format("DD/MM/YYYY")}</p>
              <p>ATL: ${coin.atl}</p>
              <p>ATL Change Percentage: {coin.atl_change_percentage}%</p>
              <p>ATL Date: {dayjs(coin.atl_date).format("DD/MM/YYYY")}</p>
              <p>
                ROI:
                {coin.roi
                  ? typeof coin.roi === "number"
                    ? `${coin.roi.toFixed(2)}%`
                    : JSON.stringify(coin.roi)
                  : "N/A"}
              </p>
              <p>
                Last Updated: {dayjs(coin.last_updated).format("DD/MM/YYYY")}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

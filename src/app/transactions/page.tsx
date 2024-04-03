"use client";

import React, { useState } from "react";
import { Space, Table, Tag, Button, Input, Alert, message } from "antd";
import type { TableProps } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import AddTransactionModal from "@/components/transactions/AddTransactionModal";
import UpdateTransactionModal from "@/components/transactions/UpdateTransactionModal";
import ConfirmDelete from "@/components/transactions/ConfirmDeleteTransaction";
import TransactionDetailsModal from "@/components/transactions/TransactionDetailsModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const tagColorMapping = {
  income: "success",
  expense: "error",
  recurring: "processing",
  "one-time": "warning",
  business: "magenta",
  personal: "red",
  food: "volcano",
  transport: "orange",
  entertainment: "gold",
  utilities: "lime",
};

interface TransactionType {
  type: string;
  symbol: string;
  symbol_id: string;
  amount: number;
  price: number;
  date: string;
  fee: number;
  status: string;
  tags: string[];
  notes: string;
  id: string;
}

const { Search } = Input;

const Page = () => {
  const queryClient = useQueryClient();

  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [updateId, setUpdateId] = useState<string>("");
  const [transaction, setTransaction] = useState<TransactionType | null>(null);

  type ResponseData = {
    message: string;
    transactions: TransactionType[];
  };

  //   function to fetch transactions from the server using react-query useQuery
  const { isLoading, isError, data, error } = useQuery<ResponseData>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await axios.get(
        "https://cryptallion-backend-alx.vercel.app/api/v1/transactions",
        {
          headers: {
            "X-Token": localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    },
  });

  const columns: TableProps<TransactionType>["columns"] = [
    {
      title: "Transaction",
      key: "symbol",
      render: (_, record) => (
        <a
          onClick={() => {
            setDetailsModal(true);
            setTransaction(record);
          }}
        >
          {record.symbol}
        </a>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => text.toLocaleString(),
    },
    {
      title: "Price (USD)",
      dataIndex: "price",
      key: "price",
      render: (text) => text.toLocaleString(),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      // render tags with different colors based on their values for sell, buy, transfer
      render: (text) => {
        const color =
          text === "sell" ? "volcano" : text === "buy" ? "green" : "blue";
        return <Tag color={color}>{text.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            const color =
              tagColorMapping[tag as keyof typeof tagColorMapping] ||
              "geekblue";
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setUpdateId(record.id);
              setUpdateModal(true);
              setTransaction(record);
            }}
          >
            Update
          </a>
          <a
            onClick={() => {
              ConfirmDelete({
                visible: true,
                transactionId: record.id,
                onOk: async () => {
                  await axios.delete(
                    `https://cryptallion-backend-alx.vercel.app/api/v1/transactions/${record.id}`,
                    {
                      headers: {
                        "X-Token": localStorage.getItem("token"),
                      },
                    }
                  );
                  queryClient.invalidateQueries({
                    queryKey: ["transactions"],
                  });
                  queryClient.invalidateQueries({
                    queryKey: ["dashboard"],
                  });
                },
              });
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  // implement a function to filter transactions based on the search value
  const onSearch: SearchProps["onSearch"] = (value) => {
    const filteredData = data?.transactions?.filter((transaction) => {
      return (
        transaction.symbol.toLowerCase().includes(value.toLowerCase()) ||
        transaction.type.toLowerCase().includes(value.toLowerCase()) ||
        transaction.tags.join(" ").toLowerCase().includes(value.toLowerCase())
      );
    });
    if (filteredData) {
      queryClient.setQueryData<ResponseData>(["transactions"], (oldData) => ({
        ...oldData!,
        transactions: filteredData,
      }));
    } else {
      message.error("No transactions found");
    }
  };

  // make search work on onChange event for the input field
  const onChange: SearchProps["onChange"] = (e) => {
    if (e.target.value === "") {
      // query the server again to get all transactions
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    } else {
      onSearch(e.target.value);
    }
  };

  return (
    <div>
      <AddTransactionModal
        visible={addModal}
        onClose={() => setAddModal(false)}
      />
      <UpdateTransactionModal
        visible={updateModal}
        onClose={() => setUpdateModal(false)}
        transactionId={updateId}
        transaction={transaction}
      />
      <TransactionDetailsModal
        visible={detailsModal}
        onClose={() => setDetailsModal(false)}
        transaction={transaction}
      />
      {
        // show error alert if there is an error fetching transactions
        isError && (
          <Alert
            message="Error"
            description={error?.message}
            type="error"
            showIcon
            closable
            style={{ marginBottom: "10px" }}
          />
        )
      }
      <Table
        columns={columns}
        dataSource={data?.transactions || []}
        bordered
        scroll={{ x: "100%" }}
        loading={isLoading}
        title={() => (
          <div className="table-title">
            <Button
              type="primary"
              className="m-2 lg:w-1/5 md:w-full sm:w-full w-full"
              icon={<PlusOutlined />}
              onClick={() => setAddModal(true)}
            >
              Add Transaction
            </Button>
            <div className="m-2 lg:w-6/12 md:w-full sm:w-full w-full">
              <Search
                placeholder="search..."
                onSearch={onSearch}
                onChange={onChange}
                enterButton
                allowClear
              />
            </div>
          </div>
        )}
        rowKey="id"
      />
    </div>
  );
};

export default Page;

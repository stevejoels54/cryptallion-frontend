"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Modal,
  Form,
  Tag,
  Input,
  Select,
  InputNumber,
  DatePicker,
  Button,
  notification,
  Alert,
} from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";

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

type UpdateTransactionModalProps = {
  visible: boolean;
  onClose: () => void;
  transactionId?: string;
  transaction: TransactionType | null;
};

const UpdateTransactionModal = ({
  visible,
  onClose,
  transaction,
  transactionId,
}: UpdateTransactionModalProps) => {
  type Coin = {
    id: string;
    symbol: string;
    name: string;
  };

  type Transaction = {
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
  };

  const transactionTags = [
    { value: "income", label: "Income", color: "success" },
    { value: "expense", label: "Expense", color: "error" },
    { value: "recurring", label: "Recurring", color: "processing" },
    { value: "one-time", label: "One-time", color: "warning" },
    { value: "business", label: "Business", color: "magenta" },
    { value: "personal", label: "Personal", color: "red" },
    { value: "food", label: "Food", color: "volcano" },
    { value: "transport", label: "Transport", color: "orange" },
    { value: "entertainment", label: "Entertainment", color: "gold" },
    { value: "utilities", label: "Utilities", color: "lime" },
  ];

  const transactionTypes = [
    { value: "buy", label: "Buy", color: "success" },
    { value: "sell", label: "Sell", color: "error" },
    { value: "transfer", label: "Transfer", color: "processing" },
  ];

  const transactionStatus = [
    { value: "pending", label: "Pending", color: "warning" },
    { value: "completed", label: "Completed", color: "success" },
    { value: "failed", label: "Failed", color: "error" },
  ];

  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<string | undefined>(
    undefined
  );

  // function to fetch coins from the API and set the coins state
  const { isLoading, isError, data, error } = useQuery<Coin[]>({
    queryKey: ["coins"],
    queryFn: async () => {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/list"
      );
      return response.data;
    },
  });

  useEffect(() => {
    if (data) {
      setCoins(data);
    }
  }, [data]);

  const mutation = useMutation({
    mutationKey: ["update-transaction"],
    mutationFn: async (values: Transaction) => {
      const { type, symbol, amount, price, date, fee, status, tags, notes } =
        values;
      const response = await axios.put(
        `https://cryptallion-backend-alx.vercel.app/api/v1/transactions/${transactionId}`,
        {
          type,
          symbol: symbol.split(",")[0],
          symbol_id: symbol.split(",")[1],
          amount,
          price,
          date,
          fee,
          status,
          tags,
          notes,
        },
        {
          headers: {
            "X-Token": localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
      notification.success({
        message: "Transaction updated successfully",
        description: "The transaction has been updated successfully",
      });
    },
    onError: (error: any) => {
      notification.error({
        message: "An error occurred",
        description: error.message,
      });
    },
  });

  useMemo(() => {
    form.setFieldsValue({
      type: transaction?.type,
      symbol: transaction?.symbol,
      amount: transaction?.amount,
      price: transaction?.price,
      date: dayjs(transaction?.date),
      fee: transaction?.fee,
      status: transaction?.status,
      tags: transaction?.tags,
      notes: transaction?.notes,
    });
    setSelectedCoin(`${transaction?.symbol},${transaction?.symbol_id}`);
  }, [transaction, form]);

  return (
    <Modal
      title="UPDATE TRANSACTION"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      {mutation.status === "error" && (
        <Alert
          message="An error occurred"
          description={mutation.error.message}
          type="error"
          showIcon
          closable
          style={{ marginBottom: "1rem" }}
        />
      )}
      {isError && (
        <Alert
          message="An error occurred"
          description={error.message}
          type="error"
          showIcon
          closable
          style={{ marginBottom: "1rem" }}
        />
      )}
      <Form
        name="update-transaction-form"
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={(values) => mutation.mutate(values)}
        form={form}
      >
        <Form.Item
          name="type"
          label="Type"
          rules={[
            { required: true, message: "Please input the transaction type!" },
          ]}
        >
          <Select placeholder="Select a type">
            {transactionTypes.map((type) => (
              <Select.Option key={type.value} value={type.value}>
                <Tag color={type.color}>{type.label}</Tag>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="symbol"
          label="Coin"
          rules={[{ required: true, message: "Please input the symbol!" }]}
        >
          <Select
            placeholder="Select a coin"
            loading={isLoading}
            showSearch
            optionFilterProp="children"
            onChange={(value) => setSelectedCoin(value)}
          >
            {coins.map((coin, index) => (
              <Select.Option key={index} value={`${coin.name},${coin.id}`}>
                {`${coin.name} - (${coin.symbol})`}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: "Please input the amount!" }]}
        >
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            addonBefore={
              selectedCoin
                ? selectedCoin?.split(",")[0]?.toUpperCase()
                : transaction?.symbol
                ? transaction?.symbol.toUpperCase()
                : "COIN"
            }
            placeholder="Amount"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            addonBefore="USD"
            placeholder="Price in dollars"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please input the date!" }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item
          name="fee"
          label="Fee"
          rules={[{ required: true, message: "Please input the fee!" }]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            addonBefore="USD"
            placeholder="Fee in dollars"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: true,
              message: "Please select the transaction status!",
            },
          ]}
        >
          <Select placeholder="Select transaction status">
            {transactionStatus.map((status) => (
              <Select.Option key={status.value} value={status.value}>
                <Tag color={status.color}>{status.label}</Tag>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="tags" label="Tags">
          <Select mode="tags" placeholder="Select transaction tags">
            {transactionTags.map((tag) => (
              <Select.Option key={tag.value} value={tag.value}>
                <Tag color={tag.color}>{tag.label}</Tag>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="notes" label="Notes">
          <Input.TextArea placeholder="Notes" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
            }}
            loading={mutation.status === "pending" ? true : false}
          >
            Update Transaction
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateTransactionModal;

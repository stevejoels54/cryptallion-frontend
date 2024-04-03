"use client";

import React from "react";
import { Tag, Button, Modal } from "antd";
import dayjs from "dayjs";

interface TransactionType {
  type: string;
  symbol: string;
  amount: number;
  price: number;
  date: string;
  fee: number;
  status: string;
  tags: string[];
  notes: string;
  id: string;
}

type TransactionDetailsModalProps = {
  visible: boolean;
  onClose: () => void;
  transaction: TransactionType | null;
};

const TransactionDetailsModal = ({
  visible,
  onClose,
  transaction,
}: TransactionDetailsModalProps) => {
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

  return (
    <Modal
      title="TRANSACTION DETAILS"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      {transaction && (
        <table className="table-auto">
          <tbody>
            <tr>
              <td className="px-4 py-2">
                <strong>Type:</strong>
              </td>
              <td className="px-4 py-2">
                <Tag
                  color={
                    transactionTypes.find((t) => t.value === transaction.type)
                      ?.color
                  }
                >
                  {transaction.type}
                </Tag>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <strong>Symbol:</strong>
              </td>
              <td className="px-4 py-2">{transaction.symbol}</td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <strong>Amount:</strong>
              </td>
              <td className="px-4 py-2">{`${transaction.amount.toLocaleString()} ${
                transaction.symbol
              }`}</td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <strong>Price:</strong>
              </td>
              <td className="px-4 py-2">{`$ ${transaction.price.toLocaleString()}`}</td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <strong>Date:</strong>
              </td>
              <td className="px-4 py-2">
                {dayjs(transaction.date).format("MMMM D, YYYY")}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <strong>Fee:</strong>
              </td>
              <td className="px-4 py-2">
                {`$ ${transaction?.fee?.toLocaleString() || 0}`}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <strong>Status:</strong>
              </td>
              <td className="px-4 py-2">
                <Tag
                  color={
                    transactionStatus.find(
                      (t) => t.value === transaction.status
                    )?.color
                  }
                >
                  {transaction.status}
                </Tag>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <strong>Tags:</strong>
              </td>
              <td className="px-4 py-2">
                {transaction.tags.map((tag) => (
                  <Tag
                    key={tag}
                    color={transactionTags.find((t) => t.value === tag)?.color}
                  >
                    {tag}
                  </Tag>
                ))}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <strong>Notes:</strong>
              </td>
              <td className="px-4 py-2">{transaction.notes}</td>
            </tr>
          </tbody>
        </table>
      )}
    </Modal>
  );
};

export default TransactionDetailsModal;

import React from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

const { confirm } = Modal;

type confirmProps = {
  transactionId: string;
  onOk: () => Promise<void>; // onOk function to be called when the user clicks the OK button in the confirm dialog
};

const showPromiseConfirm = ({ transactionId, onOk }: confirmProps) => {
  confirm({
    title: "Delete Transaction",
    icon: <ExclamationCircleFilled />,
    content:
      "This action cannot be undone. Are you sure you want to delete this transaction?",
    async onOk() {
      return new Promise((resolve, reject) => {
        onOk().then(resolve).catch(reject);
      });
    },
    onCancel() {},
  });
};

type Props = {
  visible: boolean;
  transactionId: string;
  onOk: () => Promise<void>;
};

const ConfirmDelete = ({ visible, transactionId, onOk }: Props) => {
  return visible && showPromiseConfirm({ transactionId, onOk });
};

export default ConfirmDelete;

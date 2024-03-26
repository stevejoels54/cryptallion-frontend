import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { useRouter } from "next/navigation";

type ProfilePopOverProps = {
  avatar?: string;
  email?: string;
  name?: string;
};

export default function ProfilePopOver({
  avatar = "Avatar",
  email = "Email",
  name = "Name",
}: ProfilePopOverProps) {
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <Avatar
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
        icon={<UserOutlined />}
        src={avatar}
      />
      <p>{email}</p>
      <p>{name}</p>
      {/* text button to profile */}
      <Button type="link" onClick={() => router.push("/profile")}>
        Your Profile
      </Button>
      <Button type="primary" danger onClick={() => router.push("/auth")}>
        Logout
      </Button>
    </div>
  );
}

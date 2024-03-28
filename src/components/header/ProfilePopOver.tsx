import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, notification } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";

type ProfilePopOverProps = {
  avatar?: string;
  email?: string;
};

export default function ProfilePopOver({
  avatar = "Avatar",
  email = "Email",
}: ProfilePopOverProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const logout = async () => {
    const url = "http://localhost:5000/api/v1/auth/logout";
    try {
      const token = localStorage.getItem("token");

      setLoading(true);
      const response = await axios.get(url, {
        headers: {
          "X-Token": token,
        },
      });

      if (response.status === 204) {
        localStorage.removeItem("token");
        router.push("/auth", { scroll: false });
        setLoading(false);
        notification.success({
          message: "Logout successful",
          description: "You have been logged out",
        });
      } else {
        // console.error(`Logout failed with status: ${response.status}`);
        setError("An error occurred.");
        setLoading(false);
      }
    } catch (error: any) {
      //   console.error("Error during logout:", error);
      // Optionally, display a generic error message to the user
      setError(error.response.data.error);
      notification.error({
        message: "An error occurred",
        description: error.response.data.error,
      });
      setLoading(false);
    }
  };

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
      {/* text button to profile */}
      <Button
        type="link"
        onClick={() => router.push("/profile", { scroll: false })}
      >
        Your Profile
      </Button>
      <Button type="primary" danger onClick={() => logout()} loading={loading}>
        Logout
      </Button>
    </div>
  );
}

"use client";

import React, { memo, useEffect, useState } from "react";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { Avatar, Popover, Badge, Space, Button } from "antd";
import ProfilePopOver from "./ProfilePopOver";
import Notifications from "../notifications/Notifications";
import { useRouter } from "next/navigation";

type ProfileAvatarProps = {
  notifications?: number;
  profile?: string;
  email?: string;
};

function ProfileAvatar({
  notifications = 0,
  profile = "Profile",
  email = "Email",
}: ProfileAvatarProps) {
  const router = useRouter();
  const [emailFromLocalStorage, setEmailFromLocalStorage] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    let email = "";
    let avatar = "";

    if (userFromStorage) {
      email = JSON.parse(userFromStorage).email;
      avatar = JSON.parse(userFromStorage).avatar;
    }

    if (email) {
      setEmailFromLocalStorage(email);
    }

    if (avatar) {
      setAvatar(avatar);
    }
  }, []);

  return (
    <Space size={24}>
      {notifications > 0 ? (
        <Popover
          content={<Notifications />}
          title={
            <Button
              type="link"
              onClick={() => router.push("/notifications", { scroll: false })}
            >
              View All Notifications
            </Button>
          }
        >
          <Badge count={notifications} size="small">
            <Avatar
              size="small"
              icon={<BellOutlined />}
              onClick={() => router.push("/notifications", { scroll: false })}
              className="cursor-pointer"
            />
          </Badge>
        </Popover>
      ) : (
        <Badge dot>
          <Avatar
            size="small"
            icon={<BellOutlined />}
            onClick={() => router.push("/notifications", { scroll: false })}
            className="cursor-pointer"
          />
        </Badge>
      )}
      <Popover
        content={
          <ProfilePopOver
            avatar={avatar || profile}
            email={emailFromLocalStorage || email}
          />
        }
      >
        <Avatar
          size="large"
          icon={<UserOutlined />}
          src={profile}
          className="cursor-pointer"
        />
      </Popover>
    </Space>
  );
}

export default memo(ProfileAvatar);

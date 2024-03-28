"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { notification } from "antd";

type User = {
  email?: string;
  username?: string;
  notifications?: number;
};

// const useAuth = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setToken(token);
//       setUser({ email: "email.protected" });
//     }
//   }, []);

//   //   register function passes email and password to the server
//   const register = async (email: string, password: string) => {
//     // call the server
//     // if successful, set the token in local storage
//     // if successful, set the user in state
//     localStorage.setItem("token", "token");
//     setUser({ email });
//   };

//   const login = async (email: string, password: string) => {
//     // call the server
//     // if successful, set the token in local storage
//     // if successful, set the user in state
//     localStorage.setItem("token", "token");
//     setUser({ email });
//   };

//   const logout = () => {
//     // call the server to logout
//     // if successful, remove the token from local storage
//     // if successful, remove the user from state
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return { register, login, logout, user, token };
// };

// export default useAuth;

const baseUrl = "http://localhost:5000/api/v1/auth";

export const useRegister = (email: string, password: string) => {
  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: ["register"],
    queryFn: async () => {
      const response = await axios.post(`${baseUrl}/register`, {
        email,
        password,
      });
      return response.data;
    },
  });

  if (isError) {
    notification.error({
      message: "An error occurred",
      description: error.message,
    });
  }

  return { isLoading, isError, data, isSuccess, error };
};

// // demo use of the useAuth hook

// import { useState } from "react";
// import { useToken } from "@/hooks/useToken";

// export const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const { token } = useToken();

//   const login = () => {
//     setUser({ email: "email protected]" });
//   };
//   const logout = () => {
//     setUser(null);
//   };
//   return { login, logout, user };
// };
// export default useAuth;

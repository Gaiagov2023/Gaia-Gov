import React from "react";
import jwtDecode from "jwt-decode";

const authContext = React.createContext();

const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.scopes[0].authority;
  } catch (err) {
    console.log("error-", err.message);
  }
};

const useAuth = () => {
  const token = localStorage?.getItem("token");
  const user_info = JSON.parse(localStorage?.getItem("user_info"));
  const [authorized, setAuthorized] = React.useState(!!token);

  return {
    authorized,
    user_info,
    role: decodeToken(token),
    login() {
      setAuthorized(true);
    },
    logout() {
      localStorage.clear();
      setAuthorized(false);
    },
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default function AuthConsumer() {
  return React.useContext(authContext);
}

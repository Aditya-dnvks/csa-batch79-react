import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setLogin] = useState(
    JSON.parse(localStorage.getItem("isLogin"))
  );

  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cartData")) || []
  );

  return (
    <AuthContext.Provider value={{ isLogin, setLogin, cartData, setCartData }}>
      {children}
    </AuthContext.Provider>
  );
};

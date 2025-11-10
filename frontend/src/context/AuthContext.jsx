import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fleura_user")); } catch { return null; }
  });

  useEffect(() => {
    if (user) localStorage.setItem("fleura_user", JSON.stringify(user));
    else localStorage.removeItem("fleura_user");
  }, [user]);

  const login = (userObj) => setUser(userObj);
  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

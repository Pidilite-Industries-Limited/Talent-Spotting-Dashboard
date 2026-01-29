
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthProvider.jsx";

export default function RequireAuth({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div className="p-6">Checking session…</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}

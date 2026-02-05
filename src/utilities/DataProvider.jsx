import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { api } from "./api";
import { AuthContext } from "./AuthProvider.jsx";

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const { user, loading: authLoading } = useContext(AuthContext);
  const auth = useContext(AuthContext); // DO NOT destructure directly
  const user = auth?.user ?? null;
  const authLoading = auth?.loading

  // useEffect(() => {
  //   async function fetchData() {
  //     if (authLoading) return;
  //     if (!user) {
  //       setData([])
  //       setLoading(false);
  //       return;
  //     }
      
  //     setLoading(true);
  //     try {
  //       const jsonData = await api("/api/data");
  //       setData(jsonData);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, [authLoading, user]);

  const fetchData = useCallback(async () => {
    if (authLoading) return;
    if (!user) {
      setData([])
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const jsonData = await api("/api/data");
      setData(jsonData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [authLoading, user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const contextValue = {
    data, loading, error, refetchData: fetchData,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}

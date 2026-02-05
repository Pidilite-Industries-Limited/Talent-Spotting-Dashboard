
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utilities/AuthProvider.jsx";
import App from "./App";
import DataProvider from "./utilities/DataProvider.jsx";

const LoginPage = lazy(() => import("./Login.jsx"));

export default function Root() {
  return (
    <AuthProvider>
      <BrowserRouter basename={process.env.BASENAME}>
        <Routes>
          <Route
            path="/login"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route path="/*" element={<DataProvider><App /></DataProvider>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

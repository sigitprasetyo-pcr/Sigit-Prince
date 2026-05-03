import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loading from "./components/Loading";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/inventory" element={<Orders mode="inventory" />} />
          <Route path="/customers" element={<Customers />} />

          <Route
            path="/error/400"
            element={
              <ErrorPage
                code="400"
                title="Bad Request"
                description="Permintaan tidak dapat diproses oleh sistem VelvetNova."
              />
            }
          />

          <Route
            path="/error/401"
            element={
              <ErrorPage
                code="401"
                title="Unauthorized"
                description="Anda harus login terlebih dahulu."
              />
            }
          />

          <Route
            path="/error/403"
            element={
              <ErrorPage
                code="403"
                title="Forbidden"
                description="Anda tidak memiliki izin membuka halaman ini."
              />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
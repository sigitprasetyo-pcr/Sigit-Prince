import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Loading from "./components/Loading";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const Products = React.lazy(() => import("./pages/Products"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));

const Orders = React.lazy(() => import("./pages/Orders"));
const OrderDetail = React.lazy(() => import("./pages/OrderDetail"));

const Customers = React.lazy(() => import("./pages/Customers"));
const CustomerDetail = React.lazy(() => import("./pages/CustomerDetail"));

const Membership = React.lazy(() => import("./pages/Membership"));
const Promo = React.lazy(() => import("./pages/Promo"));
const Reports = React.lazy(() => import("./pages/Reports"));
const Settings = React.lazy(() => import("./pages/Settings"));

const CrmBreakdown = React.lazy(() => import("./pages/CrmBreakdown"));
const ReactHooksBoutique = React.lazy(() =>
  import("./pages/ReactHooksBoutique")
);

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
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />

          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />

          <Route path="/membership" element={<Membership />} />
          <Route path="/promo" element={<Promo />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/crm-breakdown" element={<CrmBreakdown />} />
          <Route path="/react-hooks-boutique" element={<ReactHooksBoutique />} />

          <Route
            path="/error/400"
            element={
              <ErrorPage
                code="400"
                title="Bad Request"
                description="Permintaan tidak dapat diproses oleh sistem Hejmana Boutique."
              />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
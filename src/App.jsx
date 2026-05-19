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

const CrmBreakdown = React.lazy(() => import("./pages/CrmBreakdown"));

const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

function ComingSoon({ title }) {
  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <div className="rounded-[14px] border border-[#E7E0D8] bg-white p-6 shadow-[0_6px_16px_rgba(45,39,35,0.05)]">
        <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-[#C7A765]">
          Hejmana Boutique
        </p>

        <h1 className="text-[22px] font-medium text-black">
          {title}
        </h1>

        <p className="mt-2 text-[12px] text-[#34485C]">
          Halaman ini belum dibuat. Nanti bisa disesuaikan dengan desain Figma.
        </p>
      </div>
    </section>
  );
}

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

          <Route path="/crm-breakdown" element={<CrmBreakdown />} />

          <Route path="/analytics" element={<ComingSoon title="Analytics" />} />
          <Route path="/settings" element={<ComingSoon title="Settings" />} />

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
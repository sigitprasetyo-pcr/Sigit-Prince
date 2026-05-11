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

function ComingSoon({ title }) {
  return (
    <section className="min-h-[calc(100vh-96px)] bg-[#FAF9F7] px-10 py-11">
      <div className="rounded-[14px] border border-[#E7E0D8] bg-white p-10">
        <h1 className="font-serif text-[36px] font-bold text-[#111827]">
          {title}
        </h1>
        <p className="mt-3 text-[18px] text-[#7C7772]">
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
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ComingSoon title="Products" />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/favorites" element={<ComingSoon title="Favorites" />} />
          <Route path="/settings" element={<ComingSoon title="Settings" />} />
          <Route path="/customers" element={<Customers />} />

          <Route
            path="/error/400"
            element={
              <ErrorPage
                code="400"
                title="Bad Request"
                description="Permintaan tidak dapat diproses oleh sistem Boutique."
              />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
import React, { Suspense } from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Loading from "./components/Loading";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import GuestLayout from "./layouts/GuestLayout";

import ProtectedRoute from "./components/ProtectedRoute";

/* ===========================
   GUEST
=========================== */
const LandingPage = React.lazy(() =>
  import("./pages/LandingPage")
);

/* ===========================
   ADMIN
=========================== */
const Dashboard = React.lazy(() =>
  import("./pages/Dashboard")
);

const Users = React.lazy(() =>
  import("./pages/Users")
);

const Products = React.lazy(() =>
  import("./pages/Products")
);

const ProductDetail = React.lazy(() =>
  import("./pages/ProductDetail")
);

const Orders = React.lazy(() =>
  import("./pages/Orders")
);

const OrderDetail = React.lazy(() =>
  import("./pages/OrderDetail")
);

const Customers = React.lazy(() =>
  import("./pages/Customers")
);

const CustomerDetail = React.lazy(() =>
  import("./pages/CustomerDetail")
);

const Membership = React.lazy(() =>
  import("./pages/Membership")
);

const Member = React.lazy(() =>
  import("./pages/Member")
);

const Promo = React.lazy(() =>
  import("./pages/Promo")
);

const Reports = React.lazy(() =>
  import("./pages/Reports")
);

const Settings = React.lazy(() =>
  import("./pages/Settings")
);

const CrmBreakdown = React.lazy(() =>
  import("./pages/CrmBreakdown")
);

const ReactHooksBoutique = React.lazy(() =>
  import("./pages/ReactHooksBoutique")
);

/* ===========================
   AUTH ADMIN
=========================== */
const Login = React.lazy(() =>
  import("./pages/auth/Login")
);

const Register = React.lazy(() =>
  import("./pages/auth/Register")
);

const Forgot = React.lazy(() =>
  import("./pages/auth/Forgot")
);

/* ===========================
   ERROR
=========================== */
const ErrorPage = React.lazy(() =>
  import("./pages/ErrorPage")
);

const NotFound = React.lazy(() =>
  import("./pages/NotFound")
);

/* ===========================
   MEMBER AREA
=========================== */
const MemberLayout = React.lazy(() =>
  import("./layouts/MemberLayout")
);

const MemberDashboard = React.lazy(() =>
  import("./pages/member/MemberDashboard")
);

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* ======================
            GUEST LANDING PAGE
        ====================== */}
        <Route element={<GuestLayout />}>
          <Route
            path="/"
            element={<LandingPage />}
          />
        </Route>

        {/* ======================
            AUTH ADMIN
        ====================== */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/forgot"
            element={<Forgot />}
          />
        </Route>

        {/* ======================
            ADMIN AREA
        ====================== */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/users"
            element={<Users />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/products/:id"
            element={<ProductDetail />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/orders/:id"
            element={<OrderDetail />}
          />

          <Route
            path="/customers"
            element={<Customers />}
          />

          <Route
            path="/customers/:id"
            element={<CustomerDetail />}
          />

          <Route
            path="/membership"
            element={<Membership />}
          />

          <Route
            path="/members"
            element={<Member />}
          />

          <Route
            path="/promo"
            element={<Promo />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="/crm-breakdown"
            element={<CrmBreakdown />}
          />

          <Route
            path="/react-hooks-boutique"
            element={<ReactHooksBoutique />}
          />

          <Route
            path="/error/400"
            element={
              <ErrorPage
                code="400"
                title="Bad Request"
                description="Permintaan tidak dapat diproses oleh sistem Aurelia Boutique."
              />
            }
          />
        </Route>

        {/* ======================
            MEMBER AREA
        ====================== */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["user", "member"]}>
              <MemberLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/member"
            element={<MemberDashboard />}
          />
        </Route>

        {/* ======================
            REDIRECT
        ====================== */}
        <Route
          path="/home"
          element={<Navigate to="/" replace />}
        />

        {/* ======================
            404
        ====================== */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </Suspense>
  );
}
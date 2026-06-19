import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  /*
    Jika belum login:
    → arahkan ke halaman login
    → simpan halaman tujuan agar bisa kembali setelah login
  */
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  /*
    Periksa hak akses (role) jika property allowedRoles diberikan
  */
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "admin") {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/member" replace />;
    }
  }

  /*
    Sudah login & berhak
    → tampilkan halaman yang diminta
  */
  return children;
}
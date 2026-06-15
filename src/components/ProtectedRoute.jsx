import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  const user = localStorage.getItem("user");

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
    Sudah login
    → tampilkan halaman admin
  */
  return children;
}
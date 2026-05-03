import ErrorPage from "./ErrorPage";

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      title="Page Not Found"
      description="Halaman yang Anda cari tidak tersedia di sistem VelvetNova Private Atelier."
    />
  );
}
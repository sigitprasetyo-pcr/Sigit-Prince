import { Link } from "react-router-dom";

export default function ErrorPage({ code, title, description }) {
  return (
    <div className="min-h-[calc(100vh-80px)] p-6 md:p-12 flex items-center justify-center">
      <div className="max-w-xl text-center bg-white luxury-shadow p-12">
        <span className="label-caps text-secondary">Protocol Error</span>

        <h1 className="font-display text-8xl italic tracking-tighter mt-6">
          {code}
        </h1>

        <h2 className="font-display text-headline-md mt-6">
          {title}
        </h2>

        <p className="text-on-surface-variant mt-4 leading-relaxed">
          {description}
        </p>

        <Link
          to="/"
          className="inline-flex mt-8 px-8 py-4 btn-black label-caps"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}
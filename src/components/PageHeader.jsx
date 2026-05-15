export default function PageHeader({ title, breadcrumb, description, children }) {
  return (
    <section className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {breadcrumb && (
          <span className="mb-2 block text-[9px] uppercase tracking-[0.18em] text-[#8B735D]">
            {breadcrumb}
          </span>
        )}

        <h1 className="text-[22px] font-medium leading-tight text-[#2D2723]">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-[#7C7772]">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}
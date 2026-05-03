export default function PageHeader({ title, breadcrumb, description, children }) {
  return (
    <section className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <span className="label-caps text-secondary tracking-[0.2em] block mb-3 underline decoration-secondary-container underline-offset-4">
          {breadcrumb}
        </span>

        <h1 className="font-display text-display-lg text-primary">
          {title}
        </h1>

        {description && (
          <p className="mt-3 text-on-surface-variant max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}
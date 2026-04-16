export default function AboutSection() {
  return (
    <section id="about" className="border-b border-slate-800">
      <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-14 md:grid-cols-3 md:px-6">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-bold">Market Dashboard</h2>
          <p className="mt-2 text-sm text-slate-300">
            View real-time crypto prices and quickly switch between top assets.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-bold">Chart-first Experience</h2>
          <p className="mt-2 text-sm text-slate-300">
            Understand movement at a glance with clean performance charts.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-bold">Account Controls</h2>
          <p className="mt-2 text-sm text-slate-300">
            Manage wallet and profile flows with secure backend integration.
          </p>
        </article>
      </div>
    </section>
  );
}

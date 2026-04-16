export default function AppSection() {
  return (
    <section id="app" className="border-b border-slate-800">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wide text-amber-300">The App</p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Why people use Goldcrest</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h3 className="text-lg font-bold">Simple dashboard</h3>
            <p className="mt-2 text-sm text-slate-300">
              A clear layout for watchlists, balances, and asset movement without clutter.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h3 className="text-lg font-bold">Chart-first screens</h3>
            <p className="mt-2 text-sm text-slate-300">
              Visual price trends are prioritized so you can quickly read the market context.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h3 className="text-lg font-bold">Connected backend APIs</h3>
            <p className="mt-2 text-sm text-slate-300">
              Auth, portfolio, wallet, and transaction actions are wired to your live API environment.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

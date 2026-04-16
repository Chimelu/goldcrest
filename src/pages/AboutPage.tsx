import LandingHeader from './landing/LandingHeader';
import LandingFooter from './landing/LandingFooter';

type Props = {
  onLogin: () => void;
  onRegister: () => void;
  onNavigate: (path: '/' | '/about' | '/contact' | '/auth') => void;
};

export default function AboutPage({ onLogin, onRegister, onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <LandingHeader onNavigate={onNavigate} />
      <main className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 md:p-10">
          <p className="text-xs uppercase tracking-wide text-amber-300">About Goldcrest</p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">Built for market clarity</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            Goldcrest is designed for users who want a clean, reliable way to track crypto prices,
            analyze chart behavior, and manage account flows in one place. We focus on usability,
            consistency with mobile, and secure backend connectivity.
          </p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ['Mission', 'Make crypto market tracking simple, transparent, and useful every day.'],
            ['Product', 'Live quotes, chart-first interfaces, and account tools with strong UX.'],
            ['Reliability', 'Consistent data flows and predictable interactions across platforms.'],
          ].map(([title, body]) => (
            <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h2 className="text-lg font-bold">{title}</h2>
              <p className="mt-2 text-sm text-slate-300">{body}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-xl font-bold">Ready to try Goldcrest?</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={onRegister} className="rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-slate-900">
              Register
            </button>
            <button onClick={onLogin} className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-bold text-slate-100">
              Login
            </button>
          </div>
        </section>
      </main>
      <LandingFooter onNavigate={onNavigate} />
    </div>
  );
}

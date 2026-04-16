import LandingHeader from './landing/LandingHeader';
import LandingFooter from './landing/LandingFooter';

type Props = {
  onLogin: () => void;
  onRegister: () => void;
  onNavigate: (path: '/' | '/about' | '/contact' | '/auth') => void;
};

export default function ContactPage({ onLogin, onRegister, onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <LandingHeader onNavigate={onNavigate} />
      <main className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h1 className="text-3xl font-extrabold md:text-4xl">Contact Us</h1>
            <p className="mt-3 text-sm text-slate-300">
              Need support with your account, onboarding, or platform usage? We’re here to help.
            </p>
            <div className="mt-6 space-y-4 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Email</p>
                <a href="mailto:support@goldcrest.app" className="font-semibold text-amber-300">support@goldcrest.app</a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Hours</p>
                <p className="font-semibold text-slate-100">Mon - Fri, 9am - 6pm</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Response Time</p>
                <p className="font-semibold text-slate-100">Within 24 business hours</p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-bold">Start with Goldcrest</h2>
            <p className="mt-2 text-sm text-slate-300">
              Create an account to access market dashboards, charts, and account tools.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={onRegister} className="rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-slate-900">
                Register
              </button>
              <button onClick={onLogin} className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-bold text-slate-100">
                Login
              </button>
            </div>
          </article>
        </section>
      </main>
      <LandingFooter onNavigate={onNavigate} />
    </div>
  );
}

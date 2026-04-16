type Props = {
  onLogin: () => void;
  onRegister: () => void;
};

export default function ContactSection({ onLogin, onRegister }: Props) {
  return (
    <section id="contact">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p className="mt-2 text-sm text-slate-300">
            Questions, onboarding help, or account support? Reach our team any time.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-slate-700 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Email</p>
              <a href="mailto:support@goldcrest.app" className="mt-1 block text-sm font-semibold text-amber-300">
                support@goldcrest.app
              </a>
            </div>
            <div className="rounded-xl border border-slate-700 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Hours</p>
              <p className="mt-1 text-sm font-semibold text-slate-100">Mon - Fri, 9am - 6pm</p>
            </div>
            <div className="rounded-xl border border-slate-700 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Response</p>
              <p className="mt-1 text-sm font-semibold text-slate-100">Within 24 business hours</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={onRegister} className="rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-slate-900">
              Get Started
            </button>
            <button onClick={onLogin} className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-bold text-slate-100">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

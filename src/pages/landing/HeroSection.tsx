type Props = {
  onGetStarted: () => void;
};

export default function HeroSection({ onGetStarted }: Props) {
  return (
    <section id="home" className="border-b border-slate-800">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Track crypto markets with confidence
          </h1>
          <p className="mt-4 text-base text-slate-300 md:text-lg">
            Goldcrest helps you monitor top assets, view chart performance, and manage your account in one clean experience.
          </p>
          <div className="mt-8">
            <button onClick={onGetStarted} className="rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-slate-900">
              Get Started
            </button>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5">
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path d="M3 2l10.8 10L3 22z" fill="#34A853" />
                  <path d="M3 2l7.6 4.4L15 12l-4.4 5.6L3 22V2z" fill="#4285F4" />
                  <path d="M15 12l3.8-2.2c1.5-.9 1.5-2.5 0-3.4L13.8 3.5 10.6 6z" fill="#FBBC05" />
                  <path d="M10.6 18l3.2 2.5 5-2.9c1.5-.9 1.5-2.5 0-3.4L15 12z" fill="#EA4335" />
                </svg>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">Google Play</p>
                  <p className="text-sm font-semibold text-slate-100">Coming soon</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-slate-100" fill="currentColor" aria-hidden="true">
                  <path d="M15.5 2.8c-.9.1-2 .6-2.7 1.4-.6.7-1.1 1.8-.9 2.8 1 .1 2.1-.5 2.8-1.2.6-.7 1.1-1.8.8-3z" />
                  <path d="M20.2 16.8c-.5 1.2-.8 1.7-1.4 2.8-.8 1.5-1.9 3.3-3.2 3.3-1.2 0-1.5-.8-3.1-.8s-2 .8-3.2.8c-1.3 0-2.3-1.6-3.1-3.1-2.2-4-2.4-8.6-1.1-10.7.9-1.5 2.2-2.4 3.5-2.4 1.4 0 2.3.8 3.5.8 1.1 0 1.8-.8 3.5-.8 1.2 0 2.5.7 3.3 1.9-2.9 1.6-2.5 5.8.8 7.2z" />
                </svg>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">App Store</p>
                  <p className="text-sm font-semibold text-slate-100">Coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-2xl border border-amber-300/20" />
          <img
            src="/crypto-image.avif"
            alt="Crypto chart interface"
            className="relative w-full rounded-2xl border border-slate-700 object-cover"
          />
        </div>
      </div>
    </section>
  );
}

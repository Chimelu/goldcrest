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

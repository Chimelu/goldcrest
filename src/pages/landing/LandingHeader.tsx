type Props = {
  onNavigate: (path: '/' | '/about' | '/contact' | '/auth') => void;
};

export default function LandingHeader({ onNavigate }: Props) {
  return (
    <header className="border-b border-slate-800">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-4 py-4 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-0 md:px-6">
        <div className="flex items-center md:justify-start">
          <button onClick={() => onNavigate('/')} className="rounded-lg border border-slate-700 p-1" aria-label="Go to home">
            <img src="/goldcrest-logo.png" alt="Goldcrest logo" className="h-10 w-10 rounded-md object-cover" />
          </button>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-300 md:gap-8">
          <button className="font-semibold hover:text-amber-300" onClick={() => onNavigate('/')}>Home</button>
          <button className="font-semibold hover:text-amber-300" onClick={() => onNavigate('/about')}>About</button>
          <button className="font-semibold hover:text-amber-300" onClick={() => onNavigate('/contact')}>Contact</button>
        </nav>
        <div className="hidden md:block" />
      </div>
    </header>
  );
}

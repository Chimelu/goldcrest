type Props = {
  onNavigate: (path: '/' | '/about' | '/contact' | '/auth') => void;
};

export default function LandingFooter({ onNavigate }: Props) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-5 px-4 py-12 text-base text-slate-200 md:flex-row md:px-6 md:py-14">
        <p className="text-base font-medium">© {new Date().getFullYear()} Goldcrest. All rights reserved.</p>
        <div className="flex items-center gap-6 text-base font-bold">
          <button className="hover:text-amber-300" onClick={() => onNavigate('/')}>Home</button>
          <button className="hover:text-amber-300" onClick={() => onNavigate('/about')}>About</button>
          <button className="hover:text-amber-300" onClick={() => onNavigate('/contact')}>Contact</button>
        </div>
      </div>
    </footer>
  );
}

import type { ReactNode } from 'react';
import type { Tab } from '../types';

type Props = {
  open: boolean;
  email?: string;
  tab: Tab;
  canTransact: boolean;
  onSelect: (tab: Tab) => void;
  onClose: () => void;
  onLogout: () => void;
};

function IconTrade() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 18h16" />
      <path d="M6 15l4-4 3 3 5-6" />
      <circle cx="6" cy="15" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="13" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="18" cy="8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconWallet() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M16 11h5v4h-5a2 2 0 010-4z" />
      <circle cx="16.8" cy="13" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconNews() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 9h8M8 12h8M8 15h5" />
      <rect x="6.5" y="8.5" width="0.8" height="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconProfile() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 19c1.4-3.2 4-4.8 7-4.8s5.6 1.6 7 4.8" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 7V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2h6a2 2 0 002-2v-2" />
      <path d="M10 12h10" />
      <path d="M17 9l3 3-3 3" />
    </svg>
  );
}

export default function Sidebar({ open, email, tab, canTransact, onSelect, onClose, onLogout }: Props) {
  const navItems: Array<{ id: Tab; label: string; hidden?: boolean; icon: ReactNode }> = [
    { id: 'trade', label: 'Trade', icon: <IconTrade /> },
    { id: 'wallet', label: 'Wallet', hidden: !canTransact, icon: <IconWallet /> },
    { id: 'news', label: 'News', icon: <IconNews /> },
    { id: 'profile', label: 'Profile', icon: <IconProfile /> },
  ];

  return (
    <>
      <div
        className={`${open ? 'fixed inset-0 z-30 bg-black/45 md:hidden' : 'hidden'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-800 bg-slate-900/95 shadow-2xl transition-transform duration-300 md:static md:translate-x-0 md:shadow-none ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-amber-400 font-bold text-slate-900">
              G
            </div>
            <div>
              <h2 className="text-lg font-semibold text-amber-300">Goldcrest</h2>
              <p className="text-[11px] text-slate-400">Customer Portal</p>
            </div>
          </div>
          <button className="rounded-md border border-slate-700 px-2 py-1 text-xs md:hidden" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="p-4 pt-3">
          <p className="truncate text-xs text-slate-400">{email}</p>
        </div>
        <nav className="space-y-2 px-3 pb-3">
          {navItems
            .filter(i => !i.hidden)
            .map(item => (
              <button
                key={item.id}
                className={`w-full rounded-lg px-3 py-3 text-left text-base font-bold ${tab === item.id ? 'bg-amber-400 text-slate-900' : 'text-slate-200 hover:bg-slate-800'}`}
                onClick={() => onSelect(item.id)}
              >
                <span className="mr-3 inline-flex align-middle">{item.icon}</span>
                {item.label}
              </button>
            ))}
        </nav>
        <div className="mt-auto border-t border-slate-800 p-3">
          <button
            className="w-full rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-3 text-left text-base font-bold text-rose-300 hover:bg-rose-500/20"
            onClick={onLogout}
          >
            <span className="mr-3 inline-flex align-middle"><IconLogout /></span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

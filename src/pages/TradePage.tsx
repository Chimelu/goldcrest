import type { Market } from '../types';

type Props = {
  canTransact: boolean;
  availableUsd: string;
  markets: Market[];
  dashboardPath: string;
  onOpenAsset: (symbol: string) => void;
};

export default function TradePage({
  canTransact,
  availableUsd,
  markets,
  dashboardPath,
  onOpenAsset,
}: Props) {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h1 className="text-xl font-semibold">Trading Dashboard</h1>
            <p className="text-xs text-slate-400">Balance shows only when trading is enabled.</p>
          </div>
          {canTransact ? (
            <div className="text-right">
              <p className="text-xs text-slate-400">Available Balance</p>
              <p className="text-xl font-semibold text-amber-300">
                ${Number(availableUsd || 0).toLocaleString()}
              </p>
            </div>
          ) : null}
        </div>
        {dashboardPath ? (
          <svg viewBox="0 0 760 180" className="h-48 w-full rounded-xl border border-slate-700 bg-slate-950 p-2">
            <path d={dashboardPath} fill="none" stroke="#f5c451" strokeWidth="2.5" />
          </svg>
        ) : (
          <p className="text-sm text-slate-400">No chart data available.</p>
        )}
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <h2 className="text-lg font-semibold">Assets</h2>
        <p className="text-xs text-slate-400">Tap any coin to open its detail page.</p>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {markets.map(m => (
            <button
              key={m.id}
              className="rounded-xl border border-slate-700 p-3 text-left hover:border-amber-400/60 hover:bg-slate-800/60"
              onClick={() => onOpenAsset(m.symbol.toUpperCase())}
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {m.name} ({m.symbol.toUpperCase()})
                </p>
                <p className="text-sm">${Number(m.current_price).toLocaleString()}</p>
              </div>
              <p
                className={`text-xs ${Number(m.price_change_percentage_24h || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}
              >
                {(m.price_change_percentage_24h || 0).toFixed(2)}%
              </p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

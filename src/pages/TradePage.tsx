import { useState } from 'react';
import type { Market } from '../types';

type Props = {
  canTransact: boolean;
  totalUsd: number;
  cashUsd: number;
  cryptoValueUsd: number;
  availableUsd: string;
  markets: Market[];
  dashboardPath: string;
  onOpenAsset: (symbol: string) => void;
};

export default function TradePage({
  canTransact,
  totalUsd,
  cashUsd,
  cryptoValueUsd,
  availableUsd,
  markets,
  dashboardPath,
  onOpenAsset,
}: Props) {
  const firstAssetSymbol = markets[0]?.symbol?.toUpperCase();
  const [hideBalance, setHideBalance] = useState(false);
  const masked = '••••••';

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <div className="mb-3 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">Crypto portfolio</h1>
            <p className="text-xs text-slate-400">Chart-first view, like mobile trade dashboard.</p>
          </div>
          {canTransact ? (
            <div className="rounded-xl border border-slate-700/80 bg-slate-950/70 p-3 md:min-w-[320px]">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">Total balance</p>
                <button
                  className="rounded-md border border-slate-700 p-1.5 text-slate-300 hover:border-amber-400/70 hover:text-amber-300"
                  onClick={() => setHideBalance(v => !v)}
                  aria-label={hideBalance ? 'Show balance' : 'Hide balance'}
                  title={hideBalance ? 'Show balance' : 'Hide balance'}
                >
                  {hideBalance ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M3 3l18 18" />
                      <path d="M10.7 10.7a2 2 0 0 0 2.6 2.6" />
                      <path d="M9.4 5.5A10.9 10.9 0 0 1 12 5c5.5 0 9.5 4.2 10 7-.2 1-1 2.5-2.3 3.9" />
                      <path d="M6.1 6.1C4.2 7.4 2.8 9.2 2 12c.5 2.8 4.5 7 10 7 1.6 0 3-.3 4.2-.8" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="mt-1 text-2xl font-bold text-slate-100">
                {hideBalance ? masked : `$${totalUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </p>
              <p className="text-xs text-slate-500">
                {hideBalance
                  ? `${masked} cash + ${masked} crypto`
                  : `$${cashUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} cash + $${cryptoValueUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} crypto`}
              </p>
            </div>
          ) : null}
        </div>
        {canTransact ? (
          <div className="mb-3 grid grid-cols-2 gap-2 md:max-w-sm">
            <button
              className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60"
              onClick={() => firstAssetSymbol && onOpenAsset(firstAssetSymbol)}
              disabled={!firstAssetSymbol}
            >
              Buy
            </button>
            <button
              className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60"
              onClick={() => firstAssetSymbol && onOpenAsset(firstAssetSymbol)}
              disabled={!firstAssetSymbol}
            >
              Sell
            </button>
          </div>
        ) : null}
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
        <p className="text-xs text-slate-400">
          Tap any coin to open its detail page and trade form.
          {canTransact ? ` Available USD: $${Number(availableUsd || 0).toLocaleString()}` : ''}
        </p>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {markets.map(m => (
            <button
              key={m.id}
              className="rounded-xl border border-slate-700 p-3 text-left hover:border-amber-400/60 hover:bg-slate-800/60"
              onClick={() => onOpenAsset(m.symbol.toUpperCase())}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {m.image ? (
                    <img
                      src={m.image}
                      alt={`${m.name} logo`}
                      className="h-6 w-6 rounded-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-[10px] font-bold text-slate-200">
                      {m.symbol.toUpperCase().slice(0, 2)}
                    </div>
                  )}
                  <p className="font-medium">
                    {m.name} ({m.symbol.toUpperCase()})
                  </p>
                </div>
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

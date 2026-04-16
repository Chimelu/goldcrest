import { COIN_ABOUT } from '../constants/coins';
import type { Market, NewsItem } from '../types';

type ChartPeriod = '24H' | '7D' | '30D';

type Props = {
  selected: string;
  selectedMarket?: Market;
  detailPath: string;
  detailPeriod: ChartPeriod;
  detailChartLoading: boolean;
  selectedHolding: string;
  availableUsd: number;
  canTransact: boolean;
  spendUsd: string;
  sellAmount: string;
  news: NewsItem[];
  setSpendUsd: (v: string) => void;
  setSellAmount: (v: string) => void;
  onSetDetailPeriod: (period: ChartPeriod) => void;
  onBack: () => void;
  onBuy: () => void;
  onSell: () => void;
};

export default function AssetPage(props: Props) {
  const {
    selected,
    selectedMarket,
    detailPath,
    detailPeriod,
    detailChartLoading,
    selectedHolding,
    availableUsd,
    canTransact,
    spendUsd,
    sellAmount,
    news,
    setSpendUsd,
    setSellAmount,
    onSetDetailPeriod,
    onBack,
    onBuy,
    onSell,
  } = props;

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">{selectedMarket?.name || selected} details</h2>
          <button className="rounded-lg border border-slate-700 px-3 py-1 text-xs" onClick={onBack}>
            Back to trade
          </button>
        </div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs text-slate-400">Performance</p>
          <div className="flex items-center gap-2">
            {(['24H', '7D', '30D'] as ChartPeriod[]).map(period => (
              <button
                key={period}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                  detailPeriod === period
                    ? 'border-amber-400 bg-amber-400 text-slate-900'
                    : 'border-slate-600 text-slate-200 hover:border-amber-400/70 hover:text-amber-300'
                }`}
                onClick={() => onSetDetailPeriod(period)}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 760 180" className="h-48 w-full rounded-xl border border-slate-700 bg-slate-950 p-2">
          {detailPath ? <path d={detailPath} fill="none" stroke="#f5c451" strokeWidth="2.5" /> : null}
        </svg>
        {detailChartLoading ? <p className="mt-2 text-xs text-slate-400">Loading chart...</p> : null}
        <p className="mt-3 text-sm text-slate-300">
          {COIN_ABOUT[selected] || 'No description available for this asset.'}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Current price: ${Number(selectedMarket?.current_price || 0).toLocaleString()}
        </p>
        <p className="text-xs text-slate-400">
          Your holding: {selectedHolding} {selected}
        </p>
      </section>

      {canTransact ? (
        <>
        <section className="rounded-2xl border border-amber-300/35 bg-amber-300/10 p-4">
          <h3 className="text-sm font-semibold text-amber-300">Your balances</h3>
          <p className="mt-2 text-sm text-slate-100">
            USD available: ${availableUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-slate-200">
            {selected} held: {selectedHolding} {selected}
          </p>
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4">
          <h3 className="text-base font-semibold">Trade {selected}</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs text-slate-300">You spend (USD)</p>
              <input
                className="w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
                type="number"
                step="0.01"
                placeholder="You spend (USD)"
                value={spendUsd}
                onChange={e => setSpendUsd(e.target.value)}
              />
              <button className="w-full rounded-xl bg-amber-400 py-2 font-semibold text-slate-900" onClick={onBuy}>
                Buy {selected}
              </button>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-slate-300">You sell ({selected})</p>
              <input
                className="w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
                type="number"
                step="0.00000001"
                placeholder={`You sell (${selected})`}
                value={sellAmount}
                onChange={e => setSellAmount(e.target.value)}
              />
              <button className="w-full rounded-xl border border-slate-700 py-2" onClick={onSell}>
                Sell {selected}
              </button>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Estimated fee</span>
            <span>$0.00</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
            <span>Order type</span>
            <span>Market</span>
          </div>
        </section>
        </>
      ) : null}

      <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <h3 className="text-base font-semibold">Trending</h3>
        <div className="mt-2 space-y-2">
          {news.map(n => (
            <a
              key={n.id}
              href={n.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-slate-700 p-3 text-sm hover:border-amber-400/60"
            >
              {n.title}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

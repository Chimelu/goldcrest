import type { Withdrawal } from '../types';

type Props = {
  totalUsd: number;
  cashUsd: number;
  cryptoValueUsd: number;
  withdrawUsd: string;
  withdrawAddress: string;
  withdrawNetwork: string;
  withdrawals: Withdrawal[];
  setWithdrawUsd: (v: string) => void;
  setWithdrawAddress: (v: string) => void;
  setWithdrawNetwork: (v: string) => void;
  onCreateWithdrawal: () => void;
};

export default function WalletPage(props: Props) {
  const {
    totalUsd,
    cashUsd,
    cryptoValueUsd,
    withdrawUsd,
    withdrawAddress,
    withdrawNetwork,
    withdrawals,
    setWithdrawUsd,
    setWithdrawAddress,
    setWithdrawNetwork,
    onCreateWithdrawal,
  } = props;

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <p className="text-xs text-slate-400">Total value</p>
        <p className="mt-1 text-3xl font-bold text-slate-100">
          ${totalUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          ${cashUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} cash + $
          {cryptoValueUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} crypto
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <h2 className="text-lg font-semibold">Withdraw USD</h2>
          <p className="mb-3 text-xs text-slate-400">
            Enter amount, destination address and network. This follows the same flow as mobile.
          </p>
          <div className="space-y-2">
            <input
              className="w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
              type="number"
              step="0.01"
              placeholder="Amount (USD)"
              value={withdrawUsd}
              onChange={e => setWithdrawUsd(e.target.value)}
            />
            <input
              className="w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
              placeholder="Destination address"
              value={withdrawAddress}
              onChange={e => setWithdrawAddress(e.target.value)}
            />
            <div className="grid grid-cols-3 gap-2">
              {['ERC20', 'TRC20', 'BEP20'].map(network => (
                <button
                  key={network}
                  type="button"
                  onClick={() => setWithdrawNetwork(network)}
                  className={`rounded-full border px-3 py-2 text-xs font-semibold ${withdrawNetwork === network ? 'border-amber-400 bg-amber-400 text-slate-900' : 'border-slate-600 text-slate-300'}`}
                >
                  {network}
                </button>
              ))}
            </div>
            <button className="w-full rounded-xl bg-amber-400 py-2 font-semibold text-slate-900" onClick={onCreateWithdrawal}>
              Submit withdrawal
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <h2 className="text-lg font-semibold">Withdrawal History</h2>
          <div className="mt-3 space-y-2">
            {withdrawals.length === 0 ? (
              <p className="text-sm text-slate-400">No withdrawals yet.</p>
            ) : (
              withdrawals.map(w => (
                <div key={w.id} className="rounded-xl border border-slate-700 p-3 text-sm">
                  <p className="font-medium">
                    ${w.amountUsd} • {w.status}
                  </p>
                  <p className="text-slate-400">
                    {w.network} • {w.destinationAddress.slice(0, 16)}...
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

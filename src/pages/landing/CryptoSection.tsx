const coins = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    copy: 'The most recognized crypto asset, often viewed as digital gold.',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    copy: 'A leading smart contract platform powering decentralized applications.',
  },
  {
    name: 'Tether',
    symbol: 'USDT',
    image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
    copy: 'A USD-pegged stablecoin commonly used for market liquidity.',
  },
  {
    name: 'BNB',
    symbol: 'BNB',
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    copy: 'A major ecosystem token with broad utility across products.',
  },
];

export default function CryptoSection() {
  return (
    <section id="crypto" className="border-b border-slate-800">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wide text-amber-300">Crypto Market</p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Learn the assets you track</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Crypto assets move fast. Goldcrest helps you follow core coins with clean data, price movement,
            and chart visibility so you can make informed decisions.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coins.map(coin => (
            <article key={coin.symbol} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="mb-3 flex items-center gap-3">
                <img src={coin.image} alt={`${coin.name} logo`} className="h-10 w-10 rounded-full" />
                <div>
                  <p className="font-bold">{coin.name}</p>
                  <p className="text-xs text-slate-400">{coin.symbol}</p>
                </div>
              </div>
              <p className="text-sm text-slate-300">{coin.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

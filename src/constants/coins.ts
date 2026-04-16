export const API_BASE = 'https://goldcrest-backend.vercel.app';
export const TOKEN_KEY = 'goldcrest_web_token';
export const COINS = ['bitcoin', 'ethereum', 'tether', 'binancecoin', 'ripple', 'dogecoin', 'litecoin', 'stellar'];

export const SYMBOL_TO_COIN_ID: Record<string, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  USDT: 'tether',
  BNB: 'binancecoin',
  XRP: 'ripple',
  DOGE: 'dogecoin',
  LTC: 'litecoin',
  XLM: 'stellar',
};

export const COIN_ABOUT: Record<string, string> = {
  BTC: 'Bitcoin is the first decentralized cryptocurrency and often viewed as digital gold.',
  ETH: 'Ethereum is a programmable blockchain used for smart contracts and decentralized apps.',
  USDT: 'Tether is a stablecoin designed to track the US Dollar value.',
  BNB: 'BNB is the utility coin of the BNB Chain ecosystem.',
  XRP: 'XRP is designed for fast, low-cost cross-border value transfers.',
  DOGE: 'Dogecoin is a community-driven cryptocurrency known for fast transfers and broad exchange support.',
  LTC: 'Litecoin is a peer-to-peer cryptocurrency optimized for faster block times than Bitcoin.',
  XLM: 'Stellar enables fast, low-cost cross-border transfers and asset movement on its decentralized network.',
};

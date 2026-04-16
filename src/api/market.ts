import { COINS } from '../constants/coins';
import type { NewsItem } from '../types';

export async function getMarkets() {
  return fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COINS.join(',')}`,
  ).then(r => r.json());
}

export async function getCoinChartPoints(coinId: string, days: number): Promise<number[]> {
  const json = await fetch(
    `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(coinId)}/market_chart?vs_currency=usd&days=${days}`,
  ).then(r => r.json());

  return Array.isArray(json?.prices)
    ? json.prices
        .map((p: [number, number]) => Number(p[1]))
        .filter((n: number) => Number.isFinite(n))
    : [];
}

export async function getTrendingNews(): Promise<NewsItem[]> {
  const json = await fetch('https://api.coingecko.com/api/v3/search/trending').then(r => r.json());
  return Array.isArray(json?.coins)
    ? json.coins.slice(0, 6).map((c: any, i: number) => ({
        id: String(c?.item?.id || i),
        title: `${String(c?.item?.name || 'Coin')} (${String(c?.item?.symbol || '').toUpperCase()}) trending`,
        url: `https://www.coingecko.com/en/coins/${String(c?.item?.id || '')}`,
      }))
    : [];
}

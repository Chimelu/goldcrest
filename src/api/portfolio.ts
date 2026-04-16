import { apiRequest, authHeaders } from './client';

export async function getPortfolioSummary(token: string) {
  return apiRequest('/portfolio/summary', { headers: authHeaders(token) });
}

export async function getWithdrawals(token: string) {
  return apiRequest('/portfolio/withdrawals', { headers: authHeaders(token) });
}

export async function buyCrypto(token: string, symbol: string, spendUsd: number) {
  return apiRequest('/portfolio/buy', {
    method: 'POST',
    headers: authHeaders(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify({ symbol, spendUsd }),
  });
}

export async function sellCrypto(token: string, symbol: string, cryptoAmount: number) {
  return apiRequest('/portfolio/sell', {
    method: 'POST',
    headers: authHeaders(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify({ symbol, cryptoAmount }),
  });
}

export async function createWithdrawal(
  token: string,
  payload: { amountUsd: number; destinationAddress: string; network: string },
) {
  return apiRequest('/portfolio/withdrawals', {
    method: 'POST',
    headers: authHeaders(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload),
  });
}

import { API_BASE } from '../constants/coins';

export function api(path: string): string {
  return `${API_BASE}${path}`;
}

export async function apiRequest(path: string, init?: RequestInit): Promise<any> {
  const res = await fetch(api(path), init);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || 'Request failed');
  return json;
}

export function authHeaders(token: string | null, extra?: HeadersInit): HeadersInit {
  return token
    ? { ...(extra || {}), Authorization: `Bearer ${token}` }
    : { ...(extra || {}) };
}

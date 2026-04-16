export type Tab = 'trade' | 'wallet' | 'profile' | 'asset' | 'news';
export type AuthMode = 'login' | 'register' | 'verify' | 'forgot' | 'reset';

export type Holding = {
  symbol: string;
  quantity: string;
};

export type Market = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h?: number;
};

export type Withdrawal = {
  id: number;
  amountUsd: string;
  destinationAddress: string;
  network: string;
  status: string;
  createdAt: string;
};

export type NewsItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  email?: string;
  fullName?: string | null;
  canTransact?: boolean;
};

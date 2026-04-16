import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import AuthCard from './components/AuthCard';
import Sidebar from './components/Sidebar';
import TradePage from './pages/TradePage';
import AssetPage from './pages/AssetPage';
import WalletPage from './pages/WalletPage';
import ProfilePage from './pages/ProfilePage';
import NewsPage from './pages/NewsPage';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { TOKEN_KEY, SYMBOL_TO_COIN_ID } from './constants/coins';
import { chartPathFromPoints } from './utils/chart';
import type { AuthMode, Holding, Market, NewsItem, Profile, Tab, Withdrawal } from './types';
import {
  deleteAccount as deleteAccountApi,
  forgotPassword,
  getProfile,
  login,
  register,
  resetPassword,
  verifyOtp,
  verifyResetOtp,
} from './api/auth';
import {
  buyCrypto,
  createWithdrawal as createWithdrawalApi,
  getPortfolioSummary,
  getWithdrawals,
  sellCrypto,
} from './api/portfolio';
import { getCoinChartPoints, getMarkets, getTrendingNews } from './api/market';

type ChartPeriod = '24H' | '7D' | '30D';

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));
  const [tab, setTab] = useState<Tab>('trade');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [publicPath, setPublicPath] = useState<'/' | '/about' | '/contact' | '/auth'>(
    () => {
      const p = window.location.pathname;
      if (p === '/about' || p === '/contact' || p === '/auth') return p;
      return '/';
    },
  );

  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authInfo, setAuthInfo] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [profile, setProfile] = useState<Profile | null>(null);
  const [portfolio, setPortfolio] = useState<{ availableUsd: string; holdings: Holding[] } | null>(null);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selected, setSelected] = useState<string>('BTC');
  const [dashboardChartPoints, setDashboardChartPoints] = useState<number[]>([]);
  const [detailChartPoints, setDetailChartPoints] = useState<number[]>([]);
  const [detailPeriod, setDetailPeriod] = useState<ChartPeriod>('7D');
  const [detailChartLoading, setDetailChartLoading] = useState(false);
  const [spendUsd, setSpendUsd] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [withdrawUsd, setWithdrawUsd] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawNetwork, setWithdrawNetwork] = useState('TRC20');
  const [loadingData, setLoadingData] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const canTransact = Boolean(profile?.canTransact);
  const selectedMarket = useMemo(() => markets.find(m => m.symbol.toUpperCase() === selected), [markets, selected]);
  const selectedHolding = useMemo(
    () => portfolio?.holdings.find(h => h.symbol.toUpperCase() === selected)?.quantity || '0',
    [portfolio, selected],
  );
  const cashUsd = useMemo(() => Number(portfolio?.availableUsd || 0), [portfolio]);
  const cryptoValueUsd = useMemo(() => {
    const bySymbol = new Map(markets.map(m => [m.symbol.toUpperCase(), Number(m.current_price)]));
    return (portfolio?.holdings || []).reduce((sum, h) => {
      const qty = Number(h.quantity);
      const px = bySymbol.get(h.symbol.toUpperCase()) || 0;
      return sum + (Number.isFinite(qty) ? qty * px : 0);
    }, 0);
  }, [portfolio, markets]);
  const totalUsd = cashUsd + cryptoValueUsd;
  const selectedCoinId = useMemo(() => {
    return SYMBOL_TO_COIN_ID[selected] || 'bitcoin';
  }, [selected]);
  const dashboardPath = useMemo(() => chartPathFromPoints(dashboardChartPoints), [dashboardChartPoints]);
  const detailPath = useMemo(() => chartPathFromPoints(detailChartPoints), [detailChartPoints]);

  useEffect(() => {
    if (!token) return;
    void loadAll();
  }, [token]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(true);
      if (window.innerWidth < 768) setSidebarOpen(false);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const p = window.location.pathname;
      if (p === '/about' || p === '/contact' || p === '/auth') setPublicPath(p);
      else setPublicPath('/');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (token) return;
    const normalized = showAuthForm ? '/auth' : publicPath;
    if (window.location.pathname !== normalized) {
      window.history.replaceState({}, '', normalized);
    }
  }, [token, showAuthForm, publicPath]);

  const navigatePublic = (path: '/' | '/about' | '/contact' | '/auth') => {
    setPublicPath(path);
    window.history.pushState({}, '', path);
    setShowAuthForm(path === '/auth');
  };

  useEffect(() => {
    if (!token) return;
    void loadCoinData(selectedCoinId, detailPeriod);
  }, [token, selectedCoinId, detailPeriod]);

  useEffect(() => {
    if (!token) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [token, tab]);

  async function loadAll() {
    try {
      setLoadingData(true);
      setActionError(null);
      if (!token) return;
      const [p, s, w, m] = await Promise.all([
        getProfile(token),
        getPortfolioSummary(token),
        getWithdrawals(token),
        getMarkets(),
      ]);
      setProfile(p);
      setPortfolio({
        availableUsd: String(s.availableUsd),
        holdings: (s.holdings || []).map((h: any) => ({ symbol: String(h.symbol), quantity: String(h.quantity) })),
      });
      setWithdrawals((w.withdrawals || []) as Withdrawal[]);
      setMarkets((m || []) as Market[]);
    } catch (e) {
      setActionError(e instanceof Error ? e.message : 'Could not load data');
    } finally {
      setLoadingData(false);
    }
  }

  async function loadCoinData(coinId: string, period: ChartPeriod) {
    const detailDays = period === '24H' ? 1 : period === '30D' ? 30 : 7;
    try {
      setDetailChartLoading(true);
      const [dash, detail, items] = await Promise.all([
        getCoinChartPoints(coinId, 1),
        getCoinChartPoints(coinId, detailDays),
        getTrendingNews(),
      ]);
      const safeDash = dash.length > 1 ? dash : detail;
      const safeDetail = detail.length > 1 ? detail : safeDash;
      setDashboardChartPoints(safeDash);
      setDetailChartPoints(safeDetail);
      setNews(items);
    } catch {
      setDashboardChartPoints(prev => (prev.length > 1 ? prev : []));
      setDetailChartPoints(prev => (prev.length > 1 ? prev : []));
      setNews([]);
    } finally {
      setDetailChartLoading(false);
    }
  }

  function saveToken(next: string | null) {
    setToken(next);
    if (next) localStorage.setItem(TOKEN_KEY, next);
    else localStorage.removeItem(TOKEN_KEY);
  }

  async function submitAuth(e: FormEvent) {
    e.preventDefault();
    setAuthError(null);
    setAuthInfo(null);
    setAuthLoading(true);
    try {
      if (authMode === 'login') {
        const j = await login(email, password);
        saveToken(String(j.token));
      } else if (authMode === 'register') {
        const j = await register(fullName, email, password);
        setAuthInfo(String(j.message || 'Verification code sent.'));
        setAuthMode('verify');
      } else if (authMode === 'verify') {
        const j = await verifyOtp(email, otp);
        setAuthInfo(String(j.message || 'Verified. Login now.'));
        setAuthMode('login');
      } else if (authMode === 'forgot') {
        const j = await forgotPassword(email);
        setAuthInfo(String(j.message || 'Reset code sent.'));
        setAuthMode('reset');
      } else if (authMode === 'reset') {
        if (!resetToken) {
          const j = await verifyResetOtp(email, otp);
          setResetToken(String(j.resetToken || ''));
          setAuthInfo('Code verified. Enter your new password.');
        } else {
          const j = await resetPassword(resetToken, newPassword);
          setAuthInfo(String(j.message || 'Password reset complete.'));
          setAuthMode('login');
          setResetToken('');
          setOtp('');
          setNewPassword('');
        }
      }
    } catch (e) {
      setAuthError(e instanceof Error ? e.message : 'Authentication failed');
    } finally {
      setAuthLoading(false);
    }
  }

  async function buy() {
    if (!canTransact) return setActionError('Trading is disabled for this account.');
    try {
      setActionError(null);
      if (!token) return;
      const j = await buyCrypto(token, selected, Number(spendUsd));
      setActionMessage(`Bought ${j.cryptoAmount} ${selected}.`);
      setSpendUsd('');
      await loadAll();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : 'Buy failed');
    }
  }

  async function sell() {
    if (!canTransact) return setActionError('Trading is disabled for this account.');
    try {
      setActionError(null);
      if (!token) return;
      const j = await sellCrypto(token, selected, Number(sellAmount));
      setActionMessage(`Sold ${j.cryptoAmount} ${selected}.`);
      setSellAmount('');
      await loadAll();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : 'Sell failed');
    }
  }

  async function createWithdrawal() {
    if (!canTransact) return setActionError('Withdrawals are disabled for this account.');
    try {
      setActionError(null);
      if (!token) return;
      await createWithdrawalApi(token, {
        amountUsd: Number(withdrawUsd),
        destinationAddress: withdrawAddress,
        network: withdrawNetwork,
      });
      setActionMessage('Withdrawal request submitted.');
      setWithdrawUsd('');
      setWithdrawAddress('');
      await loadAll();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : 'Withdrawal failed');
    }
  }

  async function deleteAccount() {
    if (!window.confirm('Delete account permanently?')) return;
    try {
      if (!token) return;
      await deleteAccountApi(token);
      saveToken(null);
      setProfile(null);
      setPortfolio(null);
      setWithdrawals([]);
    } catch (e) {
      setActionError(e instanceof Error ? e.message : 'Delete failed');
    }
  }

  if (!token) {
    if (!showAuthForm && publicPath === '/about') {
      return (
        <AboutPage
          onLogin={() => {
            setAuthMode('login');
            navigatePublic('/auth');
          }}
          onRegister={() => {
            setAuthMode('register');
            navigatePublic('/auth');
          }}
          onNavigate={navigatePublic}
        />
      );
    }

    if (!showAuthForm && publicPath === '/contact') {
      return (
        <ContactPage
          onLogin={() => {
            setAuthMode('login');
            navigatePublic('/auth');
          }}
          onRegister={() => {
            setAuthMode('register');
            navigatePublic('/auth');
          }}
          onNavigate={navigatePublic}
        />
      );
    }

    if (!showAuthForm) {
      return (
        <LandingPage
          onRegister={() => {
            setAuthMode('register');
            navigatePublic('/auth');
          }}
          onNavigate={navigatePublic}
        />
      );
    }

    return (
      <div className="min-h-screen bg-slate-950">
        <div className="mx-auto max-w-3xl px-3 py-6 md:px-4 md:py-8">
          <AuthCard
            authMode={authMode}
            authLoading={authLoading}
            authError={authError}
            authInfo={authInfo}
            email={email}
            password={password}
            fullName={fullName}
            otp={otp}
            resetToken={resetToken}
            newPassword={newPassword}
            setAuthMode={setAuthMode}
            setEmail={setEmail}
            setPassword={setPassword}
            setFullName={setFullName}
            setOtp={setOtp}
            setResetToken={setResetToken}
            setNewPassword={setNewPassword}
            onLogoClick={() => {
              setShowAuthForm(false);
              navigatePublic('/');
            }}
            onSubmit={submitAuth}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar
          open={sidebarOpen}
          email={profile?.email}
          tab={tab}
          canTransact={canTransact}
          onClose={() => setSidebarOpen(false)}
          onLogout={() => {
            saveToken(null);
            setProfile(null);
          }}
          onSelect={(next) => {
            setTab(next);
            if (window.innerWidth < 768) setSidebarOpen(false);
          }}
        />

        <main className="w-full flex-1 p-4 md:p-6">
          <header className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
            <div className="flex items-center gap-2">
              <button
                className="rounded-lg border border-slate-700 px-3 py-1 text-sm"
                onClick={() => setSidebarOpen(v => !v)}
                aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
                title={sidebarOpen ? 'Close menu' : 'Open menu'}
              >
                {sidebarOpen ? '✕' : '☰'}
              </button>
            </div>
          </header>

          {actionError ? <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{actionError}</div> : null}
          {actionMessage ? <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">{actionMessage}</div> : null}
          {loadingData ? <p className="mb-4 text-sm text-slate-400">Loading...</p> : null}

          {tab === 'trade' && <TradePage canTransact={canTransact} totalUsd={totalUsd} cashUsd={cashUsd} cryptoValueUsd={cryptoValueUsd} availableUsd={portfolio?.availableUsd || '0'} markets={markets} dashboardPath={dashboardPath} onOpenAsset={(symbol) => { setSelected(symbol); setTab('asset'); }} />}

          {tab === 'asset' && <AssetPage selected={selected} selectedMarket={selectedMarket} detailPath={detailPath} detailPeriod={detailPeriod} detailChartLoading={detailChartLoading} selectedHolding={selectedHolding} availableUsd={cashUsd} canTransact={canTransact} spendUsd={spendUsd} sellAmount={sellAmount} news={news} setSpendUsd={setSpendUsd} setSellAmount={setSellAmount} onSetDetailPeriod={setDetailPeriod} onBack={() => setTab('trade')} onBuy={() => void buy()} onSell={() => void sell()} />}

          {tab === 'wallet' && canTransact && <WalletPage totalUsd={totalUsd} cashUsd={cashUsd} cryptoValueUsd={cryptoValueUsd} withdrawUsd={withdrawUsd} withdrawAddress={withdrawAddress} withdrawNetwork={withdrawNetwork} withdrawals={withdrawals} setWithdrawUsd={setWithdrawUsd} setWithdrawAddress={setWithdrawAddress} setWithdrawNetwork={setWithdrawNetwork} onCreateWithdrawal={() => void createWithdrawal()} />}

          {tab === 'profile' && <ProfilePage fullName={profile?.fullName} email={profile?.email} canTransact={canTransact} onDeleteAccount={() => void deleteAccount()} />}

          {tab === 'news' && <NewsPage news={news} />}
        </main>
      </div>
    </div>
  );
}

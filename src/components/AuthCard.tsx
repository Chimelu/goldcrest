import type { FormEvent } from 'react';
import type { AuthMode } from '../types';

type Props = {
  authMode: AuthMode;
  authLoading: boolean;
  authError: string | null;
  authInfo: string | null;
  email: string;
  password: string;
  fullName: string;
  otp: string;
  resetToken: string;
  newPassword: string;
  setAuthMode: (mode: AuthMode) => void;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  setFullName: (v: string) => void;
  setOtp: (v: string) => void;
  setResetToken: (v: string) => void;
  setNewPassword: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
  onLogoClick?: () => void;
};

export default function AuthCard(props: Props) {
  const {
    authMode,
    authLoading,
    authError,
    authInfo,
    email,
    password,
    fullName,
    otp,
    resetToken,
    newPassword,
    setAuthMode,
    setEmail,
    setPassword,
    setFullName,
    setOtp,
    setResetToken,
    setNewPassword,
    onSubmit,
    onLogoClick,
  } = props;
  const isRegister = authMode === 'register';
  const isLogin = authMode === 'login';

  return (
    <div className="p-3 text-slate-100 md:p-6">
      <div className="mx-auto w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900/80 p-5 md:p-8">
        <div className="mb-4 flex items-center gap-3">
          <button
            type="button"
            onClick={onLogoClick}
            aria-label="Go to home"
            className="rounded-xl border border-slate-700"
          >
            <img src="/goldcrest-logo.png" alt="Goldcrest logo" className="h-12 w-12 rounded-xl object-cover" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-amber-300">
              {isRegister ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              {isRegister ? 'Register to start using Goldcrest.' : 'Sign in to continue.'}
            </p>
          </div>
        </div>

        <form className="mt-6 space-y-3" onSubmit={onSubmit}>
          {authMode === 'register' && (
            <input className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" placeholder="Full name" value={fullName} onChange={e => setFullName(e.target.value)} />
          )}
          <input className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          {(authMode === 'login' || authMode === 'register') && (
            <input className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          )}
          {(authMode === 'verify' || authMode === 'reset') && !resetToken && (
            <input className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" placeholder="6-digit OTP" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} />
          )}
          {authMode === 'reset' && Boolean(resetToken) && (
            <input className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" placeholder="New password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          )}
          {authError ? <p className="text-sm text-rose-400">{authError}</p> : null}
          {authInfo ? <p className="text-sm text-emerald-400">{authInfo}</p> : null}
          <button className="w-full rounded-xl bg-amber-400 py-2 font-semibold text-slate-900">
            {authLoading ? 'Please wait...' : 'Continue'}
          </button>
        </form>

        {isLogin ? (
          <div className="mt-4 flex items-center justify-between text-xs">
            <button
              className="text-slate-300 hover:text-amber-300"
              onClick={() => {
                setAuthMode('forgot');
                setResetToken('');
              }}
            >
              Forgot password?
            </button>
            <button className="rounded-lg border border-slate-700 px-2 py-1" onClick={() => setAuthMode('register')}>
              Create account
            </button>
          </div>
        ) : null}

        {isRegister ? (
          <div className="mt-4 text-right text-xs">
            <button className="text-slate-300 hover:text-amber-300" onClick={() => setAuthMode('login')}>
              Already have an account? Login
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

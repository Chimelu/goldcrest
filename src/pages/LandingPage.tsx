import LandingHeader from './landing/LandingHeader';
import HeroSection from './landing/HeroSection';
import CryptoSection from './landing/CryptoSection';
import AppSection from './landing/AppSection';
import LandingFooter from './landing/LandingFooter';

type Props = {
  onRegister: () => void;
  onNavigate: (path: '/' | '/about' | '/contact' | '/auth') => void;
};

export default function LandingPage({ onRegister, onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <LandingHeader onNavigate={onNavigate} />
      <main>
        <HeroSection onGetStarted={onRegister} />
        <CryptoSection />
        <AppSection />
      </main>
      <LandingFooter onNavigate={onNavigate} />
    </div>
  );
}

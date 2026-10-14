import React from 'react';
import {
  HeartPulse,
  Home,
  Pill,
  Settings,
  Stethoscope,
  History as HistoryIcon,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { NavigationTab } from '../../types';

const NAV_ITEMS: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'medicines', label: 'My Medicines', icon: Pill },
  { id: 'healthcare', label: 'Healthcare', icon: Stethoscope },
  { id: 'history', label: 'History', icon: HistoryIcon },
  { id: 'profile', label: 'Profile & Settings', icon: Settings },
];

const Brand: React.FC<{ onClose?: () => void }> = ({ onClose }) => (
  <div className="flex items-center justify-between px-2">
    <div className="flex items-center gap-3">
      <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/40">
        <HeartPulse className="w-6 h-6 text-white" />
      </div>
      <span className="text-xl font-extrabold tracking-tight text-slate-800">
        Med<span className="text-blue-600">Reminder</span>
      </span>
    </div>
    {onClose && (
      <button onClick={onClose} className="lg:hidden p-2 text-slate-500 hover:text-slate-800" aria-label="Close menu">
        <X className="w-5 h-5" />
      </button>
    )}
  </div>
);

const NavList: React.FC<{ onNavigate?: () => void }> = ({ onNavigate }) => {
  const { activeTab, setActiveTab } = useApp();
  return (
    <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              onNavigate?.();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all text-left ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/40'
                : 'text-slate-600 hover:bg-white/70 hover:text-blue-700'
            }`}
          >
            <Icon className="w-5 h-5" />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
};

const QuoteCard: React.FC = () => (
  <div className="glass-item rounded-3xl p-4 flex items-end justify-between gap-2">
    <p className="text-sm font-semibold text-slate-600 leading-snug">
      “Better Medication, Brighter Tomorrows”
    </p>
    <div className="h-11 w-11 shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/40">
      <HeartPulse className="w-6 h-6 text-white" />
    </div>
  </div>
);

export const Sidebar: React.FC<{
  mobileOpen: boolean;
  onCloseMobile: () => void;
}> = ({ mobileOpen, onCloseMobile }) => (
  <>
    {/* Desktop */}
    <aside className="hidden lg:flex sticky top-0 h-screen w-[276px] shrink-0 flex-col gap-4 p-4 z-30">
      <div className="glass-strong rounded-[28px] flex flex-col h-full p-4">
        <Brand />
        <NavList />
        <QuoteCard />
      </div>
    </aside>

    {/* Mobile drawer */}
    {mobileOpen && (
      <div className="lg:hidden fixed inset-0 z-40 flex">
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onCloseMobile} />
        <div className="relative w-72 h-full p-3 animate-pop">
          <div className="glass-strong rounded-[28px] flex flex-col h-full p-4">
            <Brand onClose={onCloseMobile} />
            <NavList onNavigate={onCloseMobile} />
            <QuoteCard />
          </div>
        </div>
      </div>
    )}
  </>
);
import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { DashboardView } from './views/DashboardView';
import { HealthcareView } from './views/HealthcareView';
import { HistoryView } from './views/HistoryView';
import { MyMedicinesView } from './views/MyMedicinesView';
import { ProfileView } from './views/ProfileView';
import type { NavigationTab } from './types';

const SEARCH_PLACEHOLDERS: Record<NavigationTab, string> = {
  dashboard: 'Search medicines, history, or doctors...',
  medicines: 'Search medicines, categories, or instructions...',
  healthcare: 'Search doctors, specialties, or articles...',
  history: 'Search dose history or dates...',
  profile: 'Search settings or caregivers...',
};

const Shell: React.FC = () => {
  const { activeTab } = useApp();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      {/* Colorful blurred backdrop */}
      <div className="pills-backdrop" aria-hidden="true" />

      <div className="relative min-h-screen flex">
        <Sidebar mobileOpen={mobileNavOpen} onCloseMobile={() => setMobileNavOpen(false)} />

        <div className="flex-1 min-w-0 flex flex-col">
          {/* Top bar */}
          <div className="sticky top-0 z-20 px-3 sm:px-5 pt-3 sm:pt-4 pb-2 backdrop-blur-xl bg-white/10">
            <TopBar
              placeholder={SEARCH_PLACEHOLDERS[activeTab]}
              onOpenMobileSidebar={() => setMobileNavOpen(true)}
            />
          </div>

          {/* Content */}
          <main className="px-3 sm:px-5 pb-10 flex-1">
            <div className="animate-pop" key={activeTab}>
              {activeTab === 'dashboard' && <DashboardView />}
              {activeTab === 'medicines' && <MyMedicinesView />}
              {activeTab === 'healthcare' && <HealthcareView />}
              {activeTab === 'history' && <HistoryView />}
              {activeTab === 'profile' && <ProfileView />}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
import React from 'react';
import { Bell, ChevronDown, Menu, Search } from 'lucide-react';
import { USER_PROFILE } from '../../data/healthcareData';

export const TopBar: React.FC<{
  placeholder: string;
  onOpenMobileSidebar: () => void;
}> = ({ placeholder, onOpenMobileSidebar }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <button
        onClick={onOpenMobileSidebar}
        className="lg:hidden glass-item rounded-2xl p-2.5 text-slate-600 hover:text-blue-700"
        aria-label="Open navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-xl glass-item rounded-full flex items-center gap-2.5 px-4 py-2.5">
        <Search className="w-4 h-4 text-blue-500 shrink-0" />
        <input
          className="flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none chip-input min-w-0"
          placeholder={placeholder}
        />
      </div>

      {/* Bell */}
      <button className="relative glass-item rounded-full p-2.5 text-slate-600 hover:text-blue-700" aria-label="Notifications">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
      </button>

      {/* Profile chip */}
      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="glass-item rounded-full flex items-center gap-2.5 pl-1.5 pr-3 py-1.5"
        >
          <span className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 text-white text-sm font-bold flex items-center justify-center">
            K
          </span>
          <span className="hidden sm:block text-left leading-tight">
            <span className="block text-sm font-extrabold text-slate-800">{USER_PROFILE.name}</span>
            <span className="block text-[11px] font-semibold text-blue-600">{USER_PROFILE.role}</span>
          </span>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-12 z-20 w-44 glass-strong rounded-2xl p-1.5 animate-pop">
              {['My Profile', 'Settings', 'Log Out'].map((item) => (
                <button
                  key={item}
                  onClick={() => setOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
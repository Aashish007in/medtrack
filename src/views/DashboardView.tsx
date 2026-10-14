import React from 'react';
import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  Lightbulb,
  MoreVertical,
  Pill,
  Plus,
  Stethoscope,
  XCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Panel, SectionTitle, StatusBadge, Tile } from '../components/ui';
import { BarChart, DonutChart } from '../components/charts';
import { TODAY_LABEL, WEEKLY_ADHERENCE } from '../data/mockData';
import { USER_PROFILE } from '../data/healthcareData';

/* ---------------- Small helpers ---------------- */
const BarChart3Icon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600" fill="currentColor">
    <rect x="3" y="13" width="4" height="7" rx="1" />
    <rect x="10" y="8" width="4" height="12" rx="1" />
    <rect x="17" y="4" width="4" height="16" rx="1" />
  </svg>
);

const SelectPill: React.FC<{ label: string }> = ({ label }) => (
  <button className="glass-item rounded-xl px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 flex items-center gap-1.5">
    {label}
    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="m6 9 6 6 6-6" />
    </svg>
  </button>
);

const StatCard: React.FC<{ icon: React.ReactNode; value: number; label: string; ring: string }> = ({
  icon,
  value,
  label,
  ring,
}) => (
  <div className="glass rounded-3xl p-4 sm:p-5 flex items-center gap-4">
    <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-full flex items-center justify-center shrink-0 ${ring}`}>
      {icon}
    </div>
    <div>
      <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-none">{value}</div>
      <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">{label}</div>
    </div>
  </div>
);

/* ---------------- View ---------------- */
export const DashboardView: React.FC = () => {
  const { todayDoses, setActiveTab } = useApp();

  const total = todayDoses.length;
  const taken = todayDoses.filter((d) => d.status === 'taken').length;
  const upcoming = todayDoses.filter((d) => d.status === 'pending' || d.status === 'snoozed').length;
  const missed = todayDoses.filter((d) => d.status === 'missed').length;

  return (
    <div className="space-y-5">
      {/* Greeting */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">
            Good morning, {USER_PROFILE.name} 👋
          </h1>
          <p className="text-slate-600 font-medium mt-1">
            Stay on track with your daily medication.
          </p>
        </div>
        <div className="glass-item rounded-full px-4 py-2.5 flex items-center gap-2 text-sm font-bold text-slate-600">
          <CalendarDays className="w-4 h-4 text-blue-600" />
          {TODAY_LABEL}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={<Pill className="w-6 h-6 text-white" />}
          value={total}
          label="Today's Medicines"
          ring="bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/40"
        />
        <StatCard
          icon={<CheckCircle2 className="w-6 h-6 text-white" />}
          value={taken}
          label="Taken"
          ring="bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/40"
        />
        <StatCard
          icon={<Clock className="w-6 h-6 text-white" />}
          value={upcoming}
          label="Upcoming"
          ring="bg-gradient-to-br from-amber-300 to-amber-500 shadow-lg shadow-amber-400/40"
        />
        <StatCard
          icon={<XCircle className="w-6 h-6 text-white" />}
          value={missed}
          label="Missed"
          ring="bg-gradient-to-br from-red-400 to-red-500 shadow-lg shadow-red-400/40"
        />
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <SchedulePanel />
          <Panel className="p-5">
            <SectionTitle
              icon={<BarChart3Icon />}
              title="Weekly Adherence"
              action={<SelectPill label="This Week" />}
            />
            <BarChart data={WEEKLY_ADHERENCE} />
          </Panel>
        </div>
        <SidePanels total={total} taken={taken} upcoming={upcoming} missed={missed} onNav={setActiveTab} />
      </div>
    </div>
  );
};

const SchedulePanel: React.FC = () => {
  const { todayDoses, setDoseStatus, setActiveTab } = useApp();
  return (
    <Panel className="p-5">
      <SectionTitle
        icon={<CalendarDays className="w-5 h-5 text-blue-600" />}
        title="Today's Schedule"
        action={
          <button
            onClick={() => setActiveTab('history')}
            className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        }
      />
      <div className="space-y-3">
        {todayDoses.map((dose) => (
          <div key={dose.id} className="glass-item rounded-2xl px-4 py-3 flex flex-wrap items-center gap-3">
            <Tile className={dose.tile}>
              <Pill className="w-5 h-5 text-slate-500" />
            </Tile>
            <div className="flex-1 min-w-[140px]">
              <div className="font-extrabold text-slate-800">{dose.name}</div>
              <div className="text-sm text-slate-500 font-medium">{dose.dosage}</div>
            </div>
            <div className="text-sm font-bold text-slate-600 w-20 text-right">{dose.time}</div>
            <button
              onClick={() => setDoseStatus(dose.id, dose.status === 'taken' ? 'pending' : 'taken')}
              title="Click to toggle taken"
            >
              <StatusBadge status={dose.status} />
            </button>
            <button className="p-1.5 text-slate-400 hover:text-slate-600" aria-label="More options">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        ))}
        {todayDoses.length === 0 && (
          <p className="text-sm text-slate-500 font-medium py-6 text-center">
            No medicines scheduled for today.
          </p>
        )}
      </div>
    </Panel>
  );
};

const SidePanels: React.FC<{
  total: number;
  taken: number;
  upcoming: number;
  missed: number;
  onNav: (tab: 'dashboard' | 'medicines' | 'healthcare' | 'history' | 'profile') => void;
}> = ({ total, taken, upcoming, missed, onNav }) => {
  const { todayDoses } = useApp();
  const percent = total ? Math.round((taken / total) * 100) : 0;
  const nextReminder = todayDoses.find((d) => d.status === 'pending');

  return (
    <div className="space-y-5">
      <Panel className="p-5">
        <SectionTitle
          icon={<BarChart3Icon />}
          title="Daily Adherence"
          action={<SelectPill label="Today" />}
        />
        <div className="flex items-center gap-5">
          <DonutChart
            percent={percent}
            caption="Today"
            size={150}
            segments={[
              { value: taken, color: '#22c55e' },
              { value: upcoming, color: '#60a5fa' },
              { value: missed, color: '#f87171' },
            ]}
          />
          <ul className="space-y-3 text-sm font-bold flex-1">
            {[
              { label: 'Taken', value: taken, color: 'bg-emerald-500' },
              { label: 'Upcoming', value: upcoming, color: 'bg-blue-400' },
              { label: 'Missed', value: missed, color: 'bg-rose-400' },
            ].map((row) => (
              <li key={row.label} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className={`h-3 w-3 rounded-full ${row.color}`} />
                  {row.label}
                </span>
                <span className="text-slate-800">{row.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 glass-item rounded-2xl p-3.5 flex gap-3">
          <Lightbulb className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">
            Keep going! Take your upcoming medicines on time to stay healthy.
          </p>
        </div>
      </Panel>

      <Panel className="p-5">
        <SectionTitle icon={<Bell className="w-5 h-5 text-blue-600" />} title="Next Reminder" />
        {nextReminder ? (
          <div className="glass-item rounded-2xl px-4 py-3 flex items-center gap-3">
            <Tile className={nextReminder.tile} size="h-11 w-11">
              <Pill className="w-5 h-5 text-slate-500" />
            </Tile>
            <div className="flex-1 min-w-0">
              <div className="font-extrabold text-slate-800 truncate">{nextReminder.name}</div>
              <div className="text-xs text-slate-500 font-medium truncate">
                {nextReminder.dosage}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-extrabold text-slate-800">{nextReminder.time}</div>
              <div className="text-xs font-semibold text-blue-600">Today</div>
            </div>
          </div>
        ) : (
          <p className="text-sm font-semibold text-slate-500">
            🎉 All done for today — nothing else scheduled.
          </p>
        )}
      </Panel>

      <Panel className="p-5">
        <SectionTitle icon={<span className="text-blue-600">⚡</span>} title="Quick Actions" />
        <button
          onClick={() => onNav('medicines')}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold text-sm rounded-2xl py-3.5 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/40 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Medicine
        </button>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[
            { label: 'View Schedule', icon: CalendarDays, tab: 'history' as const },
            { label: 'View History', icon: FileText, tab: 'history' as const },
            { label: 'Find a Doctor', icon: Stethoscope, tab: 'healthcare' as const },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => onNav(action.tab)}
                className="glass-item rounded-2xl px-2 py-3 flex flex-col items-center gap-1.5 text-[11px] font-bold text-slate-600 hover:text-blue-700 hover:shadow-md transition-all"
              >
                <Icon className="w-4 h-4 text-blue-600" />
                {action.label}
              </button>
            );
          })}
        </div>
      </Panel>
    </div>
  );
};

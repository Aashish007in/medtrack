import React, { useMemo, useState } from 'react';
import { CalendarDays, ChevronDown, Download, Pill } from 'lucide-react';
import { Panel, SectionTitle, StatusBadge, Tile } from '../components/ui';
import { DonutChart } from '../components/charts';
import { HISTORY_LOGS } from '../data/mockData';
import type { HistoryFilter } from '../types';

const FILTERS: { id: HistoryFilter; label: string; cls: string }[] = [
  { id: 'all', label: 'All Status', cls: 'bg-slate-100 text-slate-600' },
  { id: 'taken', label: 'Taken', cls: 'bg-emerald-100 text-emerald-700' },
  { id: 'skipped', label: 'Skipped', cls: 'bg-rose-100 text-rose-700' },
  { id: 'missed', label: 'Missed', cls: 'bg-red-100 text-red-600' },
];

const matches = (status: string, filter: HistoryFilter) =>
  filter === 'all' ||
  status === filter ||
  (filter === 'missed' && status === 'missed') ||
  (filter === 'skipped' && (status === 'skipped' || status === 'snoozed'));

export const HistoryView: React.FC = () => {
  const [filter, setFilter] = useState<HistoryFilter>('all');

  const groups = useMemo(
    () =>
      HISTORY_LOGS.map((g) => ({
        ...g,
        doses: g.doses.filter((d) => matches(d.status, filter)),
      })).filter((g) => g.doses.length > 0),
    [filter],
  );

  const allDoses = HISTORY_LOGS.flatMap((g) => g.doses);
  const taken = allDoses.filter((d) => d.status === 'taken').length;
  const pending = allDoses.filter((d) => d.status === 'pending' || d.status === 'snoozed').length;
  const missed = allDoses.filter((d) => d.status === 'missed' || d.status === 'skipped').length;
  const percent = Math.round((taken / allDoses.length) * 100);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">History</h1>
          <p className="text-slate-600 font-medium mt-1">
            Full record of your medication adherence over time.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="glass-item rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 flex items-center gap-2 hover:text-blue-700">
            <CalendarDays className="w-4 h-4 text-blue-600" /> 01 Oct 2026 – 10 Oct 2026
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold text-sm rounded-2xl px-5 py-3 flex items-center gap-2 shadow-lg shadow-blue-500/40 transition-all">
            <Download className="w-4 h-4" /> Download Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              filter === f.id
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/40'
                : `glass-item ${f.cls}`
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Day groups */}
        <div className="lg:col-span-2 space-y-5">
          {groups.map((group) => (
            <Panel key={group.dateLabel} className="p-5">
              <SectionTitle
                icon={<CalendarDays className="w-5 h-5 text-blue-600" />}
                title={group.dateLabel}
                action={
                  <span className="text-xs font-bold text-slate-500">
                    {group.doses.filter((d) => d.status === 'taken').length}/{group.doses.length}{' '}
                    taken
                  </span>
                }
              />
              <div className="space-y-3">
                {group.doses.map((dose) => (
                  <div key={dose.id} className="glass-item rounded-2xl px-4 py-3 flex flex-wrap items-center gap-3">
                    <Tile className={dose.tile} size="h-11 w-11">
                      <Pill className="w-5 h-5 text-slate-500" />
                    </Tile>
                    <div className="flex-1 min-w-[140px]">
                      <div className="font-extrabold text-slate-800">{dose.name}</div>
                      <div className="text-sm text-slate-500 font-medium">{dose.dosage}</div>
                    </div>
                    <div className="text-sm font-bold text-slate-600 w-20 text-right">
                      {dose.time}
                    </div>
                    <div className="text-right">
                      <StatusBadge status={dose.status} />
                      <div className="text-[11px] font-semibold text-slate-400 mt-1">
                        {dose.note}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          ))}
          {groups.length === 0 && (
            <Panel className="p-10 text-center">
              <p className="text-sm font-medium text-slate-500">
                No records match this filter.
              </p>
            </Panel>
          )}
        </div>

        {/* Right column: summary + calendar */}
        <div className="space-y-5">
          <Panel className="p-5">
            <SectionTitle title="Adherence Summary" />
            <div className="flex items-center gap-5">
              <DonutChart
                percent={percent}
                caption="Daily Adherence"
                size={150}
                segments={[
                  { value: taken, color: '#22c55e' },
                  { value: pending, color: '#60a5fa' },
                  { value: missed, color: '#f87171' },
                ]}
              />
              <ul className="space-y-3 text-sm font-bold flex-1">
                {[
                  { label: 'Taken', value: taken, color: 'bg-emerald-500' },
                  { label: 'Pending', value: pending, color: 'bg-blue-400' },
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
          </Panel>

          <Panel className="p-5">
            <SectionTitle title="Calendar" />
            <CalendarMonth />
            <div className="mt-4 space-y-2 text-xs font-bold text-slate-500">
              {[
                { color: 'bg-emerald-500', label: 'Day fully adhered' },
                { color: 'bg-blue-400', label: 'Partially adhered' },
                { color: 'bg-rose-400', label: 'Missed doses' },
                { color: 'bg-slate-300', label: 'No data' },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${row.color}`} />
                  {row.label}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
};

const CalendarMonth: React.FC = () => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const firstWeekday = 3; // 01 Oct 2026 falls on Thursday (Mon = 0)
  const totalDays = 31;
  const today = 10;
  const dots: Record<number, string> = {
    7: 'bg-emerald-500',
    8: 'bg-emerald-500',
    9: 'bg-blue-400',
    10: 'bg-rose-400',
  };

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  return (
    <div>
      <div className="text-sm font-extrabold text-slate-700 mb-2">October 2026</div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((d, i) => (
          <span key={`${d}-${i}`} className="text-[11px] font-bold text-slate-400 py-1">
            {d}
          </span>
        ))}
        {cells.map((day, i) => (
          <div key={i} className="flex flex-col items-center py-1">
            {day && (
              <button
                className={`h-8 w-8 rounded-full text-xs font-bold flex items-center justify-center ${
                  day === today
                    ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/40'
                    : 'text-slate-600 hover:bg-white/80'
                }`}
              >
                {day}
              </button>
            )}
            <span className={`h-1.5 w-1.5 rounded-full mt-0.5 ${day && dots[day] ? dots[day] : 'bg-transparent'}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
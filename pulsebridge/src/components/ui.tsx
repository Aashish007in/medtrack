import React from 'react';
import { AlertCircle, CheckCircle2, Clock, SkipForward, Timer } from 'lucide-react';
import type { DoseStatus } from '../types';

/* ---------------- Glass panel ---------------- */
export const Panel: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => <div className={`glass rounded-3xl ${className}`}>{children}</div>;

/* ---------------- Medicine icon tile ---------------- */
export const Tile: React.FC<{
  className?: string;
  emoji?: string;
  children?: React.ReactNode;
  size?: string;
}> = ({ className = 'bg-blue-100', emoji, children, size = 'h-12 w-12' }) => (
  <div className={`${size} ${className} rounded-2xl flex items-center justify-center shrink-0`}>
    {emoji ? <span className="text-xl">{emoji}</span> : children}
  </div>
);

/* ---------------- Status badge ---------------- */
const STATUS_META: Record<
  DoseStatus,
  { label: string; cls: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  taken: { label: 'Taken', cls: 'bg-emerald-100 text-emerald-700', Icon: CheckCircle2 },
  pending: { label: 'Upcoming', cls: 'bg-blue-100 text-blue-700', Icon: Clock },
  snoozed: { label: 'Snoozed', cls: 'bg-amber-100 text-amber-700', Icon: Timer },
  skipped: { label: 'Skipped', cls: 'bg-rose-100 text-rose-700', Icon: SkipForward },
  missed: { label: 'Missed', cls: 'bg-red-100 text-red-700', Icon: AlertCircle },
};

export const StatusBadge: React.FC<{ status: DoseStatus; className?: string }> = ({
  status,
  className = '',
}) => {
  const meta = STATUS_META[status];
  const Icon = meta.Icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${meta.cls} ${className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {meta.label}
    </span>
  );
};

/* ---------------- Section title ---------------- */
export const SectionTitle: React.FC<{
  icon?: React.ReactNode;
  title: string;
  action?: React.ReactNode;
}> = ({ icon, title, action }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2.5">
      {icon}
      <h3 className="text-lg font-extrabold text-slate-800">{title}</h3>
    </div>
    {action}
  </div>
);
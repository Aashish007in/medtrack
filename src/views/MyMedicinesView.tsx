import React, { useMemo, useState } from 'react';
import {
  ArrowUpDown,
  CalendarDays,
  CheckCircle2,
  Clock,
  ListFilter,
  Pencil,
  Pill,
  Plus,
  Search,
  Trash2,
  X,
  XCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Panel, SectionTitle } from '../components/ui';
import { BarChart } from '../components/charts';
import { LAST_7_DAYS_ADHERENCE, TILE_PALETTE } from '../data/mockData';
import { MEDICINE_CATEGORIES } from '../data/healthcareData';
import type { Medicine, MedicineCategory } from '../types';

const TABS = ['Medicine List', 'Daily Schedule', 'Weekly Schedule', 'Manage Categories'];

export const MyMedicinesView: React.FC = () => {
  const { medicines, deleteMedicine, selectedMedicineId, setSelectedMedicineId } = useApp();

  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [status, setStatus] = useState('All Status');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Medicine | null>(null);

  const filtered = useMemo(
    () =>
      medicines
        .filter((m) => m.name.toLowerCase().includes(query.toLowerCase()))
        .filter((m) => category === 'All Categories' || m.category === category)
        .filter((m) => status === 'All Status' || m.status === status.toLowerCase())
        .sort((a, b) => a.name.localeCompare(b.name)),
    [medicines, query, category, status],
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">My Medicines</h1>
          <p className="text-slate-600 font-medium mt-1">
            Manage your medicines, dosage, frequency and reminder times.
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold text-sm rounded-2xl px-5 py-3 flex items-center gap-2 shadow-lg shadow-blue-500/40 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Medicine
        </button>
      </div>

      {/* Tabs */}
      <div className="glass rounded-3xl p-1.5 flex flex-wrap gap-1.5">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${
              activeTab === tab
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/40'
                : 'text-slate-600 hover:bg-white/70'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === TABS[0] ? (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[220px] glass-item rounded-2xl flex items-center gap-2.5 px-4 py-3">
              <Search className="w-4 h-4 text-blue-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search medicines..."
                className="flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none chip-input min-w-0"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="glass-item rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 outline-none cursor-pointer"
            >
              <option>All Categories</option>
              {MEDICINE_CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="glass-item rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 outline-none cursor-pointer"
            >
              <option>All Status</option>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
            </select>
            <button className="glass-item rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 flex items-center gap-2 hover:text-blue-700">
              <ArrowUpDown className="w-4 h-4" /> Sort by Name
            </button>
          </div>

          <MedicineList
            items={filtered}
            selectedId={selectedMedicineId}
            onSelect={setSelectedMedicineId}
            onEdit={(med) => {
              setEditing(med);
              setShowForm(true);
            }}
            onDelete={deleteMedicine}
          />

          <BottomPanels />
        </>
      ) : (
        <Panel className="p-10 text-center">
          <ListFilter className="w-8 h-8 text-blue-500 mx-auto mb-3" />
          <h3 className="text-lg font-extrabold text-slate-700">{activeTab}</h3>
          <p className="text-sm font-medium text-slate-500 mt-1">
            This section is coming soon — use <strong>Medicine List</strong> to manage medicines.
          </p>
        </Panel>
      )}

      {showForm && (
        <FormPanel
          editing={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
};

const MedicineList: React.FC<{
  items: Medicine[];
  selectedId: string;
  onSelect: (id: string) => void;
  onEdit: (med: Medicine) => void;
  onDelete: (id: string) => void;
}> = ({ items, selectedId, onSelect, onEdit, onDelete }) => (
  <Panel className="p-4 space-y-3">
    {items.map((med) => (
      <div
        key={med.id}
        onClick={() => onSelect(med.id)}
        className={`glass-item rounded-2xl px-4 py-3.5 flex flex-wrap items-center gap-3 cursor-pointer transition-all ${
          selectedId === med.id ? 'ring-2 ring-blue-400' : 'hover:shadow-md'
        }`}
      >
        <div className={`h-12 w-12 ${med.tile} rounded-2xl flex items-center justify-center shrink-0`}>
          <Pill className="w-5 h-5 text-slate-500" />
        </div>
        <div className="min-w-[160px] flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-extrabold text-slate-800">{med.name}</span>
            <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 text-[11px] font-bold">
              {med.category}
            </span>
          </div>
          <div className="text-sm text-slate-500 font-medium">{med.dosage}</div>
        </div>
        <div className="text-xs font-bold text-slate-600 space-y-1 min-w-[130px]">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-blue-500" /> {med.frequency}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            {med.reminderTimes.join(', ')}
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
            med.status === 'active'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-slate-200 text-slate-600'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${med.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`}
          />
          {med.status === 'active' ? 'Active' : 'Paused'}
        </span>
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onEdit(med)}
            className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center"
            aria-label="Edit medicine"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(med.id)}
            className="h-9 w-9 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 flex items-center justify-center"
            aria-label="Delete medicine"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    ))}
    {items.length === 0 && (
      <p className="text-sm font-medium text-slate-500 text-center py-8">
        No medicines match your filters.
      </p>
    )}
  </Panel>
);

const BottomPanels: React.FC = () => {
  const { medicines, selectedMedicineId } = useApp();
  const selected = medicines.find((m) => m.id === selectedMedicineId) ?? medicines[0];

  if (!selected) return null;

  return (
    <div className="grid lg:grid-cols-2 gap-5">
      {/* Medicine Details */}
      <Panel className="p-5">
        <SectionTitle
          title="Medicine Details"
          action={
            <button className="glass-item rounded-xl px-3 py-1.5 text-xs font-bold text-blue-600 flex items-center gap-1.5">
              <Pencil className="w-3.5 h-3.5" /> Edit
            </button>
          }
        />
        <div className="glass-item rounded-2xl p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className={`h-14 w-14 ${selected.tile} rounded-2xl flex items-center justify-center`}>
              <Pill className="w-6 h-6 text-slate-500" />
            </div>
            <div className="flex-1 min-w-[140px]">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-extrabold text-slate-800">{selected.name}</span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 text-[11px] font-bold">
                  {selected.category}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[11px] font-bold">
                  {selected.status === 'active' ? 'Active' : 'Paused'}
                </span>
              </div>
            </div>
          </div>
          <dl className="mt-4 space-y-2.5 text-sm">
            {[
              { label: 'Dosage', value: selected.dosage },
              { label: 'Frequency', value: selected.frequency },
              { label: 'Reminder Time', value: selected.reminderTimes.join(', ') },
              { label: 'Start Date', value: selected.startDate },
              { label: 'Instructions', value: selected.instructions },
            ].map((row) => (
              <div key={row.label} className="flex gap-3">
                <dt className="w-32 shrink-0 font-bold text-slate-500">{row.label}</dt>
                <dd className="font-semibold text-slate-700">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Panel>

      {/* Adherence last 7 days */}
      <Panel className="p-5">
        <SectionTitle
          title="Adherence (Last 7 Days)"
          action={
            <button className="glass-item rounded-xl px-3 py-1.5 text-xs font-bold text-blue-600 flex items-center gap-1.5">
              <Pencil className="w-3.5 h-3.5" /> Edit
            </button>
          }
        />
        <BarChart data={LAST_7_DAYS_ADHERENCE} showGrid={false} />
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { icon: CheckCircle2, value: 5, label: 'Taken', cls: 'bg-emerald-100 text-emerald-600' },
            { icon: Clock, value: 1, label: 'Pending', cls: 'bg-amber-100 text-amber-600' },
            { icon: XCircle, value: 1, label: 'Missed', cls: 'bg-red-100 text-red-500' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass-item rounded-2xl p-3 flex items-center gap-2.5">
                <span className={`h-9 w-9 rounded-full ${stat.cls} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </span>
                <span>
                  <span className="block text-lg font-extrabold text-slate-800 leading-none">
                    {stat.value}
                  </span>
                  <span className="block text-[11px] font-bold text-slate-500">{stat.label}</span>
                </span>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
};

const FREQUENCIES: Medicine['frequency'][] = [
  'Once daily',
  'Twice daily',
  'Thrice daily',
  'As needed',
];

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <label className="block">
    <span className="block text-xs font-bold text-slate-500 mb-1.5">{label}</span>
    {children}
  </label>
);

const inputCls =
  'w-full glass-item rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-400 chip-input';

const FormPanel: React.FC<{ editing: Medicine | null; onClose: () => void }> = ({
  editing,
  onClose,
}) => {
  const { addMedicine, updateMedicine } = useApp();

  const [name, setName] = React.useState(editing?.name ?? '');
  const [category, setCategory] = React.useState<MedicineCategory>(
    (editing?.category as MedicineCategory) ?? MEDICINE_CATEGORIES[0],
  );
  const [dosage, setDosage] = React.useState(editing?.dosage ?? '');
  const [frequency, setFrequency] = React.useState(editing?.frequency ?? FREQUENCIES[0]);
  const [startDate, setStartDate] = React.useState(editing?.startDate ?? '');
  const [endDate, setEndDate] = React.useState('');
  const [instructions, setInstructions] = React.useState(editing?.instructions ?? '');
  const [times, setTimes] = React.useState<string[]>(editing?.reminderTimes ?? ['08:00']);
  const [timeInput, setTimeInput] = React.useState('');
  const [error, setError] = React.useState('');

  const save = () => {
    if (!name.trim() || !dosage.trim()) {
      setError('Medicine name and dosage are required.');
      return;
    }
    const pick = TILE_PALETTE[Math.floor(Math.random() * TILE_PALETTE.length)];
    const payload = {
      name: name.trim(),
      category,
      dosage: dosage.trim(),
      frequency,
      startDate: startDate || '16 Oct 2025',
      instructions: instructions.trim() || 'Take with a full glass of water.',
      reminderTimes: times.length ? times : ['08:00'],
      status: editing?.status ?? ('active' as const),
      tile: editing?.tile ?? pick.tile,
      accent: editing?.accent ?? pick.accent,
    };
    if (editing) updateMedicine(editing.id, payload);
    else addMedicine(payload);
    onClose();
  };

  const addTime = () => {
    if (timeInput && !times.includes(timeInput)) {
      setTimes((prev) => [...prev, timeInput].sort());
      setTimeInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-md h-full p-4 animate-pop overflow-y-auto">
        <div className="glass-strong rounded-[28px] p-5 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="h-9 w-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-extrabold text-slate-800">
                {editing ? 'Edit Medicine' : 'Add New Medicine'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="h-9 w-9 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-700 flex items-center justify-center"
              aria-label="Close form"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <Field label="Medicine Name">
            <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Metformin" />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Category">
              <select className={inputCls} value={category} onChange={(e) => setCategory(e.target.value as MedicineCategory)}>
                {MEDICINE_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Dosage">
              <input className={inputCls} value={dosage} onChange={(e) => setDosage(e.target.value)} placeholder="e.g. 500 mg" />
            </Field>
          </div>

          <Field label="Frequency">
            <select className={inputCls} value={frequency} onChange={(e) => setFrequency(e.target.value as Medicine['frequency'])}>
              {FREQUENCIES.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </Field>

          {/* Reminder times */}
          <div className="block">
            <span className="block text-xs font-bold text-slate-500 mb-1.5">Reminder Time</span>
            <div className="flex gap-2">
              <input
                type="time"
                className={inputCls}
                value={timeInput}
                onChange={(e) => setTimeInput(e.target.value)}
              />
              <button
                type="button"
                onClick={addTime}
                className="shrink-0 rounded-xl bg-blue-600 text-white text-sm font-bold px-4 hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {times.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimes((prev) => prev.filter((x) => x !== t))}
                  className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold hover:bg-blue-200"
                  title="Remove"
                >
                  {t} ✕
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Start Date">
              <input type="date" className={inputCls} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </Field>
            <Field label="End Date (optional)">
              <input type="date" className={inputCls} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </Field>
          </div>

          <Field label="Special Instructions">
            <textarea
              className={`${inputCls} min-h-[80px] resize-y`}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Take after meals"
            />
          </Field>

          {error && <p className="text-xs font-bold text-red-500">{error}</p>}

          <div className="flex gap-3">
            <button
              onClick={save}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold text-sm rounded-2xl py-3.5 shadow-lg shadow-blue-500/40 transition-all"
            >
              {editing ? 'Save Changes' : 'Save Medicine'}
            </button>
            <button
              onClick={onClose}
              className="glass-item rounded-2xl px-5 text-sm font-bold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

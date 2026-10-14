import type { DayLog, Medicine } from '../types';

export const TODAY_LABEL = 'Fri, 10 Oct 2026';

export const INITIAL_MEDICINES: Medicine[] = [
  {
    id: 'med-1',
    name: 'Paracetamol',
    category: 'Pain Relief',
    dosage: '1 tablet after breakfast',
    instructions: 'Take after food',
    frequency: 'Twice daily',
    reminderTimes: ['08:00 AM', '08:00 PM'],
    startDate: '10-10-2026',
    status: 'active',
    tile: 'bg-rose-100',
    accent: '#f43f5e',
  },
  {
    id: 'med-2',
    name: 'Vitamin D3',
    category: 'Supplement',
    dosage: '1 capsule with water',
    instructions: 'Take with water after lunch',
    frequency: 'Once daily',
    reminderTimes: ['12:00 PM'],
    startDate: '10-07-2024',
    status: 'active',
    tile: 'bg-amber-100',
    accent: '#f59e0b',
  },
  {
    id: 'med-3',
    name: 'Metformin',
    category: 'Diabetes',
    dosage: '1 tablet after dinner',
    instructions: 'Take after food',
    frequency: 'Twice daily',
    reminderTimes: ['08:00 AM', '08:00 PM'],
    startDate: '05-01-2026',
    status: 'active',
    tile: 'bg-sky-100',
    accent: '#0ea5e9',
  },
  {
    id: 'med-4',
    name: 'Amlodipine',
    category: 'Blood Pressure',
    dosage: '1 tablet once daily',
    instructions: 'Take in the morning',
    frequency: 'Once daily',
    reminderTimes: ['09:00 AM'],
    startDate: '02-15-2026',
    status: 'active',
    tile: 'bg-pink-100',
    accent: '#ec4899',
  },
];

export const INITIAL_TODAY_DOSES = [
  {
    id: 'dose-1',
    medicineId: 'med-1',
    name: 'Medicine A',
    dosage: '1 tablet after breakfast',
    time: '08:00 AM',
    status: 'taken' as const,
    note: 'Taken on time',
    tile: 'bg-rose-100',
  },
  {
    id: 'dose-2',
    medicineId: 'med-2',
    name: 'Vitamin D',
    dosage: '1 capsule with water',
    time: '12:00 PM',
    status: 'pending' as const,
    note: 'Upcoming reminder',
    tile: 'bg-amber-100',
  },
  {
    id: 'dose-3',
    medicineId: 'med-3',
    name: 'Medicine C',
    dosage: '1 tablet after dinner',
    time: '08:00 PM',
    status: 'pending' as const,
    note: 'Upcoming reminder',
    tile: 'bg-sky-100',
  },
];

export const HISTORY_LOGS: DayLog[] = [
  {
    dateLabel: 'Today, 10 Oct 2026',
    doses: [
      { id: 'h-1', medicineId: 'med-1', name: 'Paracetamol', dosage: '1 tablet', time: '08:00 AM', status: 'taken', note: 'Taken on time', tile: 'bg-rose-100' },
      { id: 'h-2', medicineId: 'med-2', name: 'Vitamin D3', dosage: '1 capsule', time: '12:00 PM', status: 'snoozed', note: 'Snoozed to 12:30 PM', tile: 'bg-amber-100' },
      { id: 'h-3', medicineId: 'med-3', name: 'Metformin', dosage: '1 tablet', time: '08:00 PM', status: 'pending', note: 'Upcoming reminder', tile: 'bg-sky-100' },
    ],
  },
  {
    dateLabel: 'Yesterday, 09 Oct 2026',
    doses: [
      { id: 'h-4', medicineId: 'med-4', name: 'Amlodipine', dosage: '1 tablet', time: '09:00 AM', status: 'skipped', note: 'Skipped by user', tile: 'bg-pink-100' },
      { id: 'h-5', medicineId: 'med-2', name: 'Vitamin D3', dosage: '1 capsule', time: '12:00 PM', status: 'taken', note: 'Taken 5 min late', tile: 'bg-amber-100' },
    ],
  },
  {
    dateLabel: '08 Oct 2026',
    doses: [
      { id: 'h-6', medicineId: 'med-1', name: 'Paracetamol', dosage: '1 tablet', time: '08:00 AM', status: 'taken', note: 'Taken on time', tile: 'bg-rose-100' },
      { id: 'h-7', medicineId: 'med-3', name: 'Metformin', dosage: '1 tablet', time: '08:00 PM', status: 'missed', note: 'No response', tile: 'bg-sky-100' },
    ],
  },
  {
    dateLabel: '07 Oct 2026',
    doses: [
      { id: 'h-8', medicineId: 'med-2', name: 'Vitamin D3', dosage: '1 capsule', time: '12:00 PM', status: 'taken', note: 'Taken on time', tile: 'bg-amber-100' },
      { id: 'h-9', medicineId: 'med-4', name: 'Amlodipine', dosage: '1 tablet', time: '09:00 AM', status: 'taken', note: 'Taken on time', tile: 'bg-pink-100' },
    ],
  },
];

export const WEEKLY_ADHERENCE = [
  { day: 'Mon', value: 60 },
  { day: 'Tue', value: 80 },
  { day: 'Wed', value: 40 },
  { day: 'Thu', value: 20 },
  { day: 'Fri', value: 33, highlight: true },
  { day: 'Sat', value: 0 },
  { day: 'Sun', value: 0 },
];

export const LAST_7_DAYS_ADHERENCE = [
  { day: 'Mon', value: 100 },
  { day: 'Tue', value: 100 },
  { day: 'Wed', value: 80 },
  { day: 'Thu', value: 60 },
  { day: 'Fri', value: 100 },
  { day: 'Sat', value: 80 },
  { day: 'Sun', value: 0, missed: true },
];

/** Pastel icon tiles + accent colors used for newly added medicines */
export const TILE_PALETTE: { tile: string; accent: string }[] = [
  { tile: 'bg-rose-100', accent: '#f43f5e' },
  { tile: 'bg-amber-100', accent: '#f59e0b' },
  { tile: 'bg-sky-100', accent: '#0ea5e9' },
  { tile: 'bg-pink-100', accent: '#ec4899' },
  { tile: 'bg-emerald-100', accent: '#10b981' },
  { tile: 'bg-purple-100', accent: '#a855f7' },
];
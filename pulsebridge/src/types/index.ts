export type NavigationTab =
  | 'dashboard'
  | 'medicines'
  | 'healthcare'
  | 'history'
  | 'profile';

export type MedicineStatus = 'active' | 'paused';

export type DoseStatus = 'taken' | 'snoozed' | 'pending' | 'skipped' | 'missed';

export type MedicineCategory =
  | 'Pain Relief'
  | 'Supplement'
  | 'Diabetes'
  | 'Blood Pressure'
  | 'Other';

export interface Medicine {
  id: string;
  name: string;
  category: MedicineCategory;
  dosage: string;
  instructions: string;
  frequency: 'Once daily' | 'Twice daily' | 'Thrice daily' | 'As needed';
  reminderTimes: string[];
  startDate: string;
  endDate?: string;
  status: MedicineStatus;
  /** tailwind bg class for the pastel icon tile */
  tile: string;
  /** hex color used in charts / accents */
  accent: string;
}

export interface Dose {
  id: string;
  medicineId: string;
  name: string;
  dosage: string;
  time: string;
  status: DoseStatus;
  note: string;
  tile: string;
}

export interface DayLog {
  dateLabel: string;
  doses: Dose[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  specialtyColor: string;
  qualification: string;
  hospital: string;
  rating: number;
  reviews: number;
  experience: string;
  available: boolean;
  initials: string;
  avatarBg: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  chipClass: string;
  artClass: string;
  icon: string;
}

export interface Caregiver {
  id: string;
  name: string;
  relation: string;
  status: 'Active' | 'Pending';
  avatarBg: string;
  initials: string;
}

export interface UserProfile {
  name: string;
  role: string;
  fullName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  location: string;
  conditions: string[];
  allergies: string;
  memberSince: string;
  lastLogin: string;
}

export type HistoryFilter = 'all' | 'taken' | 'skipped' | 'missed';
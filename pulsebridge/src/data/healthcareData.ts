import type { Article, Caregiver, Doctor, UserProfile } from '../types';

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1', name: 'Dr. Arvind Kumar', specialty: 'General Physician', specialtyColor: 'text-blue-600',
    qualification: 'MBBS, MD (General Medicine)', hospital: 'Apollo Hospitals, Chennai',
    rating: 4.8, reviews: 320, experience: '10+ years experience', available: true,
    initials: 'AK', avatarBg: 'bg-blue-100',
  },
  {
    id: 'doc-2', name: 'Dr. Priya Sharma', specialty: 'Cardiologist', specialtyColor: 'text-rose-500',
    qualification: 'MBBS, MD (Cardiology)', hospital: 'Fortis Hospital, Chennai',
    rating: 4.7, reviews: 250, experience: '8+ years experience', available: true,
    initials: 'PS', avatarBg: 'bg-rose-100',
  },
  {
    id: 'doc-3', name: 'Dr. R. N. Patel', specialty: 'Endocrinologist', specialtyColor: 'text-emerald-600',
    qualification: 'MBBS, MD (Endocrinology)', hospital: 'MIOT International, Chennai',
    rating: 4.6, reviews: 180, experience: '12+ years experience', available: true,
    initials: 'RP', avatarBg: 'bg-emerald-100',
  },
  {
    id: 'doc-4', name: 'Dr. Ananya Iyer', specialty: 'Dermatologist', specialtyColor: 'text-purple-600',
    qualification: 'MBBS, MD (Dermatology)', hospital: 'Kauvery Hospital, Chennai',
    rating: 4.5, reviews: 210, experience: '9+ years experience', available: true,
    initials: 'AI', avatarBg: 'bg-purple-100',
  },
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1', title: 'Healthy Diet for a Stronger Heart', category: 'Nutrition',
    excerpt: 'Learn how a balanced diet can improve heart health and overall well-being.',
    chipClass: 'bg-emerald-100 text-emerald-700', artClass: 'bg-gradient-to-br from-emerald-200 via-lime-100 to-emerald-300', icon: '🥗',
  },
  {
    id: 'art-2', title: 'Benefits of Regular Exercise', category: 'Exercise',
    excerpt: 'Discover how simple exercises can boost your physical and mental health.',
    chipClass: 'bg-blue-100 text-blue-700', artClass: 'bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-300', icon: '🏃',
  },
  {
    id: 'art-3', title: 'Managing Blood Pressure', category: 'Chronic Care',
    excerpt: 'Tips and lifestyle changes to keep your blood pressure under control.',
    chipClass: 'bg-orange-100 text-orange-700', artClass: 'bg-gradient-to-br from-orange-200 via-amber-100 to-rose-200', icon: '🩺',
  },
  {
    id: 'art-4', title: 'Stress Management Techniques', category: 'Mental Health',
    excerpt: 'Practical ways to reduce stress and improve mental well-being.',
    chipClass: 'bg-violet-100 text-violet-700', artClass: 'bg-gradient-to-br from-violet-200 via-purple-100 to-fuchsia-300', icon: '🧠',
  },
  {
    id: 'art-5', title: 'How to Take Medicines Safely', category: 'Medicine Tips',
    excerpt: 'Important tips to take medicines on time and avoid common mistakes.',
    chipClass: 'bg-rose-100 text-rose-700', artClass: 'bg-gradient-to-br from-rose-200 via-pink-100 to-red-300', icon: '💊',
  },
  {
    id: 'art-6', title: 'Building a Healthier Lifestyle', category: 'General Health',
    excerpt: 'Simple daily habits for a healthier and happier life.',
    chipClass: 'bg-teal-100 text-teal-700', artClass: 'bg-gradient-to-br from-teal-200 via-cyan-100 to-sky-300', icon: '❤️',
  },
];

export const CAREGIVERS: Caregiver[] = [
  { id: 'cg-1', name: 'Rakesh', relation: 'Son', status: 'Active', avatarBg: 'bg-amber-100', initials: 'R' },
  { id: 'cg-2', name: 'Surendhar', relation: 'Brother', status: 'Active', avatarBg: 'bg-blue-100', initials: 'S' },
  { id: 'cg-3', name: 'Yokesh', relation: 'Friend', status: 'Pending', avatarBg: 'bg-rose-100', initials: 'Y' },
];

export const USER_PROFILE: UserProfile = {
  name: 'Kumaravel',
  role: 'Patient',
  fullName: 'Kumaravel B',
  dob: '15 Mar 2003',
  gender: 'Male',
  phone: '+91 98765 43210',
  email: 'kumaravelb@example.com',
  location: 'Chennai, Tamil Nadu, India',
  conditions: ['Diabetes', 'Blood Pressure'],
  allergies: 'None',
  memberSince: '10 Jan 2024',
  lastLogin: '10 Oct 2026, 09:42 AM',
};

export const SPECIALTY_CHIPS = ['All Specialties', 'General Physician', 'Cardiologist', 'Dermatologist', 'Pediatrician'];

export const ARTICLE_CHIPS = ['All', 'Nutrition', 'Exercise', 'Chronic Care', 'Mental Health', 'Medicine Tips'];

export const MEDICINE_CATEGORIES = ['Pain Relief', 'Supplement', 'Diabetes', 'Blood Pressure', 'Other'];
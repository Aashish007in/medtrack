import React, { useState } from 'react';
import {
  Bell,
  Camera,
  Lock,
  LogOut,
  Moon,
  Palette,
  Plus,
  Shield,
  Sun,
} from 'lucide-react';
import { Panel, SectionTitle } from '../components/ui';
import { CAREGIVERS, USER_PROFILE } from '../data/healthcareData';

/* Shared toggle */
const Toggle: React.FC<{ on: boolean; onChange: () => void; label: string }> = ({
  on,
  onChange,
  label,
}) => (
  <button
    onClick={onChange}
    role="switch"
    aria-checked={on}
    aria-label={label}
    className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${on ? 'bg-blue-600' : 'bg-slate-300'
      }`}
  >
    <span
      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? 'left-[22px]' : 'left-0.5'
        }`}
    />
  </button>
);

export const ProfileView: React.FC = () => (
  <div className="space-y-5">
    {/* Header */}
    <div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">Profile & Settings</h1>
      <p className="text-slate-600 font-medium mt-1">
        Manage your personal information, caregivers, notifications and security.
      </p>
    </div>

    {/* Row 1 */}
    <div className="grid lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2">
        <PersonalInfo />
      </div>
      <AccountOverview />
    </div>

    {/* Row 2 */}
    <div className="grid lg:grid-cols-3 gap-5">
      <CaregiversPanel />
      <NotificationsPanel />
      <SecurityPanel />
    </div>

    {/* Row 3 */}
    <ThemePanel />
  </div>
);

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex gap-3 text-sm">
    <span className="w-32 shrink-0 font-bold text-slate-500">{label}</span>
    <span className="font-semibold text-slate-700">{value}</span>
  </div>
);

const PersonalInfo: React.FC = () => (
  <Panel className="h-full p-5">
    <SectionTitle
      title="Personal Information"
      action={
        <button className="glass-item rounded-xl px-3 py-1.5 text-xs font-bold text-blue-600 hover:text-blue-700">
          Edit
        </button>
      }
    />
    <div className="flex items-center gap-4 mb-5">
      <div className="relative">
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 text-white text-2xl font-extrabold flex items-center justify-center shadow-lg shadow-blue-500/40">
          K
        </div>
        <button
          className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-white shadow flex items-center justify-center text-blue-600 hover:text-blue-700"
          aria-label="Change photo"
        >
          <Camera className="w-4 h-4" />
        </button>
      </div>
      <div>
        <div className="text-xl font-extrabold text-slate-800">{USER_PROFILE.fullName}</div>
        <div className="text-sm font-bold text-blue-600">{USER_PROFILE.role}</div>
        <div className="text-xs font-semibold text-slate-500 mt-0.5">
          Member since {USER_PROFILE.memberSince} • Last login: {USER_PROFILE.lastLogin}
        </div>
      </div>
    </div>
    <div className="glass-item rounded-2xl p-4 space-y-2.5">
      <InfoRow label="Date of Birth" value={USER_PROFILE.dob} />
      <InfoRow label="Gender" value={USER_PROFILE.gender} />
      <InfoRow label="Phone" value={USER_PROFILE.phone} />
      <InfoRow label="Email" value={USER_PROFILE.email} />
      <InfoRow label="Location" value={USER_PROFILE.location} />
      <InfoRow label="Conditions" value={USER_PROFILE.conditions.join(', ')} />
      <InfoRow label="Allergies" value={USER_PROFILE.allergies} />
    </div>
  </Panel>
);

const AccountOverview: React.FC = () => (
  <Panel className="h-full overflow-hidden">
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white">
      <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center mb-3">
        <Shield className="w-8 h-8" />
      </div>
      <div className="text-lg font-extrabold">Account Overview</div>
      <div className="text-sm font-semibold text-blue-100 mt-0.5">
        Your account is protected and verified.
      </div>
    </div>
    <div className="p-5 space-y-3">
      {[
        { label: 'Health data encrypted', cls: 'bg-emerald-100 text-emerald-700' },
        { label: 'Email verified', cls: 'bg-emerald-100 text-emerald-700' },
        { label: '2FA not enabled', cls: 'bg-amber-100 text-amber-700' },
        { label: 'Profile 80% complete', cls: 'bg-blue-100 text-blue-700' },
      ].map((row) => (
        <div key={row.label} className="glass-item rounded-2xl px-4 py-3 flex items-center justify-between gap-2">
          <span className="text-sm font-bold text-slate-600">{row.label}</span>
          <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${row.cls}`}>
            {row.label === '2FA not enabled' ? 'Off' : 'OK'}
          </span>
        </div>
      ))}
      <button className="w-full rounded-2xl py-3 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 flex items-center justify-center gap-2">
        <LogOut className="w-4 h-4" /> Log Out
      </button>
    </div>
  </Panel>
);

const CaregiversPanel: React.FC = () => {
  const [caregivers, setCaregivers] = useState(CAREGIVERS);
  return (
    <Panel className="h-full p-5">
      <SectionTitle
        title="Caregivers"
        action={
          <button
            onClick={() =>
              setCaregivers((prev) => [
                ...prev,
                {
                  id: `cg-${Date.now()}`,
                  name: 'New Caregiver',
                  relation: 'Friend',
                  status: 'Pending',
                  avatarBg: 'bg-teal-100',
                  initials: 'N',
                },
              ])
            }
            className="glass-item rounded-xl px-3 py-1.5 text-xs font-bold text-blue-600 flex items-center gap-1.5 hover:text-blue-700"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        }
      />
      <div className="space-y-3">
        {caregivers.map((cg) => (
          <div key={cg.id} className="glass-item rounded-2xl px-4 py-3 flex items-center gap-3">
            <span
              className={`h-10 w-10 rounded-full ${cg.avatarBg} flex items-center justify-center font-extrabold text-slate-600 shrink-0`}
            >
              {cg.initials}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-extrabold text-slate-800 truncate">{cg.name}</div>
              <div className="text-xs font-semibold text-slate-500">{cg.relation}</div>
            </div>
            <span
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${cg.status === 'Active'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
                }`}
            >
              {cg.status}
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs font-semibold text-slate-400 mt-3">
        Caregivers receive alerts when you miss a critical dose.
      </p>
    </Panel>
  );
};

const NotificationsPanel: React.FC = () => {
  const [prefs, setPrefs] = useState({ reminders: true, caregivers: true, email: false });
  const rows: { key: keyof typeof prefs; label: string; sub: string }[] = [
    { key: 'reminders', label: 'Medicine Reminders', sub: 'Push alerts at dose time' },
    { key: 'caregivers', label: 'Caregiver Alerts', sub: 'Notify caregivers on missed doses' },
    { key: 'email', label: 'Email Summaries', sub: 'Weekly adherence report' },
  ];
  return (
    <Panel className="h-full p-5">
      <SectionTitle title="Notification Preferences" />
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.key} className="glass-item rounded-2xl px-4 py-3 flex items-center gap-3">
            <span className="h-9 w-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-extrabold text-slate-800">{row.label}</div>
              <div className="text-[11px] font-semibold text-slate-500">{row.sub}</div>
            </div>
            <Toggle
              label={row.label}
              on={prefs[row.key]}
              onChange={() => setPrefs((p) => ({ ...p, [row.key]: !p[row.key] }))}
            />
          </div>
        ))}
      </div>
    </Panel>
  );
};

const SecurityPanel: React.FC = () => {
  const [twoFA, setTwoFA] = useState(false);
  return (
    <Panel className="h-full p-5">
      <SectionTitle title="Security" />
      <div className="space-y-3">
        <div className="glass-item rounded-2xl px-4 py-3 flex items-center gap-3">
          <span className="h-9 w-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4" />
          </span>
          <div className="flex-1">
            <div className="text-sm font-extrabold text-slate-800">Change Password</div>
            <div className="text-[11px] font-semibold text-slate-500">Updated 3 months ago</div>
          </div>
          <button className="glass-item rounded-xl px-3 py-1.5 text-xs font-bold text-blue-600 hover:text-blue-700">
            Update
          </button>
        </div>
        <div className="glass-item rounded-2xl px-4 py-3 flex items-center gap-3">
          <span className="h-9 w-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4" />
          </span>
          <div className="flex-1">
            <div className="text-sm font-extrabold text-slate-800">Two-Factor Auth</div>
            <div className="text-[11px] font-semibold text-slate-500">Extra layer of security</div>
          </div>
          <Toggle label="Two-Factor Auth" on={twoFA} onChange={() => setTwoFA((v) => !v)} />
        </div>
      </div>
    </Panel>
  );
};

const ThemePanel: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [accent, setAccent] = useState('Blue');
  const accents = ['Blue', 'Violet', 'Emerald', 'Rose', 'Amber'];
  return (
    <Panel className="p-5">
      <SectionTitle
        title="Theme Settings"
        action={
          <span className="glass-item rounded-xl px-3 py-1.5 text-xs font-bold text-blue-600 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5" /> Appearance
          </span>
        }
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="glass-item rounded-2xl p-4">
          <div className="text-sm font-extrabold text-slate-800 mb-3">Interface Theme</div>
          <div className="grid grid-cols-2 gap-2">
            {(['light', 'dark'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setTheme(mode)}
                className={`rounded-2xl px-3 py-3 text-sm font-bold flex items-center justify-center gap-2 border-2 transition-all ${theme === mode
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-transparent bg-white/70 text-slate-600 hover:bg-white'
                  }`}
              >
                {mode === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {mode === 'light' ? 'Light' : 'Dark'}
              </button>
            ))}
          </div>
        </div>
        <div className="glass-item rounded-2xl p-4">
          <div className="text-sm font-extrabold text-slate-800 mb-3">Accent Color</div>
          <div className="flex flex-wrap gap-2">
            {accents.map((c) => (
              <button
                key={c}
                onClick={() => setAccent(c)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition-all ${accent === c
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-transparent bg-white/70 text-slate-600 hover:bg-white'
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
};
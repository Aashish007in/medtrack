import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Pill,
  Search,
  Star,
  Stethoscope,
} from 'lucide-react';
import { Panel, SectionTitle } from '../components/ui';
import {
  ARTICLE_CHIPS,
  ARTICLES,
  DOCTORS,
  SPECIALTY_CHIPS,
} from '../data/healthcareData';

const TABS = [
  'Healthcare Network',
  'Find a Doctor',
  'Ask a Question',
  'Patient Education',
  'Nearby Pharmacies',
  'Emergency Contacts',
] as const;

type Tab = (typeof TABS)[number];

export const HealthcareView: React.FC = () => {
  const [tab, setTab] = useState<Tab>(TABS[0]);

  const cards: { title: string; value: string; sub: string; icon: React.ReactNode; cls: string; go: Tab }[] = [
    {
      title: 'Find a Doctor',
      value: `${DOCTORS.length} specialists`,
      sub: 'Search by specialty, rating and location',
      icon: <Stethoscope className="w-6 h-6 text-white" />,
      cls: 'from-blue-400 to-blue-600',
      go: TABS[1],
    },
    {
      title: 'Ask a Question',
      value: '24×7',
      sub: 'Get answers from verified doctors',
      icon: <MessageCircle className="w-6 h-6 text-white" />,
      cls: 'from-violet-400 to-violet-600',
      go: TABS[2],
    },
    {
      title: 'Patient Education',
      value: `${ARTICLES.length} articles`,
      sub: 'Curated reads for healthier living',
      icon: <BookOpen className="w-6 h-6 text-white" />,
      cls: 'from-emerald-400 to-emerald-600',
      go: TABS[3],
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">Healthcare</h1>
        <p className="text-slate-600 font-medium mt-1">
          Find doctors, learn from curated articles and stay informed about your health.
        </p>
      </div>

      {/* Tabs */}
      <div className="glass rounded-3xl p-1.5 flex flex-wrap gap-1.5">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${
              tab === t
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/40'
                : 'text-slate-600 hover:bg-white/70 flex-1'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === TABS[0] && (
        <>
          <div className="grid sm:grid-cols-3 gap-4">
            {cards.map((card) => (
              <button
                key={card.title}
                onClick={() => setTab(card.go)}
                className="glass rounded-3xl p-5 text-left hover:-translate-y-1 transition-transform"
              >
                <span
                  className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${card.cls} shadow-lg flex items-center justify-center mb-3`}
                >
                  {card.icon}
                </span>
                <div className="text-xl font-extrabold text-slate-800">{card.value}</div>
                <div className="text-sm font-bold text-slate-600">{card.title}</div>
                <div className="text-xs font-semibold text-slate-500 mt-1">{card.sub}</div>
              </button>
            ))}
          </div>

          <Panel className="p-5">
            <SectionTitle
              icon={<BookOpen className="w-5 h-5 text-blue-600" />}
              title="Featured Articles"
              action={
                <button
                  onClick={() => setTab(TABS[3])}
                  className="text-sm font-bold text-blue-600 hover:text-blue-700"
                >
                  View All
                </button>
              }
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ARTICLES.slice(0, 3).map((a) => (
                <ArticleCard key={a.id} article={a} compact />
              ))}
            </div>
          </Panel>
        </>
      )}

      {tab === TABS[1] && <DoctorSection />}
      {tab === TABS[3] && <ArticleSection />}

      {tab === TABS[2] && (
        <EmptyPanel
          icon={<MessageCircle className="w-8 h-8 text-blue-500" />}
          title="Ask a Question"
          text="Post a health question and verified doctors will respond within 24 hours. Coming soon!"
        />
      )}
      {tab === TABS[4] && (
        <EmptyPanel
          icon={<MapPin className="w-8 h-8 text-blue-500" />}
          title="Nearby Pharmacies"
          text="Find pharmacies near you with medicine stock and delivery options. Coming soon!"
        />
      )}
      {tab === TABS[5] && (
        <EmptyPanel
          icon={<CheckCircle2 className="w-8 h-8 text-blue-500" />}
          title="Emergency Contacts"
          text="Manage your emergency contacts who get alerted when a critical dose is missed. Coming soon!"
        />
      )}
    </div>
  );
};

const DoctorSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState(SPECIALTY_CHIPS[0]);
  const [booked, setBooked] = useState<string[]>([]);

  const doctors = useMemo(
    () =>
      DOCTORS.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()))
        .filter((d) => specialty === SPECIALTY_CHIPS[0] || d.specialty === specialty)
        .filter((d) => d.available),
    [query, specialty],
  );

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[220px] glass-item rounded-2xl flex items-center gap-2.5 px-4 py-3">
          <Search className="w-4 h-4 text-blue-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search doctors..."
            className="flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none chip-input min-w-0"
          />
        </div>
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="glass-item rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 outline-none cursor-pointer"
        >
          {SPECIALTY_CHIPS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button className="glass-item rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 flex items-center gap-2 hover:text-blue-700">
          <CalendarDays className="w-4 h-4" /> Availability
        </button>
        <button className="glass-item rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 flex items-center gap-2 hover:text-blue-700">
          <Star className="w-4 h-4" /> Top Rated
        </button>
        <button className="glass-item rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 flex items-center gap-2 hover:text-blue-700">
          <MapPin className="w-4 h-4" /> Distance
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {doctors.map((doc) => {
          const isBooked = booked.includes(doc.id);
          return (
            <Panel key={doc.id} className="p-5">
              <div className="flex items-start gap-4">
                <div
                  className={`h-16 w-16 rounded-full ${doc.avatarBg} flex items-center justify-center text-xl font-extrabold text-slate-600 shrink-0`}
                >
                  {doc.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-slate-800">{doc.name}</span>
                    <span className={`text-xs font-bold ${doc.specialtyColor}`}>
                      {doc.specialty}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5">
                    {doc.qualification} • {doc.experience}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" /> {doc.hospital}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" /> {doc.rating} ({doc.reviews})
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" /> Available
                  </span>
                </div>
              </div>
              <button
                onClick={() => setBooked((prev) => (prev.includes(doc.id) ? prev : [...prev, doc.id]))}
                className={`mt-4 w-full rounded-2xl py-3 text-sm font-bold transition-all ${
                  isBooked
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/40 hover:from-blue-700 hover:to-blue-600'
                }`}
              >
                {isBooked ? '✓ Appointment Requested' : 'Book Appointment'}
              </button>
            </Panel>
          );
        })}
        {doctors.length === 0 && (
          <p className="md:col-span-2 text-sm font-medium text-slate-500 text-center py-8 glass-item rounded-2xl">
            No available doctors match your search.
          </p>
        )}
      </div>
    </>
  );
};

const ArticleSection: React.FC = () => {
  const [chip, setChip] = useState(ARTICLE_CHIPS[0]);
  const articles = ARTICLES.filter((a) => chip === ARTICLE_CHIPS[0] || a.category === chip);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {ARTICLE_CHIPS.map((c) => (
          <button
            key={c}
            onClick={() => setChip(c)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              chip === c
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/40'
                : 'glass-item text-slate-600 hover:text-blue-700'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
      {articles.length === 0 && (
        <p className="text-sm font-medium text-slate-500 text-center py-8 glass-item rounded-2xl">
          No articles in this category yet.
        </p>
      )}
    </>
  );
};

const EmptyPanel: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({
  icon,
  title,
  text,
}) => (
  <Panel className="p-10 text-center">
    <div className="mx-auto mb-3">{icon}</div>
    <h3 className="text-lg font-extrabold text-slate-700">{title}</h3>
    <p className="text-sm font-medium text-slate-500 mt-1 max-w-md mx-auto">{text}</p>
  </Panel>
);

const ArticleCard: React.FC<{ article: (typeof ARTICLES)[number]; compact?: boolean }> = ({
  article,
  compact,
}) => (
  <div className="glass-item rounded-3xl overflow-hidden hover:shadow-lg transition-all cursor-pointer">
    <div className={`h-24 ${article.artClass} flex items-center justify-center text-4xl`}>
      {article.icon}
    </div>
    <div className="p-4">
      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${article.chipClass}`}>
        {article.category}
      </span>
      <h4 className="font-extrabold text-slate-800 mt-2 leading-snug">{article.title}</h4>
      {!compact && (
        <p className="text-xs font-medium text-slate-500 mt-1.5 leading-relaxed">
          {article.excerpt}
        </p>
      )}
      <button className="mt-3 text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
        Read More →
      </button>
    </div>
  </div>
);

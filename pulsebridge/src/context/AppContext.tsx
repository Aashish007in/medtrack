import React, { createContext, useCallback, useContext, useState } from 'react';
import type { Dose, DoseStatus, Medicine, NavigationTab } from '../types';
import { INITIAL_MEDICINES, INITIAL_TODAY_DOSES } from '../data/mockData';

interface AppContextValue {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  medicines: Medicine[];
  addMedicine: (medicine: Omit<Medicine, 'id'>) => void;
  deleteMedicine: (id: string) => void;
  toggleMedicineStatus: (id: string) => void;
  updateMedicine: (id: string, patch: Omit<Medicine, 'id'>) => void;
  todayDoses: Dose[];
  setDoseStatus: (doseId: string, status: DoseStatus) => void;
  selectedMedicineId: string;
  setSelectedMedicineId: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [medicines, setMedicines] = useState<Medicine[]>(INITIAL_MEDICINES);
  const [todayDoses, setTodayDoses] = useState<Dose[]>(INITIAL_TODAY_DOSES as Dose[]);
  const [selectedMedicineId, setSelectedMedicineId] = useState<string>('med-2');

  const addMedicine = useCallback((medicine: Omit<Medicine, 'id'>) => {
    setMedicines((prev) => [...prev, { ...medicine, id: `med-${Date.now()}` }]);
  }, []);

  const deleteMedicine = useCallback((id: string) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
    setSelectedMedicineId((prev) => (prev === id ? 'med-2' : prev));
  }, []);

  const toggleMedicineStatus = useCallback((id: string) => {
    setMedicines((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: m.status === 'active' ? 'paused' : 'active' } : m,
      ),
    );
  }, []);

  const updateMedicine = useCallback((id: string, patch: Omit<Medicine, 'id'>) => {
    setMedicines((prev) => prev.map((m) => (m.id === id ? { ...patch, id } : m)));
  }, []);

  const setDoseStatus = useCallback((doseId: string, status: DoseStatus) => {
    setTodayDoses((prev) =>
      prev.map((d) =>
        d.id === doseId
          ? {
              ...d,
              status,
              note:
                status === 'taken'
                  ? 'Taken on time'
                  : status === 'skipped'
                    ? 'Skipped by user'
                    : status === 'pending'
                      ? 'Upcoming reminder'
                      : d.note,
            }
          : d,
      ),
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        medicines,
        addMedicine,
        deleteMedicine,
        toggleMedicineStatus,
        todayDoses,
        setDoseStatus,
        selectedMedicineId,
        setSelectedMedicineId,
        updateMedicine,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextValue => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
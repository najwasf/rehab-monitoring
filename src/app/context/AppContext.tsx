import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'patient' | 'doctor' | 'family';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  age?: number;
  strokeCondition?: string;
}

export interface ExerciseSession {
  id: string;
  patientId: string;
  date: string;
  time: string;
  exerciseType: string;
  score: number;
  feedback: string;
  correctMovements: number;
  totalMovements: number;
}

export interface Schedule {
  id: string;
  patientId: string;
  day: string;
  time: string;
  exerciseType: string;
  duration: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'reminder' | 'success' | 'warning' | 'info';
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  sessions: ExerciseSession[];
  addSession: (session: ExerciseSession) => void;
  schedules: Schedule[];
  addSchedule: (schedule: Schedule) => void;
  removeSchedule: (id: string) => void;
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  patients: User[];
  addPatient: (patient: User) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<ExerciseSession[]>([
    {
      id: '1',
      patientId: 'patient1',
      date: '2026-04-28',
      time: '09:00',
      exerciseType: 'Angkat Tangan Kanan',
      score: 85,
      feedback: 'Gerakan sudah benar, pertahankan',
      correctMovements: 17,
      totalMovements: 20,
    },
    {
      id: '2',
      patientId: 'patient1',
      date: '2026-04-29',
      time: '09:00',
      exerciseType: 'Rotasi Pergelangan Tangan',
      score: 78,
      feedback: 'Tingkatkan kecepatan gerakan',
      correctMovements: 15,
      totalMovements: 20,
    },
  ]);

  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: '1',
      patientId: 'patient1',
      day: 'Senin',
      time: '09:00',
      exerciseType: 'Angkat Tangan Kanan',
      duration: 30,
    },
    {
      id: '2',
      patientId: 'patient1',
      day: 'Rabu',
      time: '09:00',
      exerciseType: 'Rotasi Pergelangan Tangan',
      duration: 30,
    },
    {
      id: '3',
      patientId: 'patient1',
      day: 'Jumat',
      time: '10:00',
      exerciseType: 'Latihan Keseimbangan',
      duration: 45,
    },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Waktu Latihan',
      message: 'Saatnya latihan Angkat Tangan Kanan',
      time: '09:00',
      read: false,
      type: 'reminder',
    },
    {
      id: '2',
      title: 'Latihan Selesai',
      message: 'Selamat! Skor latihan hari ini: 85%',
      time: '09:35',
      read: false,
      type: 'success',
    },
  ]);

  const [patients, setPatients] = useState<User[]>([
    {
      id: 'patient1',
      name: 'Budi Santoso',
      email: 'budi@example.com',
      role: 'patient',
      age: 58,
      strokeCondition: 'Stroke Iskemik - Sisi Kanan',
    },
  ]);

  const addSession = (session: ExerciseSession) => {
    setSessions(prev => [session, ...prev]);
  };

  const addSchedule = (schedule: Schedule) => {
    setSchedules(prev => [...prev, schedule]);
  };

  const removeSchedule = (id: string) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
  };

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addPatient = (patient: User) => {
    setPatients(prev => [...prev, patient]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        sessions,
        addSession,
        schedules,
        addSchedule,
        removeSchedule,
        notifications,
        addNotification,
        markNotificationRead,
        patients,
        addPatient,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

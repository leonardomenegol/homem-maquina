import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { Appointment, AppointmentStatus, Service } from '../types';
import { v4 as uuid } from 'uuid';

interface DataContextValue {
  services: Service[];
  appointments: Appointment[];
  addService: (data: Omit<Service, 'id' | 'createdAt' | 'active'> & { active?: boolean }) => void;
  updateService: (id: string, data: Partial<Service>) => void;
  deactivateService: (id: string) => void;
  addAppointment: (data: Omit<Appointment, 'id' | 'status'> & { status?: AppointmentStatus }) => void;
  updateAppointment: (id: string, data: Partial<Appointment>) => void;
  cancelAppointment: (id: string) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

function sampleServices(): Service[] {
  return [
    { id: uuid(), name: 'Consulta Clínica Geral', category: 'Consulta', durationMinutes: 30, capacity: 1, active: true, createdAt: new Date().toISOString() },
    { id: uuid(), name: 'Vacinação Influenza', category: 'Vacina', durationMinutes: 10, capacity: 1, active: true, createdAt: new Date().toISOString() },
    { id: uuid(), name: 'Curativo', category: 'Enfermagem', durationMinutes: 20, capacity: 1, active: true, createdAt: new Date().toISOString() },
  ];
}

export const DataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(() => sampleServices());
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const addService = useCallback((data: Omit<Service, 'id' | 'createdAt' | 'active'> & { active?: boolean }) => {
    setServices(prev => [...prev, { ...data, id: uuid(), createdAt: new Date().toISOString(), active: data.active ?? true }]);
  }, []);

  const updateService = useCallback((id: string, data: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  }, []);

  const deactivateService = useCallback((id: string) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, active: false } : s));
  }, []);

  const addAppointment = useCallback((data: Omit<Appointment, 'id' | 'status'> & { status?: AppointmentStatus }) => {
    setAppointments(prev => [...prev, { ...data, id: uuid(), status: data.status ?? 'confirmed' }]);
  }, []);

  const updateAppointment = useCallback((id: string, data: Partial<Appointment>) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
  }, []);

  const cancelAppointment = useCallback((id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a));
  }, []);

  const value = useMemo(() => ({ services, appointments, addService, updateService, deactivateService, addAppointment, updateAppointment, cancelAppointment }), [services, appointments, addService, updateService, deactivateService, addAppointment, updateAppointment, cancelAppointment]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};

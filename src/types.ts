export type UserRole = 'professional' | 'patient';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
  meta?: Record<string, any>;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  durationMinutes: number;
  capacity: number;
  active: boolean;
  createdAt: string;
}

export type AppointmentStatus = 'confirmed' | 'pending' | 'cancelled';

export interface Appointment {
  id: string;
  serviceId: string;
  patientName: string;
  dateTime: string; // ISO
  status: AppointmentStatus;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

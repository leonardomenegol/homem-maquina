import React from 'react';
import { AppointmentStatus } from '../types';

export const StatusBadge: React.FC<{ status: AppointmentStatus }> = ({ status }) => {
  const map: Record<AppointmentStatus, { label: string; cls: string }> = {
    confirmed: { label: 'Confirmado', cls: 'badge-success' },
    pending: { label: 'Pendente', cls: 'badge-warning' },
    cancelled: { label: 'Cancelado', cls: 'badge-neutral' }
  };
  const { label, cls } = map[status];
  return <span className={`badge ${cls}`}>{label}</span>;
};

import React, { useMemo } from 'react';
import { Appointment, Service } from '../types';
import { formatDate } from '../utils/date';

interface CalendarProps {
  services: Service[];
  appointments: Appointment[];
  days?: number;
}

function dateKey(d: Date) { return d.toISOString().split('T')[0]; }

export const Calendar: React.FC<CalendarProps> = ({ services, appointments, days = 7 }) => {
  const start = new Date();
  const dayBlocks = useMemo(() => {
    return Array.from({ length: days }).map((_, i) => {
      const d = new Date(start.getTime() + i * 86400000);
      const key = dateKey(d);
      const dayAppts = appointments.filter(a => a.dateTime.startsWith(key));
      return { date: d, appts: dayAppts };
    });
  }, [appointments, days]);

  return (
    <div className="calendar-grid" aria-label="Calendário simplificado">
      {dayBlocks.map(b => (
        <div key={b.date.toISOString()} className="calendar-cell">
          <h4>
            <span style={{ display: 'block' }}>{formatDate(b.date)}</span>
            <span style={{ fontSize: '.6rem', textTransform: 'uppercase', letterSpacing: '.5px', color: 'var(--color-text-secondary)' }}>
              {b.date.toLocaleDateString('pt-BR', { weekday: 'short' })}
            </span>
          </h4>
          {b.appts.length === 0 && <div className="text-secondary" style={{ fontSize: '.7rem' }}>Sem agendamentos</div>}
          {b.appts.slice(0, 6).map(a => {
            const svc = services.find(s => s.id === a.serviceId);
            return <div key={a.id} className={`slot ${a.status === 'cancelled' ? 'busy' : 'free'}`}>{svc?.name?.slice(0, 12)}...</div>;
          })}
          {b.appts.length > 6 && <div style={{ fontSize: '.65rem', marginTop: 4 }}>+ {b.appts.length - 6} mais</div>}
        </div>
      ))}
    </div>
  );
};

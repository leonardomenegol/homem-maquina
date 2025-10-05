import React from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { formatDateTime } from '../utils/date';

export const DashboardPatient: React.FC = () => {
  const { appointments, services } = useData();
  const { user } = useAuth();
  const myNext = appointments.filter(a => a.patientName === user?.name && a.status !== 'cancelled').sort((a,b)=> a.dateTime.localeCompare(b.dateTime))[0];
  const service = services.find(s => s.id === myNext?.serviceId);
  return (
    <div className="app-page flex flex-col gap-4">
      <h1>Olá, {user?.name}</h1>
      {myNext ? (
        <div className="card">
          <strong>Próximo Agendamento</strong>
          <div style={{ marginTop: 8 }}>{service?.name} — {formatDateTime(myNext.dateTime)}</div>
          <Link to="/meus-agendamentos" style={{ marginTop: 8, display: 'inline-block' }}>Ver detalhes</Link>
        </div>
      ) : (
        <div className="card">
          <strong>Nenhum agendamento futuro.</strong>
          <div style={{ marginTop: 8 }}><Link to="/agendar">Agendar agora</Link></div>
        </div>
      )}
      <section>
        <h2 style={{ marginTop: 32 }}>Serviços Disponíveis</h2>
        <div className="grid grid-cols-3 responsive-grid" style={{ gap: 16 }}>
          {services.filter(s => s.active).map(s => (
            <div key={s.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <strong>{s.name}</strong>
              <span className="text-secondary" style={{ fontSize: '.75rem' }}>{s.category}</span>
              <span style={{ marginTop: 'auto', fontSize: '.7rem' }}>Duração: {s.durationMinutes} min</span>
              <Link to="/agendar" state={{ preselect: s.id }} style={{ marginTop: 8 }}>Agendar</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

import React, { useMemo, useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/Badge';
import { formatDateTime } from '../utils/date';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Modal } from '../components/Modal';
import { useToasts } from '../components/ToastManager';

export const MyAppointmentsPage: React.FC = () => {
  const { appointments, services, updateAppointment, cancelAppointment } = useData();
  const { user } = useAuth();
  const { push } = useToasts();
  const mine = appointments.filter(a => a.patientName === user?.name).sort((a,b)=> a.dateTime.localeCompare(b.dateTime));
  const [editing, setEditing] = useState<string | null>(null);
  const appt = mine.find(a => a.id === editing);
  const [form, setForm] = useState({ date: '', time: '' });

  const startEdit = (id: string) => {
    const a = mine.find(x => x.id === id);
    if (!a) return;
    const [date, time] = a.dateTime.split('T');
    setForm({ date, time: time.substring(0,5) });
    setEditing(id);
  };

  const save = () => {
    if (!editing) return;
    updateAppointment(editing, { dateTime: `${form.date}T${form.time}:00` });
    push({ type: 'success', title: 'Agendamento atualizado' });
    setEditing(null);
  };

  const cancel = (id: string) => {
    if (confirm('Cancelar este agendamento?')) { cancelAppointment(id); push({ type: 'info', title: 'Agendamento cancelado' }); }
  };

  const [filter, setFilter] = useState('');
  const filtered = useMemo(() => mine.filter(a => {
    const svc = services.find(s => s.id === a.serviceId);
    return !filter.trim() || svc?.name.toLowerCase().includes(filter.toLowerCase());
  }), [mine, filter, services]);

  return (
    <div className="app-page">
      <h1>Meus Agendamentos</h1>
      {mine.length === 0 && <div className="card">Nenhum agendamento. <a href="/agendar">Agendar agora</a></div>}
      {mine.length > 0 && (
        <div className="field" style={{ maxWidth:320, marginLeft:'auto', marginRight:'auto' }}>
          <label className="field-label" htmlFor="filtro-ag">Filtrar por serviço</label>
            <input id="filtro-ag" value={filter} placeholder="Ex: vacina" onChange={e=>setFilter(e.target.value)} />
        </div>
      )}
      <div className="hide-mobile" style={{ marginTop:16 }}>
        <table aria-label="Tabela de meus agendamentos">
          <thead>
            <tr><th>Data/Hora</th><th>Serviço</th><th>Status</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {filtered.map(m => {
              const svc = services.find(s => s.id === m.serviceId);
              return (
                <tr key={m.id}>
                  <td>{formatDateTime(m.dateTime)}</td>
                  <td>{svc?.name}</td>
                  <td><StatusBadge status={m.status} /></td>
                  <td style={{ display: 'flex', gap: 8 }}>
                    {m.status !== 'cancelled' && <Button variant="outline" onClick={() => startEdit(m.id)}><Icon name="edit" /> Editar</Button>}
                    {m.status !== 'cancelled' && <Button variant="danger" onClick={() => cancel(m.id)}><Icon name="trash" /> Cancelar</Button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mobile-appointments" style={{ display:'none', marginTop:16, gap:12 }}>
        {filtered.map(m => {
          const svc = services.find(s => s.id === m.serviceId);
          return (
            <div key={m.id} className="card" style={{ display:'flex', flexDirection:'column', gap:4 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <strong style={{ fontSize:'.9rem' }}>{svc?.name}</strong>
                <StatusBadge status={m.status} />
              </div>
              <div style={{ fontSize:'.65rem', letterSpacing:'.5px', color:'var(--color-text-secondary)', display:'flex', gap:12, flexWrap:'wrap' }}>
                <span><Icon name="clock" size={12} /> {formatDateTime(m.dateTime)}</span>
              </div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginTop:4 }}>
                {m.status !== 'cancelled' && <Button variant="outline" onClick={() => startEdit(m.id)}><Icon name="edit" /> Editar</Button>}
                {m.status !== 'cancelled' && <Button variant="danger" onClick={() => cancel(m.id)}><Icon name="trash" /> Cancelar</Button>}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && mine.length > 0 && <div className="card" style={{ fontSize:'.8rem' }}>Nenhum resultado para filtro.</div>}
      </div>
      <style>{`
        @media (max-width:820px){
          .mobile-appointments{display:flex; flex-direction:column;}
        }
      `}</style>
      <Modal open={!!editing} onClose={() => setEditing(null)} title="Editar Agendamento" actions={<>
  <Button variant="outline" onClick={() => setEditing(null)}><Icon name="close" /> Cancelar</Button>
  <Button onClick={save} disabled={!form.date || !form.time}><Icon name="save" /> Salvar</Button>
      </>}>
        <div className="field">
          <label className="field-label">Data</label>
          <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
        </div>
        <div className="field">
          <label className="field-label">Hora</label>
          <input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
        </div>
      </Modal>
    </div>
  );
};

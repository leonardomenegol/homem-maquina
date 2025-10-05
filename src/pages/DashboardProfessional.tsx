import React, { useMemo, useState } from 'react';
import { useData } from '../context/DataContext';
import { Calendar } from '../components/Calendar';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Modal } from '../components/Modal';
import { useToasts } from '../components/ToastManager';

export const DashboardProfessional: React.FC = () => {
  const { services, appointments, addService } = useData();
  const { push } = useToasts();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', durationMinutes: 30, capacity: 1 });

  const today = new Date().toISOString().split('T')[0];
  const todaysAppts = useMemo(() => appointments.filter(a => a.dateTime.startsWith(today)), [appointments, today]);

  const pending = appointments.filter(a => a.status === 'pending').length;
  const cancelled = appointments.filter(a => a.status === 'cancelled').length;

  const handleAdd = () => {
    addService(form);
    push({ type: 'success', title: 'Serviço cadastrado' });
    setOpen(false);
    setForm({ name: '', category: '', durationMinutes: 30, capacity: 1 });
  };

  return (
    <div className="app-page flex flex-col gap-4">
      <h1>Dashboard Profissional</h1>
      <div className="grid responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
        <div className="card"><strong>Agendamentos Hoje</strong><div style={{ fontSize: '2rem' }}>{todaysAppts.length}</div></div>
        <div className="card"><strong>Pendentes</strong><div style={{ fontSize: '2rem' }}>{pending}</div></div>
        <div className="card"><strong>Cancelados</strong><div style={{ fontSize: '2rem' }}>{cancelled}</div></div>
        <div className="card"><strong>Serviços Ativos</strong><div style={{ fontSize: '2rem' }}>{services.filter(s => s.active).length}</div></div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h2 style={{ margin: 0 }}>Agenda (7 dias)</h2>
  <Button onClick={() => setOpen(true)}><Icon name="plus" /> Novo Serviço</Button>
      </div>
      <Calendar services={services} appointments={appointments} />
      <Modal open={open} onClose={() => setOpen(false)} title="Novo Serviço" actions={<>
        <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
        <Button onClick={handleAdd} disabled={!form.name || !form.category}>Salvar</Button>
      </>}>
        <div className="field">
          <label className="field-label">Nome</label>
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="field">
          <label className="field-label">Categoria</label>
          <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="Consulta, Vacina..." />
        </div>
        <div className="field">
          <label className="field-label">Duração (min)</label>
          <input type="number" value={form.durationMinutes} onChange={e => setForm(f => ({ ...f, durationMinutes: parseInt(e.target.value) }))} />
        </div>
        <div className="field">
          <label className="field-label">Capacidade</label>
          <input type="number" value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: parseInt(e.target.value) }))} />
        </div>
      </Modal>
    </div>
  );
};

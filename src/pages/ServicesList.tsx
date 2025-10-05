import React, { useMemo, useState } from 'react';
import { useData } from '../context/DataContext';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Modal } from '../components/Modal';
import { useToasts } from '../components/ToastManager';

export const ServicesListPage: React.FC = () => {
  const { services, updateService, deactivateService } = useData();
  const { push } = useToasts();
  const [editing, setEditing] = useState<string | null>(null);
  const service = services.find(s => s.id === editing);

  const [form, setForm] = useState({ name: '', category: '', durationMinutes: 30, capacity: 1 });

  const startEdit = (id: string) => {
    const s = services.find(sv => sv.id === id);
    if (!s) return;
    setForm({ name: s.name, category: s.category, durationMinutes: s.durationMinutes, capacity: s.capacity });
    setEditing(id);
  };

  const save = () => {
    if (!editing) return;
    updateService(editing, form);
    push({ type: 'success', title: 'Serviço atualizado' });
    setEditing(null);
  };

  const deactivate = (id: string) => {
    if (confirm('Desativar serviço?')) {
      deactivateService(id); push({ type: 'info', title: 'Serviço desativado' });
    }
  };

  const [filter, setFilter] = useState('');
  const filtered = useMemo(() => services.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()) || s.category.toLowerCase().includes(filter.toLowerCase())), [services, filter]);

  return (
    <div className="app-page">
      <h1>Serviços</h1>
      <div style={{ display:'flex', flexWrap:'wrap', gap:12, marginBottom:16, justifyContent:'center' }}>
        <div className="field" style={{ flex:'1 1 240px', minWidth:220, marginBottom:0 }}>
          <label className="field-label" htmlFor="filtro-servicos">Buscar</label>
          <input id="filtro-servicos" placeholder="Nome ou categoria" value={filter} onChange={e=>setFilter(e.target.value)} />
        </div>
        <div style={{ alignSelf:'flex-end', display:'flex', gap:8 }}>
          <span style={{ fontSize:'.7rem', color:'var(--color-text-secondary)' }}>{filtered.length} resultado(s)</span>
        </div>
      </div>
      <div className="hide-mobile">
        <table aria-label="Tabela de serviços">
          <thead>
            <tr><th>Nome</th><th>Categoria</th><th>Duração</th><th>Capacidade</th><th>Status</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.category}</td>
                <td>{s.durationMinutes} min</td>
                <td>{s.capacity}</td>
                <td>{s.active ? 'Ativo' : 'Inativo'}</td>
                <td style={{ display: 'flex', gap: 8 }}>
                  <Button variant="outline" onClick={() => startEdit(s.id)}><Icon name="edit" /> Editar</Button>
                  {s.active && <Button variant="danger" onClick={() => deactivate(s.id)}><Icon name="trash" /> Desativar</Button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="mobile-service-list" style={{ display:'none' }}>
        {filtered.map(s => (
          <div key={s.id} className="card" style={{ display:'flex', flexDirection:'column', gap:6 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8 }}>
              <strong style={{ fontSize:'0.95rem' }}>{s.name}</strong>
              <span className="badge" style={{ background: s.active ? 'var(--color-success)' : '#6b7280', color:'#fff' }}>{s.active ? 'Ativo' : 'Inativo'}</span>
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8, fontSize:'.65rem', textTransform:'uppercase', letterSpacing:'.5px', color:'var(--color-text-secondary)' }}>
              <span><Icon name="service" size={12} /> {s.category}</span>
              <span><Icon name="clock" size={12} /> {s.durationMinutes} min</span>
              <span>Cap: {s.capacity}</span>
            </div>
            <div style={{ display:'flex', gap:8, marginTop:4, flexWrap:'wrap' }}>
              <Button variant="outline" onClick={() => startEdit(s.id)}><Icon name="edit" /> Editar</Button>
              {s.active && <Button variant="danger" onClick={() => deactivate(s.id)}><Icon name="trash" /> Desativar</Button>}
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="card" style={{ fontSize:'.8rem' }}>Nenhum serviço encontrado.</div>}
      </div>
      <style>{`
        @media (max-width:820px){
          .mobile-service-list{display:flex; flex-direction:column; gap:12px;}
        }
      `}</style>
      <Modal open={!!editing} onClose={() => setEditing(null)} title={`Editar Serviço`} actions={<>
        <Button variant="outline" onClick={() => setEditing(null)}>Cancelar</Button>
        <Button onClick={save}>Salvar</Button>
      </>}>
        <div className="field">
          <label className="field-label">Nome</label>
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="field">
          <label className="field-label">Categoria</label>
          <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
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

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { WizardSteps } from '../components/Wizard';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { useToasts } from '../components/ToastManager';
import { formatDate, formatTime } from '../utils/date';
import { ServicePicker } from '../components';

export const ScheduleWizardPage: React.FC = () => {
  const { services, addAppointment } = useData();
  const { user } = useAuth();
  const nav = useNavigate();
  const { state } = useLocation() as any;
  const steps = ['Serviço', 'Horário', 'Revisão'];
  const [current, setCurrent] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(state?.preselect || null);
  // dateDisplay mantém a data visível em dd/mm/yyyy
  const [dateDisplay, setDateDisplay] = useState('');
  const [time, setTime] = useState('');
  const { push } = useToasts();

  const next = () => setCurrent(c => Math.min(c + 1, steps.length - 1));
  const prev = () => setCurrent(c => Math.max(c - 1, 0));

  const toISODate = (disp: string): string | null => {
    const m = disp.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!m) return null;
    const [_, dd, mm, yyyy] = m;
    const day = parseInt(dd, 10), mon = parseInt(mm, 10), yr = parseInt(yyyy, 10);
    const d = new Date(yr, mon - 1, day);
    if (d.getFullYear() !== yr || d.getMonth() !== mon - 1 || d.getDate() !== day) return null; // validação calendário
    return `${yyyy}-${mm}-${dd}`;
  };

  const isoDate = toISODate(dateDisplay);

  const submit = () => {
    if (!user || !serviceId || !isoDate || !time) return;
    addAppointment({ serviceId, patientName: user.name, dateTime: `${isoDate}T${time}:00` });
    push({ type: 'success', title: 'Agendamento criado' });
    nav('/meus-agendamentos');
  };

  return (
    <div className="app-page" style={{ maxWidth: 760 }}>
      <h1>Novo Agendamento</h1>
      <WizardSteps steps={steps} current={current} />
      {current === 0 && (
        <ServicePicker services={services} value={serviceId} onChange={setServiceId} />
      )}
      {current === 1 && (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div className="field" style={{ minWidth: 220 }}>
            <label className="field-label" htmlFor="data">Data (dd/mm/aaaa)</label>
            <input
              id="data"
              inputMode="numeric"
              placeholder="dd/mm/aaaa"
              maxLength={10}
              value={dateDisplay}
              onChange={e => {
                let v = e.target.value.replace(/\D/g, '').slice(0, 8);
                if (v.length >= 5) {
                  v = `${v.slice(0,2)}/${v.slice(2,4)}/${v.slice(4)}`;
                } else if (v.length >= 3) {
                  v = `${v.slice(0,2)}/${v.slice(2)}`;
                }
                setDateDisplay(v);
              }}
            />
            {dateDisplay && !isoDate && <small style={{ color: 'var(--color-danger)' }}>Data inválida</small>}
          </div>
          <div className="field" style={{ minWidth: 160 }}>
            <label className="field-label" htmlFor="hora">Hora</label>
            <input id="hora" type="time" value={time} onChange={e => setTime(e.target.value)} />
          </div>
        </div>
      )}
      {current === 2 && (
          <div className="card" style={{ maxWidth: 420 }}>
            <strong>Revisão</strong>
            <div style={{ marginTop: 8, fontSize: '.85rem' }}>
              Serviço: {services.find(s => s.id === serviceId)?.name}<br />
              Data/Hora: {isoDate && time ? `${formatDate(`${isoDate}T00:00:00`)} ${formatTime(`${isoDate}T${time}:00`)}` : '—'}
            </div>
          </div>
      )}
      <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
  {current > 0 && <Button variant="outline" onClick={prev}><Icon name="arrow-left" /> Voltar</Button>}
  {current < steps.length - 1 && <Button onClick={next} disabled={(current === 0 && !serviceId) || (current === 1 && (!isoDate || !time))}>Continuar <Icon name="arrow-right" /></Button>}
  {current === steps.length - 1 && <Button onClick={submit} disabled={!serviceId || !isoDate || !time}><Icon name="check" /> Confirmar</Button>}
      </div>
    </div>
  );
};

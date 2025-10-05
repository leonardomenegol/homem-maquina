import React, { useEffect, useRef, useState } from 'react';
import { Service } from '../types';

interface ServicePickerProps {
  services: Service[];
  value: string | null;
  onChange: (id: string) => void;
  label?: string;
  placeholder?: string;
}

export const ServicePicker: React.FC<ServicePickerProps> = ({ services, value, onChange, label = 'Serviço', placeholder = 'Selecione um serviço' }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const activeServices = services.filter(s => s.active);
  const filtered = query.trim() ? activeServices.filter(s => s.name.toLowerCase().includes(query.toLowerCase())) : activeServices;
  const selected = services.find(s => s.id === value) || null;

  const openPanel = () => { setOpen(true); setTimeout(() => listRef.current?.focus(), 0); };
  const closePanel = () => { setOpen(false); setQuery(''); setActiveIndex(-1); };

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!panelRef.current && !buttonRef.current) return;
      if (panelRef.current?.contains(e.target as Node) || buttonRef.current?.contains(e.target as Node)) return;
      closePanel();
    }
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const commit = (id: string) => { onChange(id); closePanel(); buttonRef.current?.focus(); };

  const onKeyButton: React.KeyboardEventHandler = (e) => {
    if (['Enter',' ','ArrowDown','ArrowUp'].includes(e.key)) { e.preventDefault(); open ? closePanel() : openPanel(); }
  };

  const onKeyList: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); closePanel(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(i => Math.min((i < 0 ? 0 : i + 1), filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(i => Math.max((i <= 0 ? 0 : i - 1), 0)); }
    if (e.key === 'Home') { e.preventDefault(); setActiveIndex(0); }
    if (e.key === 'End') { e.preventDefault(); setActiveIndex(filtered.length - 1); }
    if (e.key === 'Enter' && activeIndex >= 0) { e.preventDefault(); commit(filtered[activeIndex].id); }
  };

  useEffect(() => { if (activeIndex >= filtered.length) setActiveIndex(filtered.length - 1); }, [filtered, activeIndex]);

  return (
    <div className="combo">
      <label className="field-label" id="svc-label">{label}</label>
      <button
        ref={buttonRef}
        type="button"
        className="combo-trigger"
        aria-haspopup="listbox"
        aria-labelledby="svc-label"
        aria-expanded={open}
        onClick={() => (open ? closePanel() : openPanel())}
        onKeyDown={onKeyButton}
      >
        {selected ? (
          <span className="combo-value">
            <strong>{selected.name}</strong>
            <span>{selected.category}</span>
          </span>
        ) : (
          <span className="combo-placeholder">{placeholder}</span>
        )}
        <svg className="combo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      {open && (
        <div className="combo-panel" ref={panelRef} role="dialog" aria-label="Lista de serviços">
          <div className="combo-search">
            <input
              aria-label="Buscar serviço"
              placeholder="Buscar..."
              value={query}
              onChange={e => { setQuery(e.target.value); setActiveIndex(-1); }}
              onKeyDown={e => { if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(0); listRef.current?.focus(); } }}
            />
          </div>
          <ul
            ref={listRef}
            tabIndex={0}
            className="combo-options"
            role="listbox"
            aria-activedescendant={activeIndex >= 0 && filtered[activeIndex] ? `svc-opt-${filtered[activeIndex].id}` : undefined}
            onKeyDown={onKeyList}
          >
            {filtered.length === 0 && <li className="combo-empty">Nenhum resultado</li>}
            {filtered.map((s, i) => (
              <li
                id={`svc-opt-${s.id}`}
                key={s.id}
                role="option"
                aria-selected={s.id === value}
                className={`combo-option ${i === activeIndex ? 'active' : ''}`}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => commit(s.id)}
              >
                <span style={{ fontWeight:600, fontSize: '.8rem' }}>{s.name}</span>
                <span style={{ fontSize: '.6rem', textTransform:'uppercase', letterSpacing: '.5px', color: 'var(--color-text-secondary)' }}>{s.category}</span>
                <span style={{ fontSize: '.55rem', color: 'var(--color-text-secondary)' }}>Duração: {s.durationMinutes} min</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

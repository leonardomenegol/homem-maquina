import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { Icon } from '../components/Icon';

export const AccessibilitySettingsPage: React.FC = () => {
  const { highContrast, toggleContrast, fontScale, setFontScale } = useAccessibility();
  return (
    <div className="app-page" style={{ maxWidth: 560 }}>
      <h1>Acessibilidade</h1>
      <p className="text-secondary">Ajustes para melhorar sua experiência.</p>
      <div className="card" style={{ marginBottom: 24 }}>
  <strong className="icon-inline"><Icon name="contrast" /> Modo Alto Contraste</strong>
        <p style={{ fontSize: '.85rem' }}>Aumenta contraste para pessoas com baixa visão.</p>
  <button className="btn btn-outline" onClick={toggleContrast}><Icon name={highContrast ? 'close' : 'contrast'} /> {highContrast ? 'Desativar' : 'Ativar'}</button>
      </div>
      <div className="card">
  <strong className="icon-inline"><Icon name="font" /> Tamanho da Fonte</strong>
        <p style={{ fontSize: '.85rem' }}>Aumente se tiver dificuldade de leitura (reflow responsivo).</p>
        <input type="range" min={1} max={1.4} step={0.05} value={fontScale} onChange={e => setFontScale(parseFloat(e.target.value))} aria-label="Escala fonte" />
        <div style={{ fontSize: '.75rem', marginTop: 8 }}>Escala atual: {fontScale.toFixed(2)}x</div>
      </div>
    </div>
  );
};

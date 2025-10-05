import React from 'react';

interface WizardProps {
  steps: string[];
  current: number; // 0-based
}

export const WizardSteps: React.FC<WizardProps> = ({ steps, current }) => {
  return (
    <div className="wizard-steps" aria-label="Etapas do agendamento">
      {steps.map((s, i) => {
        const state = i === current ? 'active' : i < current ? 'done' : 'pending';
        return <div key={s} className={`wizard-step ${state}`}>{i + 1}. {s}</div>;
      })}
    </div>
  );
};

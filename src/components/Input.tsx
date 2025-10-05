import React from 'react';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export const Input: React.FC<FieldProps> = ({ label, id, hint, ...rest }) => {
  const inputId = id || rest.name || Math.random().toString(36).slice(2);
  return (
    <div className="field">
      <label htmlFor={inputId} className="field-label">{label}</label>
      <input id={inputId} {...rest} />
      {hint && <small className="text-secondary" style={{ marginTop: 4 }}>{hint}</small>}
    </div>
  );
};

import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, id, options, ...rest }) => {
  const selectId = id || rest.name || Math.random().toString(36).slice(2);
  return (
    <div className="field">
      <label htmlFor={selectId} className="field-label">{label}</label>
      <select id={selectId} {...rest}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
};

import React, { PropsWithChildren } from 'react';
import { Button } from './Button';

interface ModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  actions?: React.ReactNode;
  width?: string | number;
}

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({ open, title, onClose, actions, children, width }) => {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal" style={{ width }}>
        <div className="modal-header">
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{title}</h2>
          <Button variant="outline" aria-label="Fechar" onClick={onClose}>×</Button>
        </div>
        <div>{children}</div>
        {actions && <div className="modal-actions">{actions}</div>}
      </div>
    </div>
  );
};

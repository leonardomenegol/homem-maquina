import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => (
  <div className="app-page app-centered-block">
    <h1>Página não encontrada</h1>
    <p>Verifique o endereço.</p>
    <Link to="/">Voltar</Link>
  </div>
);

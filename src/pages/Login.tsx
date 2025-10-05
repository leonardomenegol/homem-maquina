import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';

export const LoginPage: React.FC = () => {
  const { login, usersCount } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [role, setRole] = useState<'professional' | 'patient'>('patient');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setPending(true);
    setTimeout(() => {
      const ok = login(name.trim(), role, password);
      setPending(false);
      if (!ok) { setError('Credenciais inválidas.'); return; }
      nav(role === 'professional' ? '/profissional' : '/paciente');
    }, 300);
  };

  return (
    <div className="auth-shell">
      <div className="auth-card" role="main" aria-labelledby="auth-title">
        <div className="auth-head">
          <h1 id="auth-title">Acessar Sistema</h1>
          <div className="auth-tagline">Agendamento de serviços da UBS</div>
        </div>
        <form onSubmit={handleSubmit} aria-label="Formulário de Login" className="auth-fields">
          <div className="field">
            <label className="field-label" htmlFor="nome">Nome de usuário</label>
            <input id="nome" autoComplete="username" value={name} onChange={e => setName(e.target.value)} placeholder="Digite seu usuário" />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="perfil">Perfil</label>
            <select id="perfil" value={role} onChange={e => setRole(e.target.value as any)}>
              <option value="patient">Paciente</option>
              <option value="professional">Profissional</option>
            </select>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="senha">Senha</label>
            <div style={{ display:'flex', alignItems:'stretch', gap:8 }}>
              <input id="senha" style={{ flex:'1 1 auto', maxWidth:'calc(100% - 84px)' }} type={showPwd ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••" />
              <button type="button" onClick={() => setShowPwd(s => !s)} aria-label={showPwd ? 'Ocultar senha' : 'Mostrar senha'} className="btn btn-outline" style={{ whiteSpace:'nowrap', padding:'0 12px', fontSize:'.65rem', display:'flex', alignItems:'center' }}>{showPwd ? 'Ocultar' : 'Mostrar'}</button>
            </div>
          </div>
          {error && <div style={{ color: 'var(--color-danger)', fontSize: '.7rem', marginTop: -4, marginBottom: 8 }}>{error}</div>}
          <Button type="submit" loading={pending}>Entrar</Button>
        </form>
        <div className="auth-meta">
          <a href="#recuperar" onClick={e => { e.preventDefault(); alert('Fluxo simulado de recuperação de senha.'); }}>Esqueci minha senha</a>
          <span>Usuários registrados: {usersCount}</span>
          <div>Não possui conta? <Link to="/registrar/paciente">Paciente</Link> · <Link to="/registrar/profissional">Profissional</Link></div>
        </div>
      </div>
    </div>
  );
};

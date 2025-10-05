import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';

export const RegisterPatientPage: React.FC = () => {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', birth: '', sus: '', phone: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const canSubmit = form.name && form.password.length >= 8 && form.password === form.confirm;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (form.password !== form.confirm) { setError('Senhas não conferem'); return; }
    const { success, message } = register({ name: form.name.trim(), role: 'patient', password: form.password, email: form.email, meta: { birth: form.birth, sus: form.sus, phone: form.phone } });
    if (!success) { setError(message || 'Falha ao registrar'); return; }
    setSuccess('Cadastro realizado. Redirecionando para login...');
    setTimeout(() => nav('/'), 1200);
  };

  return (
    <div className="auth-shell">
      <div className="auth-card" role="main" aria-labelledby="titulo-cad-paciente">
        <div className="auth-head">
          <h1 id="titulo-cad-paciente">Cadastrar Paciente</h1>
          <div className="auth-tagline">Crie sua conta para agendar serviços</div>
        </div>
        <form onSubmit={submit} noValidate className="auth-fields">
          <div className="field">
            <label className="field-label">Nome de usuário</label>
            <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required />
          </div>
          <div className="field">
            <label className="field-label">Email</label>
            <input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} />
          </div>
          <div className="field">
            <label className="field-label">Data de Nascimento</label>
            <input type="date" value={form.birth} onChange={e=>setForm(f=>({...f,birth:e.target.value}))} />
          </div>
          <div className="field">
            <label className="field-label">Cartão SUS</label>
            <input value={form.sus} onChange={e=>setForm(f=>({...f,sus:e.target.value}))} placeholder="Opcional" />
          </div>
          <div className="field">
            <label className="field-label">Telefone</label>
            <input value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="(xx) xxxxx-xxxx" />
          </div>
          <div className="field">
            <label className="field-label">Senha</label>
            <input type="password" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} required aria-describedby={form.password && form.password.length < 8 ? 'pwd-help-pac' : undefined} />
            {form.password && form.password.length < 8 && (
              <small id="pwd-help-pac" style={{ color:'var(--color-danger)', fontSize:'.65rem', marginTop:4 }}>
                A senha deve ter no mínimo 8 caracteres.
              </small>
            )}
          </div>
          <div className="field">
            <label className="field-label">Confirmar Senha</label>
            <input type="password" value={form.confirm} onChange={e=>setForm(f=>({...f,confirm:e.target.value}))} required aria-describedby={form.confirm && form.confirm !== form.password ? 'pwd-confirm-help-pac' : undefined} />
            {form.confirm && form.confirm !== form.password && (
              <small id="pwd-confirm-help-pac" style={{ color:'var(--color-danger)', fontSize:'.65rem', marginTop:4 }}>
                As senhas não conferem.
              </small>
            )}
          </div>
          {error && <div style={{ color: 'var(--color-danger)', fontSize: '.7rem' }}>{error}</div>}
          {success && <div style={{ color: 'var(--color-success)', fontSize: '.7rem' }}>{success}</div>}
          <Button type="submit" disabled={!canSubmit}>Cadastrar</Button>
        </form>
        <div className="auth-meta"><span>Já possui conta? <Link to="/">Voltar ao Login</Link></span></div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { Icon } from './Icon';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user, logout } = useAuth();
  const { highContrast, toggleContrast, fontScale, setFontScale } = useAccessibility();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="layout">
      <nav className="navbar" aria-label="Barra de Navegação">
        <div className="navbar-inner container">
          <Link to={user?.role === 'professional' ? '/profissional' : '/paciente'} className="nav-brand">
            <Icon name="service" /> <span>UBS<span className="brand-accent">Agenda</span></span>
          </Link>
          <div className="nav-desktop-group">
            {user && (
              <>
                {user.role === 'professional' && <NavLink to="/servicos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Serviços</NavLink>}
                {user.role === 'patient' && <NavLink to="/meus-agendamentos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Meus Agendamentos</NavLink>}
                <NavLink to="/acessibilidade" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Acessibilidade</NavLink>
              </>
            )}
            <button className="btn btn-outline compact" onClick={toggleContrast} aria-pressed={highContrast} title="Alternar contraste"><Icon name="contrast" /> <span className="hide-sm">{highContrast ? 'Contraste ON' : 'Contraste OFF'}</span></button>
            <label className="font-scale-ctrl">
              <span><Icon name="font" size={14} /></span>
              <input
                type="range"
                min={1}
                max={1.4}
                step={0.05}
                value={fontScale}
                onChange={e => setFontScale(parseFloat(e.target.value))}
                aria-label="Escala de fonte"
              />
            </label>
            {user ? (
              <button className="btn btn-outline compact" onClick={logout}><Icon name="logout" /> <span className="hide-sm">Sair ({user.name})</span></button>
            ) : (
              <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Login</NavLink>
            )}
          </div>
          <button className="nav-mobile-trigger" aria-label="Abrir menu" onClick={()=>setMobileMenu(o=>!o)}>
            <Icon name="menu" />
          </button>
        </div>
        {mobileMenu && (
          <div className="mobile-menu-panel" role="dialog" aria-label="Menu" onClick={()=>setMobileMenu(false)}>
            <div className="mobile-menu-sheet" onClick={e=>e.stopPropagation()}>
              <div className="mobile-menu-head">
                <span style={{ fontWeight:600 }}>Menu</span>
                <button onClick={()=>setMobileMenu(false)} className="close-mobile" aria-label="Fechar menu"><Icon name="close" /></button>
              </div>
              <div className="mobile-menu-links">
                {user?.role === 'professional' && <NavLink to="/profissional" onClick={()=>setMobileMenu(false)}>Dashboard</NavLink>}
                {user?.role === 'patient' && <NavLink to="/paciente" onClick={()=>setMobileMenu(false)}>Início</NavLink>}
                {user?.role === 'patient' && <NavLink to="/meus-agendamentos" onClick={()=>setMobileMenu(false)}>Meus Agendamentos</NavLink>}
                {user?.role === 'professional' && <NavLink to="/servicos" onClick={()=>setMobileMenu(false)}>Serviços</NavLink>}
                <NavLink to="/agendar" onClick={()=>setMobileMenu(false)}>Agendar</NavLink>
                <NavLink to="/acessibilidade" onClick={()=>setMobileMenu(false)}>Acessibilidade</NavLink>
              </div>
              <div className="mobile-menu-actions">
                <button className="btn btn-outline" onClick={toggleContrast}><Icon name="contrast" /> Contraste</button>
                {user ? <button className="btn btn-outline" onClick={logout}><Icon name="logout" /> Sair</button> : <NavLink to="/">Login</NavLink>}
              </div>
            </div>
          </div>
        )}
      </nav>
      <main className="main container">{children}</main>
      <div className="bottom-nav" aria-label="Navegação inferior">
        {user?.role === 'professional' ? (
          <>
            <NavLink to="/profissional" className={({isActive})=> isActive ? 'bn-link active' : 'bn-link'}><Icon name="home" size={20} /><span>Dash</span></NavLink>
            <NavLink to="/servicos" className={({isActive})=> isActive ? 'bn-link active' : 'bn-link'}><Icon name="service" size={20} /><span>Serviços</span></NavLink>
            <NavLink to="/acessibilidade" className={({isActive})=> isActive ? 'bn-link active' : 'bn-link'}><Icon name="contrast" size={20} /><span>Aces.</span></NavLink>
          </>
        ) : user?.role === 'patient' ? (
          <>
            <NavLink to="/paciente" className={({isActive})=> isActive ? 'bn-link active' : 'bn-link'}><Icon name="home" size={20} /><span>Início</span></NavLink>
            <NavLink to="/agendar" className={({isActive})=> isActive ? 'bn-link active' : 'bn-link'}><Icon name="calendar" size={20} /><span>Agendar</span></NavLink>
            <NavLink to="/meus-agendamentos" className={({isActive})=> isActive ? 'bn-link active' : 'bn-link'}><Icon name="clock" size={20} /><span>Meus</span></NavLink>
            <NavLink to="/acessibilidade" className={({isActive})=> isActive ? 'bn-link active' : 'bn-link'}><Icon name="contrast" size={20} /><span>Acess.</span></NavLink>
          </>
        ) : null}
      </div>
    </div>
  );
};

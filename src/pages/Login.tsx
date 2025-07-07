import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

type Mode = 'login' | 'forgot' | 'reset' | 'register';

const Login: React.FC = () => {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigate = useNavigate();
  const { login, role } = useAuth();

  const voltar = () => {
    setEmail('');
    setSenha('');
    setNovaSenha('');
    setConfirmarSenha('');
    setMode('login');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const sucesso = login(email, senha);
    if (sucesso) {
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'advogado') {
        navigate('/adv/dashboard');
      }
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <div className="login-container">
      {mode === 'login' && (
        <form onSubmit={handleLogin} className="login-form">
          <h2>Entrar</h2>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
          <button type="submit" id="login-btn">Entrar</button>
          <div className="login-links">
            <a onClick={() => setMode('forgot')}>Esqueceu sua senha?</a>
            <div className="extra-links">
              <a onClick={() => setMode('reset')}>Trocar senha</a> |{' '}
              <a onClick={() => setMode('register')}>Primeiro acesso</a>
            </div>
          </div>
        </form>
      )}

      {mode === 'forgot' && (
        <form onSubmit={(e) => { e.preventDefault(); alert('Link enviado'); voltar(); }} className="login-form">
          <h2>Recuperar Senha</h2>
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit">Enviar</button>
          <a className="voltar" onClick={voltar}>Voltar</a>
        </form>
      )}

      {mode === 'reset' && (
        <form onSubmit={(e) => { e.preventDefault(); alert('Senha trocada'); voltar(); }} className="login-form">
          <h2>Trocar Senha</h2>
          <input
            type="password"
            placeholder="Nova senha"
            value={novaSenha}
            onChange={e => setNovaSenha(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChange={e => setConfirmarSenha(e.target.value)}
            required
          />
          <button type="submit">Salvar</button>
          <a className="voltar" onClick={voltar}>Voltar</a>
        </form>
      )}

      {mode === 'register' && (
        <form onSubmit={(e) => { e.preventDefault(); alert('Cadastro realizado'); voltar(); }} className="login-form">
          <h2>Primeiro Acesso</h2>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
          <button type="submit">Cadastrar</button>
          <a className="voltar" onClick={voltar}>Voltar</a>
        </form>
      )}
    </div>
  );
};

export default Login;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Topbar: React.FC = () => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-[#2C3E50] w-full h-14 flex justify-center">
			<div className="xl:w-[1200px] xl:h-full flex items-center justify-evenly">
				<span className="w-1/2 pb-2 text-xl font-bold text-white">Sistema Jurídico</span>
				<ul className="flex pb-1">
					<li className="text-white pr-4"><Link to={role === 'admin' ? '/admin/dashboard' : '/adv/dashboard'}>Dashboard</Link></li>
          <li className="text-white pr-4">|</li>
					<li className="text-white pr-4"><Link to={role === 'admin' ? '/admin/intimacoes' : '/adv/intimacoes'}>Intimações</Link></li>
          <li className="text-white pr-4">|</li>
          <li className="text-white pr-4"><Link to={role === 'admin' ? '/admin/BaseConhecimento' : '/adv/BaseConhecimento'}>BaseDeConhecimentos</Link></li>
          <li className="text-white pr-4">|</li>
					<li className="text-white pr-4"><Link to={role === 'admin' ? '/admin/prazos' : '/adv/prazos'}>Prazos</Link></li>
          <li className="text-white pr-4">|</li>

          <li className="text-white pr-4"><Link to={role === 'admin' ? '/admin/prazosBKP' : '/admin/prazosBKP'}>PrazosBKP</Link></li>
          <li className="text-white pr-4">|</li>

          <li className="text-white pr-4">{role === 'admin' && <Link to="/admin/produtividade">Produtividade</Link>}</li>
          <li className="text-white pr-4">|</li>
          <li className="text-white pr-4">{role === 'admin' && <Link to="/settings">Configurações</Link>}</li>
				</ul>
        <button onClick={handleLogout} className="logout-button">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-log-out-icon lucide-log-out">
              <path d="m16 17 5-5-5-5" />
              <path d="M21 12H9" />
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            </svg>
            <span className="text-white pl-2 pb-1">Logout</span>
          </span>
        </button>				
			</div>
		</div>

    /* <header className="topbar">
      <div className="topbar-container">
        <div className="logo">Sistema Jurídico</div>
        <nav className="topbar-links">
          <Link to={role === 'admin' ? '/admin/dashboard' : '/adv/dashboard'}>Dashboard</Link>
          <Link to={role === 'admin' ? '/admin/intimacoes' : '/adv/intimacoes'}>Intimações</Link>
          <Link to={role === 'admin' ? '/admin/prazos' : '/adv/prazos'}>Prazos</Link>
          {role === 'advogado' && <Link to="/adv/revisao">Revisão</Link>}
          {role === 'advogado' && <Link to="/adv/baseconhecimento">Base de conhecimento</Link>}
          {role === 'admin' && <Link to="/admin/produtividade">Produtividade</Link>}
          {role === 'admin' && <Link to="/settings">Configurações</Link>}
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      </div>
    </header> */
  );
};

export default Topbar;

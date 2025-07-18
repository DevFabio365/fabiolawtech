import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Topbar: React.FC = () => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isIntimacoes = location.pathname.includes('intimacoes');
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    if (!isIntimacoes) return;

    const onScroll = () => {
      setShrink(window.scrollY > 0);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isIntimacoes]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      className={`${
        isIntimacoes
          ? `fixed top-0 left-0 w-full z-50 overflow-hidden transition-all duration-300 ${
              shrink ? 'h-10' : 'h-14'
            }`
          : 'h-14'
      } bg-[#2C3E50] w-full flex justify-center`}
    >
      <div className="xl:w-[1200px] xl:h-full flex items-center justify-evenly whitespace-nowrap">
        {/* Nome do sistema com scale ajustado */}
        <span
          className={`w-1/2 font-bold text-white transition-transform duration-300 origin-left ${
            isIntimacoes && shrink ? 'scale-75' : 'scale-100'
          }`}
        >
          Sistema Jurídico
        </span>

        {/* Menu de navegação com fade */}
        <ul
          className={`xl:w-[1200px] flex transition-opacity duration-300 ${
            isIntimacoes && shrink ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <li className="text-white pr-4">
            <Link to={role === 'admin' ? '/admin/tela' : '/adv/tela'}>[ TELA TESTE ]</Link>
          </li>
          <li className="text-white pr-4">|</li>
          <li className="text-white pr-4">
            <Link to={role === 'admin' ? '/admin/dashboard' : '/adv/dashboard'}>Dashboard</Link>
          </li>
          <li className="text-white pr-4">|</li>
          <li className="text-white pr-4">
            <Link to={role === 'admin' ? '/admin/intimacoes' : '/adv/intimacoes'}>Intimações</Link>
          </li>
          <li className="text-white pr-4">|</li>
          <li className="text-white pr-4">
            <Link to={role === 'admin' ? '/admin/BaseConhecimento' : '/adv/BaseConhecimento'}>Base De Conhecimentos</Link>
          </li>
          <li className="text-white pr-4">|</li>
          <li className="text-white pr-4">
            <Link to={role === 'admin' ? '/admin/prazos' : '/adv/prazos'}>Prazos</Link>
          </li>
          <li className="text-white pr-4">
            {role === 'admin' && (
              <Link to="/admin/produtividade">|<span className="pr-4" />Produtividade</Link>
            )}
          </li>
          <li className="text-white pr-4">
            {role === 'admin' && (
              <Link to="/settings">|<span className="pr-4" />Configurações</Link>
            )}
          </li>
        </ul>

        {/* Botão de logout com escala ajustada */}
        <button
          onClick={handleLogout}
          className="logout-button transition-transform duration-300 origin-right"
        >
          <span
            className={`flex items-center transition-transform duration-300 ${
              isIntimacoes && shrink ? 'scale-75' : 'scale-100'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-log-out-icon lucide-log-out w-4 h-4"
            >
              <path d="m16 17 5-5-5-5" />
              <path d="M21 12H9" />
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            </svg>
            <span className="text-white pl-2">Logout</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Topbar;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import Topbar from './pages/Topbar';

import Tela from './pages/ProcessoBKP';

import Login from './pages/Login';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardAdvogado from './pages/DashboardAdvogado';
import Intimacoes from './pages/Intimacoes';
import Processo from './pages/Processo';
import BaseConhecimento from './pages/BaseConhecimento';
import PrazosAdvogado from './pages/PrazosAdvogado';
import PrazosAdmin from './pages/PrazosAdmin';
import Produtividade from './pages/Produtividade';
import Settings from './pages/Settings';
import TestScreen from './pages/TestScreen';

const App: React.FC = () => {
  const { role } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route element={<PrivateRoute />}>
        <Route
          path="/*"
          element={
            <>
              <Topbar />
              <Routes>
                {role === 'admin' && <Route path="admin/tela" element={<Tela />} />}

                {role === 'admin' && <Route path="admin/dashboard" element={<DashboardAdmin />} />}
                {role === 'advogado' && <Route path="adv/dashboard" element={<DashboardAdvogado />} />}
                {role === 'admin' && <Route path="admin/produtividade" element={<Produtividade />} />}
                {role === 'admin' && <Route path="admin/intimacoes" element={<Intimacoes />} />}
                {role === 'advogado' && <Route path="adv/intimacoes" element={<Intimacoes />} />}
                {role === 'admin' && <Route path="admin/baseconhecimento" element={<BaseConhecimento />} />}
                {role === 'advogado' && <Route path="adv/baseconhecimento" element={<BaseConhecimento />} />}
                {role === 'admin' && <Route path="admin/prazos" element={<PrazosAdmin />} />}
                {role === 'advogado' && <Route path="adv/prazos" element={<PrazosAdvogado />} />}
                {role === 'admin' && <Route path="admin/processo" element={<Processo />} />}
                {role === 'advogado' && <Route path="adv/processo" element={<Processo />} />}                
                {role === 'admin' && <Route path="settings" element={<Settings />} />}
                {role === 'admin' && <Route path="admin/testscreen" element={<TestScreen />} />}
              </Routes>
            </>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
[1mdiff --git a/src/App.tsx b/src/App.tsx[m
[1mindex 8b399f3..fbd44e9 100644[m
[1m--- a/src/App.tsx[m
[1m+++ b/src/App.tsx[m
[36m@@ -1,10 +1,10 @@[m
 import React from 'react';[m
 import { Routes, Route } from 'react-router-dom';[m
 import { useAuth } from './context/AuthContext';[m
[32m+[m
 import PrivateRoute from './routes/PrivateRoute';[m
[31m-import Topbar from './pages/Topbar';[m
 [m
[31m-import Tela from './pages/DashboardAdminBKP';[m
[32m+[m[32mimport Topbar from './pages/Topbar';[m
 [m
 import Login from './pages/Login';[m
 import DashboardAdmin from './pages/DashboardAdmin';[m
[36m@@ -14,8 +14,10 @@[m [mimport Processo from './pages/Processo';[m
 import BaseConhecimento from './pages/BaseConhecimento';[m
 import PrazosAdvogado from './pages/PrazosAdvogado';[m
 import PrazosAdmin from './pages/PrazosAdmin';[m
[32m+[m[32m//import PrazosAdminBKP from './pages/PrazosAdmin';[m
 import Produtividade from './pages/Produtividade';[m
 import Settings from './pages/Settings';[m
[32m+[m
 import TestScreen from './pages/TestScreen';[m
 [m
 const App: React.FC = () => {[m
[36m@@ -32,8 +34,6 @@[m [mconst App: React.FC = () => {[m
             <>[m
               <Topbar />[m
               <Routes>[m
[31m-                {role === 'admin' && <Route path="admin/tela" element={<Tela />} />}[m
[31m-[m
                 {role === 'admin' && <Route path="admin/dashboard" element={<DashboardAdmin />} />}[m
                 {role === 'advogado' && <Route path="adv/dashboard" element={<DashboardAdvogado />} />}[m
                 {role === 'admin' && <Route path="admin/produtividade" element={<Produtividade />} />}[m
[1mdiff --git a/src/context/AuthContext.tsx b/src/context/AuthContext.tsx[m
[1mindex f4c45b0..99405f4 100644[m
[1m--- a/src/context/AuthContext.tsx[m
[1m+++ b/src/context/AuthContext.tsx[m
[36m@@ -19,13 +19,13 @@[m [mexport const AuthProvider = ({ children }: { children: ReactNode }) => {[m
   });[m
 [m
   const login = (user: string, password: string) => {[m
[31m-    if (user === 'adm@adm' && password === '123') {[m
[32m+[m[32m    if (user === 'admin@gmail.com' && password === '1234') {[m
       localStorage.setItem('auth', 'true');[m
       localStorage.setItem('role', 'admin');[m
       setIsAuthenticated(true);[m
       setRole('admin');[m
       return true;[m
[31m-    } else if (user === 'adv@adv' && password === '123') {[m
[32m+[m[32m    } else if (user === 'gustavoprado82@gmail.com' && password === '1234') {[m
       localStorage.setItem('auth', 'true');[m
       localStorage.setItem('role', 'advogado');[m
       setIsAuthenticated(true);[m
[1mdiff --git a/src/pages/DashboardAdmin.tsx b/src/pages/DashboardAdmin.tsx[m
[1mindex a267ec9..58b21b7 100644[m
[1m--- a/src/pages/DashboardAdmin.tsx[m
[1m+++ b/src/pages/DashboardAdmin.tsx[m
[36m@@ -158,4 +158,4 @@[m [mconst DashboardAdmin: React.FC = () => {[m
   );[m
 };[m
 [m
[31m-export default DashboardAdmin;[m
\ No newline at end of file[m
[32m+[m[32mexport default DashboardAdmin;[m
[1mdiff --git a/src/pages/DashboardAdminBKP.tsx b/src/pages/DashboardAdminBKP.tsx[m
[1mdeleted file mode 100644[m
[1mindex 9fc636f..0000000[m
[1m--- a/src/pages/DashboardAdminBKP.tsx[m
[1m+++ /dev/null[m
[36m@@ -1,157 +0,0 @@[m
[31m-import React from 'react';[m
[31m-import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';[m
[31m-import './Dashboard.css';[m
[31m-[m
[31m-const processos = [[m
[31m-  {[m
[31m-    numero: '123456-01.2024.8.26.0010',[m
[31m-    descricao: 'Recurso em ação tributária',[m
[31m-    advogado: 'Dra. Ana Souza',[m
[31m-    prazoInterno: '2025-06-10',[m
[31m-    prazoFatal: '2025-06-12',[m
[31m-  },[m
[31m-  {[m
[31m-    numero: '654321-09.2023.8.26.0020',[m
[31m-    descricao: 'Prazo para embargos',[m
[31m-    advogado: 'Dr. Carlos Ramos',[m
[31m-    prazoInterno: '2025-06-11',[m
[31m-    prazoFatal: '2025-06-14',[m
[31m-  },[m
[31m-];[m
[31m-[m
[31m-const naoAtribuidos = [[m
[31m-  {[m
[31m-    numero: '789123-03.2024.8.26.0030',[m
[31m-    descricao: 'Cumprimento de sentença',[m
[31m-    prazoFatal: '2025-06-15',[m
[31m-  },[m
[31m-];[m
[31m-[m
[31m-const porAdvogado = [[m
[31m-  { name: 'Dra. Ana Souza', value: 15 },[m
[31m-  { name: 'Dr. Carlos Ramos', value: 12 },[m
[31m-  { name: 'Dr. Paulo Lima', value: 8 },[m
[31m-];[m
[31m-[m
[31m-const statusData = [[m
[31m-  { name: 'Recebido', value: 20 },[m
[31m-  { name: 'Em andamento', value: 45 },[m
[31m-  { name: 'Concluído', value: 35 },[m
[31m-];[m
[31m-[m
[31m-const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];[m
[31m-[m
[31m-const DashboardAdmin: React.FC = () => {[m
[31m-  return ([m
[31m-    <div className="dashboard-container">[m
[31m-      <h2>Visão de prazos</h2>[m
[31m-[m
[31m-      {/* KPIs */}[m
[31m-      <div className="kpi-container">[m
[31m-[m
[31m-<div className="section">[m
[31m-        <h3></h3>[m
[31m-        <PieChart width={400} height={300}>[m
[31m-          <Pie[m
[31m-            data={statusData}[m
[31m-            dataKey="value"[m
[31m-            nameKey="name"[m
[31m-            cx="50%"[m
[31m-            cy="50%"[m
[31m-            outerRadius={90}[m
[31m-            label[m
[31m-          >[m
[31m-            {statusData.map((entry, index) => ([m
[31m-              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />[m
[31m-            ))}[m
[31m-          </Pie>[m
[31m-          <Tooltip />[m
[31m-          <Legend />[m
[31m-        </PieChart>[m
[31m-      </div>[m
[31m-[m
[31m-        <div className="kpi-card">[m
[31m-            <h3>Total</h3>[m
[31m-            <p>180</p>[m
[31m-          </div>[m
[31m-          <div className="kpi-card">[m
[31m-            <h3>Recebidos</h3>[m
[31m-            <p>30</p>[m
[31m-          </div>[m
[31m-          <div className="kpi-card">[m
[31m-            <h3>Em andamento</h3>[m
[31m-            <p>90</p>[m
[31m-          </div>[m
[31m-          <div className="kpi-card">[m
[31m-            <h3>Concluídos</h3>[m
[31m-            <p>60</p>[m
[31m-          </div>[m
[31m-      </div>[m
[31m-[m
[31m-      {/* Tabela de próximos prazos */}[m
[31m-      <div className="section">[m
[31m-        <h3>Próximos prazos</h3>[m
[31m-        <table>[m
[31m-          <thead>[m
[31m-            <tr>[m
[31m-              <th>Processo</th>[m
[31m-              <th>Descrição</th>[m
[31m-              <th>Advogado</th>[m
[31m-              <th>Prazo Interno</th>[m
[31m-              <th>Prazo Fatal</th>[m
[31m-            </tr>[m
[31m-          </thead>[m
[31m-          <tbody>[m
[31m-            {processos.map(p => ([m
[31m-              <tr key={p.numero}>[m
[31m-                <td><a href={`/admin/processo?idprocesso=${p.numero}`}>{p.numero}</a></td>[m
[31m-                <td>{p.descricao}</td>[m
[31m-                <td>{p.advogado}</td>[m
[31m-                <td>{p.prazoInterno}</td>[m
[31m-                <td>{p.prazoFatal}</td>[m
[31m-              </tr>[m
[31m-            ))}[m
[31m-          </tbody>[m
[31m-        </table>[m
[31m-      </div>[m
[31m-[m
[31m-      {/* Tabela de não atribuídos */}[m
[31m-      <div className="section">[m
[31m-        <h3>Processos não atribuídos</h3>[m
[31m-        <table>[m
[31m-          <thead>[m
[31m-            <tr>[m
[31m-              <th>Processo</th>[m
[31m-              <th>Descrição</th>[m
[31m-              <th>Prazo Fatal</th>[m
[31m-            </tr>[m
[31m-          </thead>[m
[31m-          <tbody>[m
[31m-            {naoAtribuidos.map(p => ([m
[31m-              <tr key={p.numero}>[m
[31m-                <td><a href={`/admin/processo?idprocesso=${p.numero}`}>{p.numero}</a></td>[m
[31m-                <td>{p.descricao}</td>[m
[31m-                <td>{p.prazoFatal}</td>[m
[31m-              </tr>[m
[31m-            ))}[m
[31m-          </tbody>[m
[31m-        </table>[m
[31m-      </div>[m
[31m-[m
[31m-      {/* Gráficos */}[m
[31m-      <div className="section">[m
[31m-        <h3>Carga de trabalho por advogado</h3>[m
[31m-        <BarChart width={500} height={300} data={porAdvogado}>[m
[31m-          <XAxis dataKey="name" />[m
[31m-          <YAxis />[m
[31m-          <Tooltip />[m
[31m-          <Bar dataKey="value" fill="#2c3e50" />[m
[31m-        </BarChart>[m
[31m-      </div>[m
[31m-[m
[31m-      [m
[31m-    </div>[m
[31m-  );[m
[31m-};[m
[31m-[m
[31m-export default DashboardAdmin;[m
[1mdiff --git a/src/pages/Topbar.tsx b/src/pages/Topbar.tsx[m
[1mindex 6e10d3a..a648e14 100644[m
[1m--- a/src/pages/Topbar.tsx[m
[1m+++ b/src/pages/Topbar.tsx[m
[36m@@ -13,24 +13,24 @@[m [mconst Topbar: React.FC = () => {[m
 [m
   return ([m
     <div className="bg-[#2C3E50] w-full h-14 flex justify-center">[m
[31m-			<div className="xl:w-[1200px] xl:h-full flex items-center justify-evenly whitespace-nowrap">[m
[32m+[m			[32m<div className="xl:w-[1200px] xl:h-full flex items-center justify-evenly">[m
 				<span className="w-1/2 pb-2 text-xl font-bold text-white">Sistema Jurídico</span>[m
[31m-[m
[31m-				<ul className="xl:w-[1200px] flex pb-1">[m
[31m-[m
[31m-          <li className="text-white pr-4"><Link to={role === 'admin' ? '/admin/tela' : '/adv/tela'}>[ TELA TESTE ]</Link></li>[m
[31m-          <li className="text-white pr-4">|</li>[m
[31m-[m
[32m+[m				[32m<ul className="flex pb-1">[m
 					<li className="text-white pr-4"><Link to={role === 'admin' ? '/admin/dashboard' : '/adv/dashboard'}>Dashboard</Link></li>[m
           <li className="text-white pr-4">|</li>[m
 					<li className="text-white pr-4"><Link to={role === 'admin' ? '/admin/intimacoes' : '/adv/intimacoes'}>Intimações</Link></li>[m
           <li className="text-white pr-4">|</li>[m
[31m-          <li className="text-white pr-4"><Link to={role === 'admin' ? '/admin/BaseConhecimento' : '/adv/BaseConhecimento'}>Base De Conhecimentos</Link></li>[m
[32m+[m[32m          <li className="text-white pr-4"><Link to={role === 'admin' ? '/admin/BaseConhecimento' : '/adv/BaseConhecimento'}>BaseDeConhecimentos</Link></li>[m
           <li className="text-white pr-4">|</li>[m
 					<li className="text-white pr-4"><Link to={role === 'admin' ? '/admin/prazos' : '/adv/prazos'}>Prazos</Link></li>[m
[32m+[m[32m          <li className="text-white pr-4">|</li>[m
[32m+[m
[32m+[m[32m          <li className="text-white pr-4"><Link to={role === 'admin' ? '/admin/prazos' : '/admin/prazos'}>PrazosBKP</Link></li>[m
[32m+[m[32m          <li className="text-white pr-4">|</li>[m
 [m
[31m-          <li className="text-white pr-4">{role === 'admin' && <Link to="/admin/produtividade">|<span className="pr-4" />Produtividade</Link>}</li>[m
[31m-          <li className="text-white pr-4">{role === 'admin' && <Link to="/settings">|<span className="pr-4" />Configurações</Link>}</li>[m
[32m+[m[32m          <li className="text-white pr-4">{role === 'admin' && <Link to="/admin/produtividade">Produtividade</Link>}</li>[m
[32m+[m[32m          <li className="text-white pr-4">|</li>[m
[32m+[m[32m          <li className="text-white pr-4">{role === 'admin' && <Link to="/settings">Configurações</Link>}</li>[m
 				</ul>[m
         <button onClick={handleLogout} className="logout-button">[m
           <span className="flex items-center">[m

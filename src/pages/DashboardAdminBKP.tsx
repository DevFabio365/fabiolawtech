import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import './Dashboard.css';

const processos = [
  {
    numero: '123456-01.2024.8.26.0010',
    descricao: 'Recurso em ação tributária',
    advogado: 'Dra. Ana Souza',
    prazoInterno: '2025-06-10',
    prazoFatal: '2025-06-12',
  },
  {
    numero: '654321-09.2023.8.26.0020',
    descricao: 'Prazo para embargos',
    advogado: 'Dr. Carlos Ramos',
    prazoInterno: '2025-06-11',
    prazoFatal: '2025-06-14',
  },
];

const naoAtribuidos = [
  {
    numero: '789123-03.2024.8.26.0030',
    descricao: 'Cumprimento de sentença',
    prazoFatal: '2025-06-15',
  },
];

const porAdvogado = [
  { name: 'Dra. Ana Souza', value: 15 },
  { name: 'Dr. Carlos Ramos', value: 12 },
  { name: 'Dr. Paulo Lima', value: 8 },
];

const statusData = [
  { name: 'Recebido', value: 20 },
  { name: 'Em andamento', value: 45 },
  { name: 'Concluído', value: 35 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const DashboardAdmin: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h2>Visão de prazos</h2>

      {/* KPIs */}
      <div className="kpi-container">

<div className="section">
        <h3></h3>
        <PieChart width={400} height={300}>
          <Pie
            data={statusData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

        <div className="kpi-card">
            <h3>Total</h3>
            <p>180</p>
          </div>
          <div className="kpi-card">
            <h3>Recebidos</h3>
            <p>30</p>
          </div>
          <div className="kpi-card">
            <h3>Em andamento</h3>
            <p>90</p>
          </div>
          <div className="kpi-card">
            <h3>Concluídos</h3>
            <p>60</p>
          </div>
      </div>

      {/* Tabela de próximos prazos */}
      <div className="section">
        <h3>Próximos prazos</h3>
        <table>
          <thead>
            <tr>
              <th>Processo</th>
              <th>Descrição</th>
              <th>Advogado</th>
              <th>Prazo Interno</th>
              <th>Prazo Fatal</th>
            </tr>
          </thead>
          <tbody>
            {processos.map(p => (
              <tr key={p.numero}>
                <td><a href={`/admin/processo?idprocesso=${p.numero}`}>{p.numero}</a></td>
                <td>{p.descricao}</td>
                <td>{p.advogado}</td>
                <td>{p.prazoInterno}</td>
                <td>{p.prazoFatal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabela de não atribuídos */}
      <div className="section">
        <h3>Processos não atribuídos</h3>
        <table>
          <thead>
            <tr>
              <th>Processo</th>
              <th>Descrição</th>
              <th>Prazo Fatal</th>
            </tr>
          </thead>
          <tbody>
            {naoAtribuidos.map(p => (
              <tr key={p.numero}>
                <td><a href={`/admin/processo?idprocesso=${p.numero}`}>{p.numero}</a></td>
                <td>{p.descricao}</td>
                <td>{p.prazoFatal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gráficos */}
      <div className="section">
        <h3>Carga de trabalho por advogado</h3>
        <BarChart width={500} height={300} data={porAdvogado}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#2c3e50" />
        </BarChart>
      </div>

      
    </div>
  );
};

export default DashboardAdmin;

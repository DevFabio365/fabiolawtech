import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './Dashboard.css';

const prazos = [
  {
    numero: '845201-03.2024.8.26.0010',
    descricao: 'Contestação em ação trabalhista',
    prazoInterno: '2025-06-11',
    prazoFatal: '2025-06-13',
  },
  {
    numero: '920183-10.2023.8.26.0009',
    descricao: 'Prazo de réplica em ação civil',
    prazoInterno: '2025-06-12',
    prazoFatal: '2025-06-14',
  },
];

const statusData = [
  { name: 'Recebido', value: 3 },
  { name: 'Em andamento', value: 9 },
  { name: 'Concluído', value: 6 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const DashboardAdvogado: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h2>Meu Dashboard</h2>

      {/* KPIs */}
      <div className="kpi-container">
        {/* Gráfico de status */}
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
            <h3>Prazos total</h3>
            <p>18</p>
          </div>
          <div className="kpi-card">
            <h3>Prazos recebidos</h3>
            <p>3</p>
          </div>
          <div className="kpi-card">
            <h3>Prazos em andamento</h3>
            <p>9</p>
          </div>
          <div className="kpi-card">
            <h3>Prazos concluídos</h3>
            <p>6</p>
          </div>

      </div>

      {/* Tabela de prazos */}
      <div className="section">
        <h3>Prazos:</h3>
        <table>
          <thead>
            <tr>
              <th>Processo</th>
              <th>Descrição</th>
              <th>Prazo Interno</th>
              <th>Prazo Fatal</th>
            </tr>
          </thead>
          <tbody>
            {prazos.map(p => (
              <tr key={p.numero}>
                <td>
                  <a href={`/adv/processo?idprocesso=${p.numero}`}>{p.numero}</a>
                </td>
                <td>{p.descricao}</td>
                <td>{p.prazoInterno}</td>
                <td>{p.prazoFatal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default DashboardAdvogado;

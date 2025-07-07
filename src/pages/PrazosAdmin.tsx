import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import './Prazos.css';

const kpis = {
  Total: 14,
  Recebido: 5,
  'Em andamento': 6,
  'Em revisão': 3,
};

const prazosStatusPorAdvogado = [
  { advogado: 'Dra. Ana', Recebido: 3, 'Em andamento': 2, 'Em revisão': 1 },
  { advogado: 'Dr. João', Recebido: 2, 'Em andamento': 4, 'Em revisão': 2 },
  { advogado: 'Dr. Carlos', Recebido: 1, 'Em andamento': 3, 'Em revisão': 2 },
];

const prazosSemana = [
  {
    processo: '1023456-98.2024.8.26.0001',
    advogado: 'Dra. Ana',
    prazoInterno: '2024-06-09',
    status: 'Em andamento',
  },
  {
    processo: '2045678-22.2024.8.26.0002',
    advogado: 'Dr. João',
    prazoInterno: '2024-06-10',
    status: 'Recebido',
  },
  {
    processo: '3098765-88.2024.8.26.0003',
    advogado: 'Dr. Carlos',
    prazoInterno: '2024-06-12',
    status: 'Em revisão',
  },
  {
    processo: '4077123-33.2024.8.26.0004',
    advogado: 'Dra. Ana',
    prazoInterno: '2024-06-13',
    status: 'Recebido',
  },
  {
    processo: '5083345-77.2024.8.26.0005',
    advogado: 'Dr. João',
    prazoInterno: '2024-06-14',
    status: 'Em andamento',
  },
];

const diasRestantes = (data: string) => {
  const hoje = new Date();
  const prazo = new Date(data);
  const diff = (prazo.getTime() - hoje.getTime()) / (1000 * 3600 * 24);
  return Math.ceil(diff);
};

const PrazosAdminBKP: React.FC = () => {
  return (
    <div className="prazos-container">
      <h2>Prazos - Administrador</h2>

      {/* KPIs com Total primeiro */}
      <div className="kpis">
        {Object.entries(kpis)
          .sort(([a], [b]) => (a === 'Total' ? -1 : b === 'Total' ? 1 : 0))
          .map(([key, value]) => (
            <div key={key} className="kpi-card">
              <strong>{value}</strong>
              <span>{key}</span>
            </div>
          ))}
      </div>

      <div className="prazos-content">
        {/* Gráfico */}
        <div className="grafico-barras">
          <h3>Prazos por advogado</h3>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart layout="vertical" data={prazosStatusPorAdvogado}>
              <XAxis type="number" />
              <YAxis type="category" dataKey="advogado" />
              <Tooltip />
              <Bar dataKey="Recebido" fill="#8884d8">
                <LabelList dataKey="Recebido" position="right" />
              </Bar>
              <Bar dataKey="Em andamento" fill="#82ca9d">
                <LabelList dataKey="Em andamento" position="right" />
              </Bar>
              <Bar dataKey="Em revisão" fill="#ffc658">
                <LabelList dataKey="Em revisão" position="right" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabela lateral */}
        <div className="tabela-prazos">
          <h3>Prazos da semana</h3>
          <table>
            <thead>
              <tr>
                <th>Processo</th>
                <th>Advogado</th>
                <th>Prazo Interno</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {prazosSemana.map(prazo => (
                <tr
                  key={prazo.processo}
                  className={diasRestantes(prazo.prazoInterno) <= 2 ? 'urgente' : ''}
                >
                  <td>
                    <a href={`/admin/processo?idprocesso=${prazo.processo}`}>{prazo.processo}</a>
                  </td>
                  <td>{prazo.advogado}</td>
                  <td>{prazo.prazoInterno}</td>
                  <td>{prazo.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PrazosAdminBKP;

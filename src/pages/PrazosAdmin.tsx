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

const PrazosAdmin: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col space-y-8 items-center pt-5">
      <h2 className="font-bold text-black text-xl">Prazos - Administrador</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        {Object.entries(kpis)
          .sort(([a], [b]) => (a === 'Total' ? -1 : b === 'Total' ? 1 : 0))
          .map(([key, value]) => (
            <div key={key} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <strong className="text-lg">{value}</strong>
              <span className="text-gray-600">{key}</span>
            </div>
          ))}
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="w-full md:w-1/2 xl:w-1/3">
          <h3 className="text-lg font-bold mb-2">Prazos por advogado</h3>
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

        <div className="w-full md:w-1/2 xl:w-1/3">
  <h3 className="text-lg font-bold mb-2">Prazos da semana</h3>
  <table className="w-full table-auto">
    <thead>
      <tr>
        <th className="px-4 py-2">Processo</th>
        <th className="px-4 py-2">Advogado</th>
        <th className="px-4 py-2">Prazo Interno</th>
        <th className="px-4 py-2">Status</th>
      </tr>
    </thead>
    <tbody>
      {prazosSemana.map((prazo, index) => (
        <tr key={index} className="border-b border-gray-200">
          <td className="px-4 py-2">{prazo.processo}</td>
          <td className="px-4 py-2">{prazo.advogado}</td>
          <td className="px-4 py-2">{prazo.prazoInterno}</td>
          <td className="px-4 py-2">{prazo.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
</div>
);
};

export default PrazosAdmin;
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

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
    <div className="w-full min-h-screen flex flex-col space-y-8 items-center pt-5">
      <div className="flex flex-col space-y-3 xl:w-[1200px]">
        <div className="font-bold text-black text-xl">Visão de prazos</div>
      </div>

      <div className="flex flex-wrap gap-6 xl:w-[1200px] items-start">
        <div className="bg-white rounded-md shadow p-4 w-1/3 min-w-[240px]">
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
        <div className="flex flex-wrap gap-4 flex-1">
          <div className="bg-white border rounded-md shadow w-32 text-center p-3">
            <div className="text-lg font-bold">180</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="bg-white border rounded-md shadow w-32 text-center p-3">
            <div className="text-lg font-bold">30</div>
            <div className="text-sm text-gray-600">Recebidos</div>
          </div>
          <div className="bg-white border rounded-md shadow w-32 text-center p-3">
            <div className="text-lg font-bold">90</div>
            <div className="text-sm text-gray-600">Em andamento</div>
          </div>
          <div className="bg-white border rounded-md shadow w-32 text-center p-3">
            <div className="text-lg font-bold">60</div>
            <div className="text-sm text-gray-600">Concluídos</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md shadow p-4 xl:w-[1200px]">
        <h3 className="font-semibold mb-2">Próximos prazos</h3>
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-1 text-left">Processo</th>
              <th className="px-2 py-1 text-left">Descrição</th>
              <th className="px-2 py-1 text-left">Advogado</th>
              <th className="px-2 py-1 text-left">Prazo Interno</th>
              <th className="px-2 py-1 text-left">Prazo Fatal</th>
            </tr>
          </thead>
          <tbody>
            {processos.map((p) => (
              <tr key={p.numero}>
                <td className="border-b px-2 py-1">
                  <a href={`/admin/processo?idprocesso=${p.numero}`} className="text-blue-800">
                    {p.numero}
                  </a>
                </td>
                <td className="border-b px-2 py-1">{p.descricao}</td>
                <td className="border-b px-2 py-1">{p.advogado}</td>
                <td className="border-b px-2 py-1">{p.prazoInterno}</td>
                <td className="border-b px-2 py-1">{p.prazoFatal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-md shadow p-4 xl:w-[1200px]">
        <h3 className="font-semibold mb-2">Processos não atribuídos</h3>
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-1 text-left">Processo</th>
              <th className="px-2 py-1 text-left">Descrição</th>
              <th className="px-2 py-1 text-left">Prazo Fatal</th>
            </tr>
          </thead>
          <tbody>
            {naoAtribuidos.map((p) => (
              <tr key={p.numero}>
                <td className="border-b px-2 py-1">
                  <a href={`/admin/processo?idprocesso=${p.numero}`} className="text-blue-800">
                    {p.numero}
                  </a>
                </td>
                <td className="border-b px-2 py-1">{p.descricao}</td>
                <td className="border-b px-2 py-1">{p.prazoFatal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-md shadow p-4 xl:w-[1200px]">
        <h3 className="font-semibold mb-2">Carga de trabalho por advogado</h3>
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

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

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
    <div className="w-full h-screen flex flex-col space-y-8 items-center pt-5">
      <div className="flex flex-col space-y-3 xl:w-[1200px]">
        <div className="font-bold text-black text-xl">Meu Dashboard</div>
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
            <div className="text-lg font-bold">18</div>
            <div className="text-sm text-gray-600">Prazos total</div>
          </div>
          <div className="bg-white border rounded-md shadow w-32 text-center p-3">
            <div className="text-lg font-bold">3</div>
            <div className="text-sm text-gray-600">Prazos recebidos</div>
          </div>
          <div className="bg-white border rounded-md shadow w-32 text-center p-3">
            <div className="text-lg font-bold">9</div>
            <div className="text-sm text-gray-600">Prazos em andamento</div>
          </div>
          <div className="bg-white border rounded-md shadow w-32 text-center p-3">
            <div className="text-lg font-bold">6</div>
            <div className="text-sm text-gray-600">Prazos concluídos</div>
          </div>
        </div>
      </div>


      <div className="bg-white rounded-md border border-dashed p-4 xl:w-[1200px]">
        <h4 className="font-semibold mb-4">Prazos</h4>        
            <table className="min-w-full text-sm border-collapse bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-1 text-left">Processo</th>
                  <th className="px-2 py-1 text-left">Descrição</th>
                  <th className="px-2 py-1 text-left">Prazo Interno</th>
                  <th className="px-2 py-1 text-left">Prazo Fatal</th>                  
                </tr>
              </thead>
              
              <tbody>
                <tr className="border-b">
                  <td className="border-b px-2 py-1">
                    <a
                      href={`/adv/processo?idprocesso=1`}                      
                    >
                      <span className="font-bold px-0 py-1 no-underline">845201-03.2024.8.26.0010</span>
                    </a>
                  </td>
                  <td className="border-b px-2 py-1">Contestação em ação trabalhista</td>
                  <td className="border-b px-2 py-1">11/06/2025</td> 
                  <td className="border-b px-2 py-1">13/06/2025</td>                  
                </tr> 

                <tr className="border-b">
                  <td className="border-b px-2 py-1">
                    <a
                      href={`/adv/processo?idprocesso=1`}                      
                    >
                      <span className="font-bold px-0 py-1 no-underline">920183-10.2023.8.26.0009</span>
                    </a>
                  </td>
                  <td className="border-b px-2 py-1">Prazo de réplica em ação civil</td>
                  <td className="border-b px-2 py-1">12/06/2025</td> 
                  <td className="border-b px-2 py-1">14/06/2025</td>                   
                </tr>
                <tr className="border-b">
                  <td className="border-b px-2 py-1">
                    <a
                      href={`/adv/processo?idprocesso=1`}                      
                    >
                      <span className="font-bold px-0 py-1 no-underline">845201-03.2024.8.26.0010</span>
                    </a>
                  </td>
                  <td className="border-b px-2 py-1">Contestação em ação trabalhista</td>
                  <td className="border-b px-2 py-1">11/06/2025</td> 
                  <td className="border-b px-2 py-1">13/06/2025</td>                  
                </tr> 

                <tr className="border-b">
                  <td className="border-b px-2 py-1">
                    <a
                      href={`/adv/processo?idprocesso=1`}                      
                    >
                      <span className="font-bold px-0 py-1 no-underline">920183-10.2023.8.26.0009</span>
                    </a>
                  </td>
                  <td className="border-b px-2 py-1">Prazo de réplica em ação civil</td>
                  <td className="border-b px-2 py-1">12/06/2025</td> 
                  <td className="border-b px-2 py-1">14/06/2025</td>                   
                </tr>                       
              </tbody>
            </table>     
      </div>
      <span className="m-4">d</span>
    </div>
  );
};

export default DashboardAdvogado;

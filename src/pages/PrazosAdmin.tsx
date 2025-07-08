import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

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

const PrazosAdmin: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col space-y-8 items-center pt-5">
      <div className="flex flex-col space-y-3 xl:w-[1200px]">
        <div className="font-bold text-black text-xl">Prazos</div>
      </div>

      <div className="flex flex-wrap gap-4 xl:w-[1200px]">
        {Object.entries(kpis)
          .sort(([a], [b]) => (a === 'Total' ? -1 : b === 'Total' ? 1 : 0))
          .map(([key, value]) => (
            <div
              key={key}
              className="bg-white border rounded-md shadow w-32 text-center p-3"
            >
              <div className="text-lg font-bold">{value}</div>
              <div className="text-sm text-gray-600">{key}</div>
            </div>
          ))}
      </div>

      <div className="flex gap-6 xl:w-[1200px] items-start">
        <div className="bg-white rounded-md shadow p-4 w-1/3 min-w-[240px]">
        <h4 className="font-semibold mb-2">Prazos por advogado</h4>          
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





        <div className="bg-white rounded-md border border-dashed p-4 flex-1">
          <h4 className="font-semibold mb-4">Prazos da semana</h4>
            <table className="min-w-full text-sm border-collapse bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-1 text-left">Processo</th>
                  <th className="px-2 py-1 text-left">Advogado</th>
                  <th className="px-2 py-1 text-left">Prazo Interno</th>
                  <th className="px-2 py-1 text-left">Status</th>
                </tr>
              </thead>
              
              <tbody>
                <tr className="border-b">
                  <td className="border-b px-2 py-1">
                    <a
                      href={`/admin/processo?idprocesso=1`}                      
                    >
                      <span className="font-bold px-0 py-1 no-underline">1023456-98.2024.8.26.0001</span>
                    </a>
                  </td>
                  <td className="border-b px-2 py-1">Dra. Ana</td>
                  <td className="border-b px-2 py-1">09/06/2024</td> 
                  <td className="border-b px-2 py-1">Em andamento</td>   
                </tr>
                  <tr className="border-b">
                  <td className="border-b px-2 py-1">
                    <a
                      href={`/admin/processo?idprocesso=1`}                      
                    >
                      <span className="font-bold px-0 py-1 no-underline">1023456-98.2024.8.26.0001</span>
                    </a>
                  </td>
                  <td className="border-b px-2 py-1">Dr. João</td>
                  <td className="border-b px-2 py-1">10/06/2024</td> 
                  <td className="border-b px-2 py-1">Recebido</td>   
                </tr> 
                  <tr className="border-b">
                  <td className="border-b px-2 py-1">
                    <a
                      href={`/admin/processo?idprocesso=1`}                      
                    >
                      <span className="font-bold px-0 py-1 no-underline">2045678-22.2024.8.26.0002</span>
                    </a>
                  </td>
                  <td className="border-b px-2 py-1">Dr. Carlos</td>
                  <td className="border-b px-2 py-1">12/06/2024</td> 
                  <td className="border-b px-2 py-1">Em revisão</td>   
                </tr> 
                  <tr className="border-b">
                  <td className="border-b px-2 py-1">
                    <a
                      href={`/admin/processo?idprocesso=1`}                      
                    >
                      <span className="font-bold px-0 py-1 no-underline">1023456-98.2024.8.26.0001</span>
                    </a>
                  </td>
                  <td className="border-b px-2 py-1">Dra. Ana</td>
                  <td className="border-b px-2 py-1">13/06/2024</td> 
                  <td className="border-b px-2 py-1">Recebido</td>   
                </tr> 
                  <tr className="border-b">
                  <td className="border-b px-2 py-1">
                    <a
                      href={`/admin/processo?idprocesso=1`}                      
                    >
                      <span className="font-bold px-0 py-1 no-underline">1023456-98.2024.8.26.0001</span>
                    </a>
                  </td>
                  <td className="border-b px-2 py-1">Dra. Ana</td>
                  <td className="border-b px-2 py-1">14/06/2024</td> 
                  <td className="border-b px-2 py-1">Em andamento</td>   
                </tr>
                <tr className="border-b">
                  <td className="border-b px-2 py-1">
                    <a
                      href={`/admin/processo?idprocesso=1`}                      
                    >
                      <span className="font-bold px-0 py-1 no-underline">1023456-98.2024.8.26.0001</span>
                    </a>
                  </td>
                  <td className="border-b px-2 py-1">Dra. Ana</td>
                  <td className="border-b px-2 py-1">09/06/2024</td> 
                  <td className="border-b px-2 py-1">Em andamento</td>   
                </tr>
                  <tr className="border-b">
                  <td className="border-b px-2 py-1">
                    <a
                      href={`/admin/processo?idprocesso=1`}                      
                    >
                      <span className="font-bold px-0 py-1 no-underline">1023456-98.2024.8.26.0001</span>
                    </a>
                  </td>
                  <td className="border-b px-2 py-1">Dr. João</td>
                  <td className="border-b px-2 py-1">10/06/2024</td> 
                  <td className="border-b px-2 py-1">Recebido</td>   
                </tr> 
                  <tr className="border-b">
                  <td className="border-b px-2 py-1">
                    <a
                      href={`/admin/processo?idprocesso=1`}                      
                    >
                      <span className="font-bold px-0 py-1 no-underline">2045678-22.2024.8.26.0002</span>
                    </a>
                  </td>
                  <td className="border-b px-2 py-1">Dr. Carlos</td>
                  <td className="border-b px-2 py-1">12/06/2024</td> 
                  <td className="border-b px-2 py-1">Em revisão</td>   
                </tr> 
                  <tr className="border-b">
                  <td className="border-b px-2 py-1">
                    <a
                      href={`/admin/processo?idprocesso=1`}                      
                    >
                      <span className="font-bold px-0 py-1 no-underline">1023456-98.2024.8.26.0001</span>
                    </a>
                  </td>
                  <td className="border-b px-2 py-1">Dra. Ana</td>
                  <td className="border-b px-2 py-1">13/06/2024</td> 
                  <td className="border-b px-2 py-1">Recebido</td>   
                </tr> 
                  <tr className="border-b">
                  <td className="border-b px-2 py-1">
                    <a
                      href={`/admin/processo?idprocesso=1`}                      
                    >
                      <span className="font-bold px-0 py-1 no-underline">1023456-98.2024.8.26.0001</span>
                    </a>
                  </td>
                  <td className="border-b px-2 py-1">Dra. Ana</td>
                  <td className="border-b px-2 py-1">14/06/2024</td> 
                  <td className="border-b px-2 py-1">Em andamento</td>   
                </tr>                    
              </tbody>                
            </table>
        </div>



      </div>
    </div>
  );
};

export default PrazosAdmin;

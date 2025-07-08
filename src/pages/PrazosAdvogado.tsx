import React from 'react';

const kpis = {
  Total: 6,
  Recebido: 2,
  'Em andamento': 3,
  'Em revisão': 1,
};

const prazos = [
  {
    processo: '6021234-00.2024.8.26.0006',
    resumo: 'Intimação para manifestação sobre prova pericial.',
    objeto: 'Intimação',
    providencia: 'Analisar',
    prazoInterno: '2024-06-09',
    prazoFatal: '2024-06-15',
    status: 'Recebido',
  },
  {
    processo: '7098765-11.2024.8.26.0007',
    resumo: 'Resposta à petição inicial.',
    objeto: 'Citação',
    providencia: 'Responder',
    prazoInterno: '2024-06-10',
    prazoFatal: '2024-06-18',
    status: 'Em andamento',
  },
  {
    processo: '8044321-22.2024.8.26.0008',
    resumo: 'Análise de despacho de redistribuição.',
    objeto: 'Mandado',
    providencia: 'Analisar',
    prazoInterno: '2024-06-11',
    prazoFatal: '2024-06-19',
    status: 'Em revisão',
  },
  {
    processo: '9044321-33.2024.8.26.0009',
    resumo: 'Decisão sobre produção de provas.',
    objeto: 'Intimação',
    providencia: 'Analisar',
    prazoInterno: '2024-06-12',
    prazoFatal: '2024-06-20',
    status: 'Concluído',
  },
  {
    processo: '1001234-44.2024.8.26.0010',
    resumo: 'Intimação de sentença.',
    objeto: 'Intimação',
    providencia: 'Arquivar',
    prazoInterno: '2024-06-13',
    prazoFatal: '2024-06-21',
    status: 'Distribuído',
  },
];

const diasRestantes = (data: string) => {
  const hoje = new Date();
  const prazo = new Date(data);
  const diff = (prazo.getTime() - hoje.getTime()) / (1000 * 3600 * 24);
  return Math.ceil(diff);
};

const PrazosAdvogado: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col space-y-8 items-center pt-5">
      <div className="flex flex-col space-y-3 xl:w-[1200px]">
        <div className="font-bold text-black text-xl">Meus Prazos</div>
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

      <div className="bg-white rounded-md border border-dashed p-4 xl:w-[1200px]">
        <h4 className="font-semibold mb-4">Próximos prazos internos</h4>        
            <table className="min-w-full text-sm border-collapse bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-1 text-left">Processo</th>
                  <th className="px-2 py-1 text-left">Resumo</th>
                  <th className="px-2 py-1 text-left">Objeto</th>
                  <th className="px-2 py-1 text-left">Providência</th>
                  <th className="px-2 py-1 text-left">Prazo Interno</th>
                  <th className="px-2 py-1 text-left">Prazo Fatal</th>
                  <th className="px-2 py-1 text-left">Status</th>
                  <th className="px-2 py-1 text-left">Ações</th>
                </tr>
              </thead>
              
              <tbody>
                <tr className="border-b">
                  <td className="border-b px-2 py-1">
                    <a
                      href={`/adv/processo?idprocesso=1`}                      
                    >
                      <span className="font-bold px-0 py-1 no-underline">1023456-98.2024.8.26.0001</span>
                    </a>
                  </td>
                  <td className="border-b px-2 py-1">Intimação para manifestação sobre prova pericial.</td>
                  <td className="border-b px-2 py-1">Intimação</td> 
                  <td className="border-b px-2 py-1">Analisar</td>
                  <td className="border-b px-2 py-1">09/06/2024</td>
                  <td className="border-b px-2 py-1">15/06/2024</td>
                  <td className="border-b px-2 py-1">Recebido</td>
                  <td className="border-b px-2 py-1">
                    <button className="bg-[#2C3E50] text-white px-3 py-1 rounded">
                      Iniciar
                    </button>
                  </td>   
                </tr>
                <tr className="border-b">
                  <td className="border-b px-2 py-1">
                    <a
                      href={`/adv/processo?idprocesso=1`}                      
                    >
                      <span className="font-bold px-0 py-1 no-underline">1023456-98.2024.8.26.0001</span>
                    </a>
                  </td>
                  <td className="border-b px-2 py-1">Resposta à petição inicial.</td>
                  <td className="border-b px-2 py-1">Citação</td> 
                  <td className="border-b px-2 py-1">Analisar</td>
                  <td className="border-b px-2 py-1">09/06/2024</td>
                  <td className="border-b px-2 py-1">15/06/2024</td>
                  <td className="border-b px-2 py-1">Em andamento</td>
                  <td className="border-b px-2 py-1">
                    <button className="bg-[#2C3E50] text-white px-3 py-1 rounded">
                      Enviar para revisão
                    </button>
                  </td>   
                </tr>
                <tr className="border-b">
                  <td className="border-b px-2 py-1">
                    <a
                      href={`/adv/processo?idprocesso=1`}                      
                    >
                      <span className="font-bold px-0 py-1 no-underline">1023456-98.2024.8.26.0001</span>
                    </a>
                  </td>
                  <td className="border-b px-2 py-1">Análise de despacho de redistribuição.</td>
                  <td className="border-b px-2 py-1">Mandado</td> 
                  <td className="border-b px-2 py-1">Analisar</td>
                  <td className="border-b px-2 py-1">09/06/2024</td>
                  <td className="border-b px-2 py-1">15/06/2024</td>
                  <td className="border-b px-2 py-1">Em revisão</td>
                  <td className="border-b px-2 py-1">
                    <button className="bg-[#2C3E50] text-white px-3 py-1 rounded">
                      Iniciar
                    </button>
                  </td>   
                </tr>
                <tr className="border-b">
                  <td className="border-b px-2 py-1">
                    <a
                      href={`/adv/processo?idprocesso=1`}                      
                    >
                      <span className="font-bold px-0 py-1 no-underline">1023456-98.2024.8.26.0001</span>
                    </a>
                  </td>
                  <td className="border-b px-2 py-1">Decisão sobre produção de provas.</td>
                  <td className="border-b px-2 py-1">Intimação</td> 
                  <td className="border-b px-2 py-1">Analisar</td>
                  <td className="border-b px-2 py-1">09/06/2024</td>
                  <td className="border-b px-2 py-1">15/06/2024</td>
                  <td className="border-b px-2 py-1">Concluído</td>
                  <td className="border-b px-2 py-1">
                    <button className="bg-[#2C3E50] text-white px-3 py-1 rounded">
                      Enviar para revisão
                    </button>
                  </td>   
                </tr>
                <tr className="border-b">
                  <td className="border-b px-2 py-1">
                    <a
                      href={`/adv/processo?idprocesso=1`}                      
                    >
                      <span className="font-bold px-0 py-1 no-underline">1023456-98.2024.8.26.0001</span>
                    </a>
                  </td>
                  <td className="border-b px-2 py-1">Intimação de sentença.</td>
                  <td className="border-b px-2 py-1">Intimação</td> 
                  <td className="border-b px-2 py-1">Analisar</td>
                  <td className="border-b px-2 py-1">09/06/2024</td>
                  <td className="border-b px-2 py-1">15/06/2024</td>
                  <td className="border-b px-2 py-1">Distribuído</td>
                  <td className="border-b px-2 py-1">
                    <button className="bg-[#2C3E50] text-white px-3 py-1 rounded">
                      Enviar para revisão
                    </button>
                  </td>   
                </tr>
              </tbody>
            </table>     
      </div>      
    </div>
    
  );
};

export default PrazosAdvogado;

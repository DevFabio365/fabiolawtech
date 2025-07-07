import React from 'react';
import './Prazos.css';

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
    <div className="prazos-container">
      <h2>Meus Prazos</h2>

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

      <h3>Próximos prazos internos</h3>
      <table className="prazos-tabela">
        <thead>
          <tr>
            <th>Processo</th>
            <th>Resumo</th>
            <th>Objeto</th>
            <th>Providência</th>
            <th>Prazo Interno</th>
            <th>Prazo Fatal</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {prazos.map(p => (
            <tr
              key={p.processo}
              className={diasRestantes(p.prazoInterno) <= 2 ? 'urgente' : ''}
            >
              <td><a href={`/adv/processo?idprocesso=${p.processo}`}>{p.processo}</a></td>
              <td>{p.resumo}</td>
              <td>{p.objeto}</td>
              <td>{p.providencia}</td>
              <td>{p.prazoInterno}</td>
              <td>{p.prazoFatal}</td>
              <td>{p.status}</td>
              <td>
                {p.status === 'Recebido' && <button>Iniciar</button>}
                {p.status === 'Em andamento' && <button>Enviar para revisão</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrazosAdvogado;

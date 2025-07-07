import React, { useState } from 'react';
import './Processo.css';

type Arquivo = { nome: string; versao: string; atualizadoEm: string; nota: string };
type Complementar = { nome: string; nota: string };

const Processo: React.FC = () => {
  const [peca, setPeca] = useState<Arquivo | null>({
    nome: 'Contestacao_001.docx',
    versao: 'v1.0',
    atualizadoEm: '10/06/2024',
    nota: 'Versão inicial enviada pelo advogado'
  });
  const [complementares, setComplementares] = useState<Complementar[]>([]);
  const [mostrarPop, setMostrarPop] = useState(false);
  const [novoArquivo, setNovoArquivo] = useState<{ nome: string } | null>(null);

  const handleDropPeca = (nome: string) => {
    if (peca) {
      setNovoArquivo({ nome });
      setMostrarPop(true);
    } else {
      registrarNovaPeca(nome);
    }
  };

  const registrarNovaPeca = (nome: string) => {
    const nova: Arquivo = {
      nome,
      versao: 'v2.0',
      atualizadoEm: new Date().toLocaleDateString('pt-BR'),
      nota: 'Substituído por template'
    };
    setPeca(nova);
  };

  const handleDropComplementar = (nome: string) => {
    const novo: Complementar = {
      nome,
      nota: 'Adicionado de template em ' + new Date().toLocaleDateString('pt-BR')
    };
    setComplementares(prev => [...prev, novo]);
  };

  const removerComplementar = (index: number) => {
    setComplementares(prev => prev.filter((_, i) => i !== index));
  };

  const aceitarSubstituicao = () => {
    if (novoArquivo) registrarNovaPeca(novoArquivo.nome);
    setMostrarPop(false);
  };

  const dragStart = (e: React.DragEvent<HTMLAnchorElement>, nome: string) => {
    e.dataTransfer.setData('text/plain', nome);
  };

  const handleDropZone = (
    e: React.DragEvent<HTMLDivElement>,
    destino: 'peca' | 'complementar'
  ) => {
    e.preventDefault();
    const nome = e.dataTransfer.getData('text/plain');
    if (destino === 'peca') handleDropPeca(nome);
    else handleDropComplementar(nome);
  };

  return (
    <div className="processo-wrapper">
      <h2>Processo: 0012345-89.2024.8.26.0001</h2>

      <div className="linha-inicial">
        <div className="bloco"><p><strong>Resumo:</strong> Contestação por inadimplemento.</p>
        <p><strong>Objeto:</strong> Agravo</p>
        <p><strong>Providência:</strong> Manifestação ao agravo.</p></div>
        <div className="bloco"><p><strong>Prazo Interno:</strong> 09/06/2024</p><p><strong>Prazo Fatal:</strong> 12/06/2024</p></div>
        <div className="bloco">
          <p><strong>Status:</strong> <span className="status status-azul">Em andamento</span></p>
          <div className="acoes-bloco">
            <span className="acoes-label">Ações:</span>
            <button>Enviar para revisão</button>
          </div>
        </div>
      </div>

      <div className="linha-upload">
        <div className="upload-coluna">
          <h3>Peça</h3>
          <div className="drop-zone"
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDropZone(e, 'peca')}
          >
            Arraste aqui ou clique para enviar
            <input type="file" onChange={e => {
              if (e.target.files?.[0]) handleDropPeca(e.target.files[0].name);
            }} />
          </div>

          {peca && (
            <table className="tabela-versionamento">
              <thead><tr><th>Nome</th><th>Versão</th><th>Atualizado em</th><th>Nota</th></tr></thead>
              <tbody><tr><td>{peca.nome}</td><td>{peca.versao}</td><td>{peca.atualizadoEm}</td><td>{peca.nota}</td></tr></tbody>
            </table>
          )}
        </div>

        <div className="upload-coluna">
          <h3>Arquivos complementares</h3>
          <div className="drop-zone"
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDropZone(e, 'complementar')}
          >
            Arraste aqui ou clique para enviar
            <input type="file" onChange={e => {
              if (e.target.files?.[0]) handleDropComplementar(e.target.files[0].name);
            }} />
          </div>

          <table className="tabela-versionamento">
            <thead><tr><th>Nome</th><th>Nota</th><th></th></tr></thead>
            <tbody>
              {complementares.map((c, i) => (
                <tr key={i}>
                  <td><a href="#">{c.nome}</a></td>
                  <td>{c.nota}</td>
                  <td><button onClick={() => removerComplementar(i)}>🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="templates-ai">
        <h4>Templates gerados por AI</h4>
        <ul>
          <li><a href="#" draggable onDragStart={e => dragStart(e, 'Modelo Contestação.docx')}>Modelo Contestação.docx</a></li>
          <li><a href="#" draggable onDragStart={e => dragStart(e, 'Resposta Inicial.docx')}>Resposta Inicial.docx</a></li>
          <li><a href="#" draggable onDragStart={e => dragStart(e, 'Memorial.docx')}>Memorial.docx</a></li>
        </ul>
      </div>
      <div className="bloco">
        <h4>Histórico do processo</h4>
        <ul>
          <li>Distribuído em 01/06/2024</li>
          <li>Intimação recebida em 05/06/2024</li>
          <li>Peça carregada em 09/06/2024</li>
          <li>Envio para revisão pendente</li>
        </ul>
</div>

      {mostrarPop && novoArquivo && (
        <div className="popup">
          <div className="popup-content">
            <h4>Substituir arquivo</h4>
            <p>Deseja substituir o arquivo <strong>{peca?.nome}</strong> pelo arquivo <strong>{novoArquivo.nome}</strong>?</p>
            <div className="popup-buttons">
              <button onClick={aceitarSubstituicao}>Sim</button>
              <button onClick={() => setMostrarPop(false)}>Não</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Processo;

import React, { useState } from 'react';

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
    <div className="w-full min-h-screen flex flex-col space-y-8 items-center pt-5 bg-gray-100">
      <div className="w-full max-w-[1100px] space-y-8">
        <h2 className="text-xl font-bold">Processo: 0012345-89.2024.8.26.0001</h2>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 bg-white p-4 rounded-md shadow">
            <p>
              <strong>Resumo:</strong> Contestação por inadimplemento.
            </p>
            <p>
              <strong>Objeto:</strong> Agravo
            </p>
            <p>
              <strong>Providência:</strong> Manifestação ao agravo.
            </p>
          </div>
          <div className="flex-1 bg-white p-4 rounded-md shadow">
            <p>
              <strong>Prazo Interno:</strong> 09/06/2024
            </p>
            <p>
              <strong>Prazo Fatal:</strong> 12/06/2024
            </p>
          </div>
          <div className="flex-1 bg-white p-4 rounded-md shadow">
            <p>
              <strong>Status:</strong>{' '}
              <span className="px-2 py-1 rounded font-semibold bg-blue-100 text-blue-900">Em andamento</span>
            </p>
            <div className="flex items-center gap-4 mt-4">
              <span className="font-medium">Ações:</span>
              <button className="bg-[#2C3E50] text-white px-3 py-1 rounded">Enviar para revisão</button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Peça</h3>
            <div
              className="border-2 border-dashed border-gray-300 p-4 text-center bg-white rounded-lg relative text-sm mb-4 min-h-[80px]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropZone(e, 'peca')}
            >
              Arraste aqui ou clique para enviar
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleDropPeca(e.target.files[0].name);
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            {peca && (
              <table className="min-w-full text-sm border-collapse bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 py-1 text-left">Nome</th>
                    <th className="px-2 py-1 text-left">Versão</th>
                    <th className="px-2 py-1 text-left">Atualizado em</th>
                    <th className="px-2 py-1 text-left">Nota</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b px-2 py-1">{peca.nome}</td>
                    <td className="border-b px-2 py-1">{peca.versao}</td>
                    <td className="border-b px-2 py-1">{peca.atualizadoEm}</td>
                    <td className="border-b px-2 py-1">{peca.nota}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold mb-2">Arquivos complementares</h3>
            <div
              className="border-2 border-dashed border-gray-300 p-4 text-center bg-white rounded-lg relative text-sm mb-4 min-h-[80px]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropZone(e, 'complementar')}
            >
              Arraste aqui ou clique para enviar
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleDropComplementar(e.target.files[0].name);
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            <table className="min-w-full text-sm border-collapse bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-1 text-left">Nome</th>
                  <th className="px-2 py-1 text-left">Nota</th>
                  <th className="px-2 py-1 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {complementares.map((c, i) => (
                  <tr key={i}>
                    <td className="border-b px-2 py-1">
                      <a href="#" className="text-[#2C3E50] font-medium">
                        {c.nome}
                      </a>
                    </td>
                    <td className="border-b px-2 py-1">{c.nota}</td>
                    <td className="border-b px-2 py-1 w-10">
                      <button onClick={() => removerComplementar(i)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md mb-8 shadow">
          <h4 className="font-semibold mb-2">Templates gerados por AI</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <a
                href="#"
                className="cursor-grab select-none"
                draggable
                onDragStart={(e) => dragStart(e, 'Modelo Contestação.docx')}
              >
                Modelo Contestação.docx
              </a>
            </li>
            <li>
              <a
                href="#"
                className="cursor-grab select-none"
                draggable
                onDragStart={(e) => dragStart(e, 'Resposta Inicial.docx')}
              >
                Resposta Inicial.docx
              </a>
            </li>
            <li>
              <a
                href="#"
                className="cursor-grab select-none"
                draggable
                onDragStart={(e) => dragStart(e, 'Memorial.docx')}
              >
                Memorial.docx
              </a>
            </li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-md shadow">
          <h4 className="font-semibold mb-2">Histórico do processo</h4>
          <ul className="list-disc pl-5">
            <li>Distribuído em 01/06/2024</li>
            <li>Intimação recebida em 05/06/2024</li>
            <li>Peça carregada em 09/06/2024</li>
            <li>Envio para revisão pendente</li>
          </ul>
        </div>

        {mostrarPop && novoArquivo && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-8 w-[400px] rounded-lg shadow">
              <h4 className="font-semibold mb-2">Substituir arquivo</h4>
              <p>
                Deseja substituir o arquivo <strong>{peca?.nome}</strong> pelo arquivo{' '}
                <strong>{novoArquivo.nome}</strong>?
              </p>
              <div className="flex justify-end gap-4 mt-4">
                <button onClick={aceitarSubstituicao} className="bg-[#2C3E50] text-white px-3 py-1 rounded">
                  Sim
                </button>
                <button onClick={() => setMostrarPop(false)} className="bg-[#2C3E50] text-white px-3 py-1 rounded">
                  Não
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Processo;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

import { Intimacao, IntimacaoAdvogado, advogadosMock } from '../types/Intimacao';
import { getIntimacoes } from "../services/intimacaoService";

const Intimacoes: React.FC = () => {
  const { role } = useAuth();
  const isAdmin = role === 'admin';

  const [dados, setDados] = useState<Intimacao[]>([]);
  const [loading, setLoading] = useState(true);

  const [advogadoSelecionado, setAdvogadoSelecionado] = useState<number | ''>('');

  //npm install -g json-server
  //json-server --watch ./src/data/db.json --port 3000
  //npm install --save-dev concurrently

  useEffect(() => {
    getIntimacoes()
      .then((data) => {
        setDados(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar intimações:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (

   <div>
    <div className="w-full h-screen flex flex-col space-y-8 items-center pt-5 mt-14">
        <div className="flex flex-col space-y-3 xl:w-[1200px]">
            <div className="font-bold text-black text-xl">Intimações</div>
            <div className='space-x-2.5'>
                <span className="bg-[#2C3E50] pl-4 pr-4 pt-2 pb-2 rounded-md text-white">Todas</span>
                <span className="bg-[#ccc] pl-4 pr-4 pt-2 pb-2 rounded-md text-white">Não Atribuídas</span>
                <span className="bg-[#ccc] pl-4 pr-4 pt-2 pb-2 rounded-md text-white">Recentes</span>
            </div>
        </div>

        <div className="bg-[#F5F5F5] rounded-md xl:w-[1200px] flex flex-col  pl-4 pt-4 pb-4">
            <form className="flex space-x-5">
                <div className="space-y-5">
                    <fieldset className="space-y-1">
                        <legend className="text-xs text-[#333]">Processo:</legend>
                        <div className="flex space-x-1 items-center">
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-33 ps-3 p-1.5" placeholder="1111111-11.1111"/>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-13 ps-3 p-1.5" placeholder="8.26" disabled/>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-14 ps-3 p-1.5" placeholder="1111"/>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#606060" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                        </div>
                    </fieldset>

                    <fieldset className="space-y-1">
                        <legend className="text-xs text-[#333]">Resumo:</legend>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-62 ps-3 p-1.5"/>
                    </fieldset>                        
                </div>
                
                <div className="space-y-5">
                    <fieldset className="space-y-1">
                        <legend className="text-xs text-[#333]">Objeto:</legend>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-40 ps-3 p-1.5 ">
                            <option value="volvo" selected>Todos</option>
                            <option value="saab">Citação</option>
                            <option value="saab">Intimação</option>
                            <option value="saab">Mandado</option>
                        </select>
                    </fieldset>

                    <fieldset className="space-y-1">
                        <legend className="text-xs text-[#333]">Providência:</legend>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-40 ps-3 p-1.5">
                            <option value="volvo" selected>Todas</option>
                            <option value="saab">Responder</option>
                            <option value="saab">Analisar</option>
                            <option value="saab">Arquivar</option>
                        </select>
                    </fieldset>
                </div>

                <div className="space-y-5">
                    <fieldset className="space-y-1">
                        <legend className="text-xs text-[#333]">Revisor:</legend>
                        <select
                        id="advogado"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-40 ps-3 p-1.5"
                        value={advogadoSelecionado}
                        onChange={(e) => setAdvogadoSelecionado(Number(e.target.value))}
                        >
                        <option value="">-- Selecione --</option>
                        {advogadosMock.map((adv) => (
                            <option key={adv.id} value={adv.id}>
                            {adv.nome}
                            </option>
                        ))}
                        </select>                       
                    </fieldset>

                    <fieldset className="space-y-1">
                        <legend className="text-xs text-[#333]">Advogado:</legend>
                        <select
                            id="advogado"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-40 ps-3 p-1.5"
                            value={advogadoSelecionado}
                            onChange={(e) => setAdvogadoSelecionado(Number(e.target.value))}
                            >
                            <option value="">-- Selecione --</option>
                            {advogadosMock.map((adv) => (
                                <option key={adv.id} value={adv.id}>
                                {adv.nome}
                                </option>
                            ))}
                        </select> 
                    </fieldset>
                </div>

                <div className="space-y-5">
                    <fieldset className="space-y-1">
                        <legend className="text-xs text-[#333]">Prazo Interno:</legend>
                        <div className="flex space-x-1">
                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-40 ps-3 p-1.5">
                                <option value="volvo" selected>Exato</option>
                                <option value="saab">Antes de</option>
                                <option value="saab">Depois de</option>
                            </select>
                            <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-40 ps-3 p-1.5"/>
                        </div>
                    </fieldset>

                    <fieldset className="space-y-1">
                        <legend className="text-xs text-[#333]">Prazo Fatal:</legend>
                        <div className="flex space-x-1">
                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-40 ps-3 p-1.5">
                                <option value="volvo" selected>Exato</option>
                                <option value="saab">Antes de</option>
                                <option value="saab">Depois de</option>
                            </select>
                            <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-40 ps-3 p-1.5"/>
                        </div>
                    </fieldset>    
                </div>
            </form>
        </div>


        <div className="bg-[#FFFFFF] xl:w-[1200px] border border-dashed p-4">      

            <div className="bg-[#EEEEEE] flex space-x-2 pl-1 pr-1">
                <div className="w-42 h-10  hover:bg-[#e6e8ea]">
                    <span className="text-xs select-none">Processo</span><span id="processosobe" className="text-xs hidden">&#xa0;&#xa0;&#x2191;</span><span id="processodesce" className="text-xs hidden">&#xa0;&#xa0;&#x2193;</span>
                </div>
                <div className="w-52 h-10 hover:bg-[#e6e8ea]">
                    <span className="text-xs select-none">Resumo</span>
                </div>
                <div className="w-20 h-10 hover:bg-[#e6e8ea]">
                    <span className="text-xs select-none">Objeto</span>
                </div>
                <div className="w-20 h-10 hover:bg-[#e6e8ea]">
                    <span className="text-xs select-none">Nota</span>
                </div>
                <div className="w-24 h-10 hover:bg-[#e6e8ea]">
                    <span className="text-xs select-none">Advogado</span>
                </div>
                <div className="w-24 h-10 hover:bg-[#e6e8ea]">
                    <span className="text-xs select-none">Revisor</span>
                </div>
                <div className="w-20 h-10 hover:bg-[#e6e8ea]">
                    <span className="text-xs select-none">Prazo Fatal</span>
                </div>
                <div className="w-20 h-10 hover:bg-[#e6e8ea]">
                    <span className="text-xs select-none">Prazo Interno</span>
                </div>
                <div className="w-32 h-10 hover:bg-[#e6e8ea]">
                    <span className="text-xs select-none">Providência</span>
                </div>
                <div className="w-18 h-10 hover:bg-[#e6e8ea]">
                    <span className="text-xs select-none">Ações</span>
                </div>                
            </div>            
            
            {dados.map((item) => (
            <div className="flex space-x-2 border border-gray-300 pl-1 pr-1 hover:bg-[#F9F9F9]">
                <div className="w-42 h-14">
                    <span className="font-bold text-xs">{item.numero}</span>
                </div>
                <div className="w-52 h-14">
                    <span className="text-xs w-44">{item.resumo}</span>
                </div>
                <div className="w-20 h-14">
                    <span className="text-xs">{item.objeto}</span>
                </div>
                <div className="w-20 h-14">
                    <span className="text-xs">{item.providencia}</span>
                </div>
                <div className="w-24 h-14">
                    <span className="text-xs">{item.advogado}</span>
                </div>
                <div className="w-24 h-14">
                    <span className="text-xs">{item.revisor}</span>
                </div>
                <div className="w-20 h-14">
                    <span className="text-xs">{item.prazoInterno}</span>
                </div>
                <div className="w-20 h-14">
                    <span className="text-xs">{item.prazoFatal}</span>
                </div>
                <div className="w-32 h-14">
                    <span className="text-xs">{item.nota}</span>
                </div>
                <div className="w-18 h-14 flex space-y-2 items-center pt-2 pb-2">
                    <div className="pt-1">
                        <span className="bg-[#2C3E50] pl-4 pr-4 pt-2 pb-2 rounded-md text-white">Editar</span>
                    </div>
                </div>                
            </div>            
            ))}
        </div>
    </div>
  </div>

  );
};

export default Intimacoes;
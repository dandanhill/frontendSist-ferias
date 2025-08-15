'use client'
import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';

interface Gerencia {
  ID_GERENCIA: number;
  GERENCIA: string;
  SIGLA_GERENCIA: string;
}

interface Funcionario {
  MATRICULA_F: string;
  NOME: string;
  GERENCIA: string;
  SIGLA_GERENCIA: string;
  STATUS: string;
  PERIODO_AQUISITIVO_EM_ABERTO: string;
  GOZO: string;
  TIPO: string;
  ID_PERIODO?: string | null;
  MES_FORMATADO?: string; // para filtro/select
  DIA_EM_MES?: string;    // para exibir na tabela
  SALDO?: string;         
}

interface Gozo {
  ID: string,
  MES: number,             // MES como número
  TIPO: string,
  PERCEPCAO: string,
  ANO: string,
  SALDO: string
}

const Gerencias: React.FC = () => {
  const [gerencias, setGerencias] = useState<Gerencia[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [funcionariosEmFerias, setFuncionariosEmFerias] = useState<Gozo[]>([]);
  const [filteredFuncionarios, setFilteredFuncionarios] = useState<Funcionario[]>([]);
  const [selectedSigla, setSelectedSigla] = useState<string>('');
  const [selectedMes, setSelectedMes] = useState<string>('');

  const meses = [
    "", "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];

  const sigla = [
    "", "GACD", "GAC", "GTI", "GAB SEREC", "2INST", "GFTM", "PFM", "GCONT", "GEPF",
    "CIJ", "GAF", "GPEC", "GPAG", "GAB SEFAZ", "GCOINF", "GAB SEFIN"
  ]
  // Atualiza os funcionários com MES_FORMATADO e SALDO
  const mapFuncionariosComMes = (funcs: Funcionario[], ferias: Gozo[]) => {
    return funcs.map(f => {
      const feriasFuncionario = ferias.find(g => g.ID === f.ID_PERIODO);
      let mesFormatado = '-';
      let diaEMes = '-';

      if (feriasFuncionario?.MES) {
        const data = new Date(feriasFuncionario.MES);
        // Para o select: apenas o mês
        mesFormatado = data.toLocaleString('pt-BR', { month: 'long' });

        // Para a tabela: dia e mês
        diaEMes = data.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit' });
      }

      return {
        ...f,
        MES_FORMATADO: mesFormatado, // usado no filtro/select
        DIA_EM_MES: diaEMes,         // novo campo para tabela
        SALDO: feriasFuncionario ? feriasFuncionario.SALDO : '-'
      };
    });
  };

  useEffect(() => {
    // Buscar gerências
    axios.get('http://localhost:3001/gerencias')
      .then(res => setGerencias(res.data))
      .catch(err => console.error('Erro ao buscar gerências:', err));

    // Buscar funcionários
    axios.get('http://localhost:3001/gerencias/funcionarios')
      .then(res => setFuncionarios(res.data))
      .catch(err => console.error('Erro ao buscar funcionários:', err));

    // Buscar funcionários em férias
    axios.get('http://localhost:3001/gerencias/emferias')
      .then(res => setFuncionariosEmFerias(res.data))
      .catch(err => console.error(err));
  }, []);

  // Atualiza filteredFuncionarios sempre que funcionarios ou funcionariosEmFerias mudam
  useEffect(() => {
    const funcsComMes = mapFuncionariosComMes(funcionarios, funcionariosEmFerias);
    setFilteredFuncionarios(funcsComMes);
  }, [funcionarios, funcionariosEmFerias]);

  const handleFilter = (sigla: string) => {
    setSelectedSigla(sigla);

    if (sigla === '') {
      const funcsComMes = mapFuncionariosComMes(funcionarios, funcionariosEmFerias);
      setFilteredFuncionarios(funcsComMes);
    } else {
      axios.get(`http://localhost:3001/gerencias/${sigla}/funcionarios`)
        .then(res => {
          const funcsComMes = mapFuncionariosComMes(res.data, funcionariosEmFerias);
          setFilteredFuncionarios(funcsComMes);
        })
        .catch(err => console.error('Erro ao filtrar funcionários:', err));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-[#023472] text-center mb-6">
          Funcionários por Gerência
        </h1>

        {/* Filtro por Gerência */}
        <div className="flex gap-4 items-center mb-4">
          <label className="font-semibold text-gray-700">Filtrar por Gerência:</label>
          <select
            onChange={(e) => handleFilter(e.target.value)}
            value={selectedSigla}
            className="p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas</option>
            {gerencias.map(g => (
              <option key={g.ID_GERENCIA} value={g.SIGLA_GERENCIA}>
                {g.GERENCIA}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Mês */}
        <div className="flex gap-4 items-center mb-4">
          <label className="font-semibold text-gray-700">Filtrar por Mês:</label>
          <select
            onChange={(e) => setSelectedMes(e.target.value)}
            value={selectedMes}
            className="p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            {meses.slice(1).map((mes) => (
              <option key={mes} value={mes}>
                {mes.charAt(0).toUpperCase() + mes.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Tabela */}
        <table className="w-full text-sm text-black text-center border mt-4">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-center">Matrícula</th>
              <th className="p-2 text-center">Nome</th>
              <th className="p-2 text-center">Gerência</th>
              <th className="p-2 text-center">Período</th>
              <th className="p-2 text-center">Saldo</th>
              <th className="p-2 text-center">Dia/Mês</th>
            </tr>
          </thead>
          <tbody>
            {filteredFuncionarios
              .filter(f => !selectedMes || f.MES_FORMATADO?.toLowerCase() === selectedMes.toLowerCase())
              .sort((a, b) => (a.NOME || '').localeCompare(b.NOME || ''))
              .map(f => (
                <tr key={f.MATRICULA_F}>
                  <td className='p-2 text-center'>{f.MATRICULA_F}</td>
                  <td className='p-2 text-center'>{f.NOME}</td>
                  <td className='p-2 text-center'>{f.SIGLA_GERENCIA}</td>
                  <td className='p-2 text-center'>{f.PERIODO_AQUISITIVO_EM_ABERTO}</td>

                  <td>{f.SALDO || '-'}</td>
                  <td>{f.DIA_EM_MES || '-'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Gerencias;

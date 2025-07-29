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
}
interface Gozo {
  MATRICULA_F: string,
  PERIODO_AQUISITIVO : string,
  MES:string,
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

const meses = [
  "", "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
];

useEffect(() => {
  axios.get('http://localhost:3001/gerencias') // <- rota correta conforme seu server.js
    .then(res => setGerencias(res.data))
    .catch(err => console.error('Erro ao buscar gerências:', err));

  axios.get('http://localhost:3001/gerencias/funcionarios') // <- mesma coisa
    .then(res => {
      setFuncionarios(res.data);
      setFilteredFuncionarios(res.data);
    })
    .catch(err => console.error('Erro ao buscar funcionários:', err));
  axios.get('http://localhost:3001/gerencias/emferias')
       .then(res => setFuncionariosEmFerias(res.data))   // estado exclusivo!
       .catch(err => console.error(err));
}, []);
const handleFilter = (sigla: string) => {
  setSelectedSigla(sigla);
  
  if (sigla === '') {
    setFilteredFuncionarios(funcionarios);
  } else {
    axios.get(`http://localhost:3001/gerencias/${sigla}/funcionarios`)
      .then(res => setFilteredFuncionarios(res.data))
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

        <table className="w-full text-sm font-mono text-black text-left border mt-4">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Matrícula</th>
              <th className="p-2">Nome</th>
              <th className="p-2">Gerência</th>
              <th className="p-2">Período</th>
              <th className="p-2">Mês</th>
              <th className="p-2">Saldo</th>
            </tr>
          </thead>
          <tbody>
  {filteredFuncionarios
    .slice()
    .sort((a, b) => a.NOME.localeCompare(b.NOME))
    .map((linha, index) => {
      const ferias = funcionariosEmFerias.find(
        (feria) => feria.MATRICULA_F === linha.MATRICULA_F
      );

  return (
    <tr key={index} className="border-t">
      <td>{linha.MATRICULA_F}</td>
      <td>{linha.NOME}</td>
      <td>{linha.SIGLA_GERENCIA}</td>
      <td>{ferias ? ferias.PERIODO_AQUISITIVO : '-'}</td>
      <td>{ferias ? `${ferias.MES} ${ferias.ANO}` : '-'}</td>
      <td>{ferias ? ferias.SALDO : '-'}</td>
    </tr>
  );
})}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Gerencias;

'use client';

import React, { useEffect, useState } from "react";
import DashboardCard from "./../../../components/DashboardCard";
import Header from "./../../../components/Header";
import axios from "axios";

interface DashboardData {
  totalFuncionarios: number;
  feriasMesAtual: number;
  feriasSolicitadas: number;
}

const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardData>({
    totalFuncionarios: 0,
    feriasMesAtual: 0,
    feriasSolicitadas: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          funcionariosTotalRes,
          feriasMesAtualRes,
          feriasSolicitadasRes
        ] = await Promise.all([
          axios.get("http://localhost:3001/tela/funcionarios/count"),
          axios.get("http://localhost:3001/tela/ferias/mes-atual"),
          axios.get("http://localhost:3001/tela/ferias/solicitacoes")
        ]);

        setData({
          totalFuncionarios: funcionariosTotalRes.data.total,
          feriasMesAtual: feriasMesAtualRes.data.total,
          feriasSolicitadas: feriasSolicitadasRes.data.total
        });
      } catch (err) {
        console.error("Erro ao buscar dados do dashboard", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
        <h2 className="text-2xl font-bold mb-6 text-center text-[#023472]">Resumo de Férias - SEREC</h2>
        <div className="flex flex-wrap gap-6 align-items-center justify-center">
          <DashboardCard
            title="Funcionários SEREC"
            value={data.totalFuncionarios}
            color="bg-yellow-400"
          />
          <DashboardCard
            title="Funcionários em Férias"
            value={data.feriasMesAtual}
            color="bg-yellow-400"
          />
          <DashboardCard
            title="Solicitações em Aberto"
            value={data.feriasSolicitadas}
            color="bg-yellow-400"
          />
        </div>
    </div>
  );
};

export default DashboardPage;

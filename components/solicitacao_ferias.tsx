//verifica o período aquisitivo, para solicitação das férias a partir do login de usuário.// 

'use client'
import React, { useState, useEffect } from "react";
import Header from "./Header";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

function normalizarMes(input: string): string {
  const meses: Record<string, string> = {
    janeiro: 'Janeiro',
    fevereiro: 'Fevereiro',
    marco: 'Março',
    março: 'Março',
    abril: 'Abril',
    maio: 'Maio',
    junho: 'Junho',
    julho: 'Julho',
    agosto: 'Agosto',
    setembro: 'Setembro',
    outubro: 'Outubro',
    novembro: 'Novembro',
    dezembro: 'Dezembro',
  };

  const chave = input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, '');

  return meses[chave] || input;
}

const SolicitacaoFerias: React.FC = () => {
  const [form, setForm] = useState({
    dataInicio: "",
    dataFim: "",
    periodoAquisitivo: "",
    dataAno: ""
  });

  const [periodos, setPeriodos] = useState<string[]>([]);
  const matricula = "916286"; // substituir pelo valor real do usuário logado

  useEffect(() => {
  fetch(`http://localhost:3001/solicitar-ferias/periodos/${matricula}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Resposta da API:", data);

      // ajuste conforme estrutura real da resposta
      const lista = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
          ? data.data
          : [];

      const periodosDisponiveis = lista.map((p: any) => p.PERIODO_AQUISITIVO_EM_ABERTO);
      setPeriodos(periodosDisponiveis);
    })
    .catch((err) => console.error("Erro ao buscar períodos:", err));
}, [matricula]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataInicioNormalizada = normalizarMes(form.dataInicio);
    const dataFimNormalizada = normalizarMes(form.dataFim);

    const body = {
      matricula,
      periodo_aquisitivo: form.periodoAquisitivo,
      tipo: "algum_tipo", // ajustar conforme o sistema
      percepcao: "alguma_percepcao", // ajustar conforme o sistema
      gozo: `${dataInicioNormalizada} a ${dataFimNormalizada}`,
      mes_gozo: dataInicioNormalizada,
      ano_gozo: form.dataAno,
      saldo: 0,
      nome: "Nome do usuário", // substituir pelo nome real do usuário
    };

    try {
      const res = await fetch("http://localhost:3001/solicitar-ferias/solicitacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Erro ao enviar solicitação");

      alert("Solicitação enviada com sucesso!");
      setForm({ dataInicio: "", dataFim: "", periodoAquisitivo: "", dataAno: "" });
    } catch (error) {
      alert("Erro ao enviar solicitação: " + getErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#023472]">Solicitação de Férias</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700">Período Aquisitivo</label>
            <select
              name="periodoAquisitivo"
              value={form.periodoAquisitivo}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 text-black"
              required
            >
              <option value="">Selecione um Período</option>
              {periodos.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Data de Início (Mês)</label>
            <input
              name="dataInicio"
              placeholder="Mês"
              value={form.dataInicio}
              onChange={handleChange}
              className="w-full p-2 placeholder:text-gray-500 border rounded-md focus:ring focus:ring-blue-300 text-black"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Data de Fim (Mês)</label>
            <input
              name="dataFim"
              placeholder="Mês"
              value={form.dataFim}
              onChange={handleChange}
              className="w-full p-2 placeholder:text-gray-500 border rounded-md focus:ring focus:ring-blue-300 text-black"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Ano de Gozo</label>
            <input
              name="dataAno"
              placeholder="Ano"
              value={form.dataAno}
              onChange={handleChange}
              className="w-full p-2 placeholder:text-gray-500 border rounded-md focus:ring focus:ring-blue-300 text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#023472] text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Enviar Solicitação
          </button>
        </form>
      </div>
    </div>
  );
};

export default SolicitacaoFerias;

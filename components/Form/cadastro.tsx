"use client";

import React, { useState } from "react";
import Header from "../Header";
import Input from "../input/input";
import MatriculaInput from "../input/matriculaInput";




const CadastroFuncionario: React.FC = () => {
  const [form, setForm] = useState({
    matricula: "",
    nome: "",
    cargo: "",
    telefone: "",
    cpf: "",
    email: "",
    gerencia: "", // aqui deve ser o id da gerência (string que representa número)
  });

  const [cargoSugestoes, setCargoSugestoes] = useState<string[]>([]);
  const [nivelSugestoes, setNivelSugestoes] = useState<string[]>([]);

  // Atualiza os valores do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });



  };


  // Submissão com envio ao backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matricula: form.matricula,
          senha: form.matricula, // senha inicial = matricula
          nome: form.nome,
          email: form.email,
          id_gerencia: Number(form.gerencia), // converte para número
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Erro ao cadastrar: " + (errorData.error || "Erro desconhecido"));
        return;
      }

      alert("Funcionário cadastrado com sucesso!");
      // Limpar formulário (opcional)
      setForm({
        matricula: "",
        nome: "",
        cargo: "",
        telefone: "",
        cpf: "",
        email: "",
        gerencia: "",
      });
    } catch (error) {
      console.error("Erro ao conectar com backend:", error);
      alert("Erro ao conectar com servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-2xl font-bold mb-4 text-[#023472]">
          Cadastro de Funcionário
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <MatriculaInput value={form.matricula} onChange={handleChange} />

          <Input
            type="text"
            id="nome"
            name="nome"
            placeholder="Digite o nome completo"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            id="cpf"
            name="cpf"
            placeholder="CPF"
            value={form.cpf}
            onChange={handleChange}
            required
          />
          <Input
            type="tel"
            id="telefone"
            name="telefone"
            placeholder="Telefone"
            value={form.telefone}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* Troque o input gerencia por select para evitar erro */}
          <select
            id="gerencia"
            name="gerencia"
            value={form.gerencia}
            onChange={handleChange}
            required
            className="p-2 w-full  focus:ring-blue-500w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
          >
            <option value="">Selecione a gerência</option>
            <option value="1">1- CIJ</option>
            <option value="2">2- GA</option>
            <option value="3">3- GACD</option>
            <option value="4">4- GAF</option>
            <option value="5">5- GFTM</option>
            <option value="6">6- GTI</option>
            <option value="7">7- PFM</option>
            <option value="8">8- GAB SEREC</option>
            <option value="9">9- GAB SEFAZ</option>
            <option value="10">10- GCONT</option>
            <option value="11">11- GPEC</option>
            <option value="12">12- GEPF</option>
            <option value="13">13- GPAG</option>
            <option value="14">14- GCONF</option>
            <option value="15">15- GAB SEFIN</option>
            <option value="16">16- 2 INST</option>
          </select>

          <button
            type="submit"
            className="w-full bg-[#023472] text-white py-2 rounded mt-4"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroFuncionario;

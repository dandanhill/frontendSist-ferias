"use client";

import React, { useState } from "react";
import Header from "./Header";
import Input from "./input";
import MatriculaInput from "./matriculaInput";

const cargosDisponiveis = [
    "Assessor",
    "Gerente",
    "Coordenador",
    "Analista",
    "Coordenador",
];

const niveisDisponiveis = [
    "Gerente = ID 2",
    "Secretaria = ID 3",
    "Usuario = ID 1",
    "Administrador = ID 4",
];

const CadastroFuncionario: React.FC = () => {
    const [form, setForm] = useState({
        matricula: "",
        nome: "",
        cargo: "",
        telefone: "",
        email: "",
        nivel: "",
        dataAdmissao: "",
    });

    const [cargoSugestoes, setCargoSugestoes] = useState<string[]>([]);
    const [nivelSugestoes, setNivelSugestoes] = useState<string[]>([]);

    // Atualiza os valores do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm({ ...form, [name]: value });

        // Sugestões automáticas para o campo "Cargo"
        if (name === "cargo") {
            const filtro = cargosDisponiveis.filter((c) =>
                c.toLowerCase().includes(value.toLowerCase())
            );
            setCargoSugestoes(filtro);
        }

        // Sugestões automáticas para o campo "Nível"
        if (name === "nivel") {
            const filtro = niveisDisponiveis.filter((n) =>
                n.toLowerCase().includes(value.toLowerCase())
            );
            setNivelSugestoes(filtro);
        }
    };

    // Seleciona um cargo da lista
    const selecionarCargo = (cargo: string) => {
        setForm({ ...form, cargo });
        setCargoSugestoes([]);
    };

    // Seleciona um nível da lista
    const selecionarNivel = (nivel: string) => {
        setForm({ ...form, nivel });
        setNivelSugestoes([]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Funcionário cadastrado com sucesso!");
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
                <h1 className="text-2xl font-bold mb-4 text-[#023472]">
                    Cadastro de Funcionário
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Matrícula */}
                    <MatriculaInput
                        value={form.matricula}
                        onChange={handleChange}
                    />

                    {/* Nome Completo */}
                    <Input
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Digite o nome completo"
                        value={form.nome}
                        onChange={handleChange}
                        required
                    />

                    {/* Cargo com Autocomplete */}
                    <div className="relative">
                        <Input
                            type="text"
                            id="cargo"
                            name="cargo"
                            placeholder="Digite o cargo"
                            value={form.cargo}
                            onChange={handleChange}
                            required
                        />
                        <ul className="absolute z-10 bg-white border rounded mt-1 w-full shadow-md text-black ">
                            {cargoSugestoes.map((cargo, index) => (
                                <li
                                    key={`${cargo}-${index}`}  // Usando a combinação do cargo e índice como chave única
                                    onClick={() => selecionarCargo(cargo)}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                >
                                    {cargo}
                                </li>
                            ))}
                        </ul>


                    </div>

                    {/* Nível com Autocomplete */}
                    <div className="relative">
                        <Input
                            type="text"
                            id="nivel"
                            name="nivel"
                            placeholder="Digite o nível"
                            value={form.nivel}
                            onChange={handleChange}
                            required
                        />
                        {nivelSugestoes.length > 0 && (
                            <ul className="absolute z-10 bg-white border rounded mt-1 w-full shadow-md text-black">
                                {nivelSugestoes.map((nivel) => (
                                    <li
                                        key={nivel}
                                        onClick={() => selecionarNivel(nivel)}
                                        className="p-2 hover:bg-gray-200 cursor-pointer"
                                    >
                                        {nivel}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Telefone */}
                    <Input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        placeholder="Telefone"
                        value={form.telefone}
                        onChange={handleChange}
                        required
                    />

                    {/* E-mail */}
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="E-mail"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    {/* Data de Admissão */}
                    <Input
                        type="date"
                        id="dataAdmissao"
                        name="dataAdmissao"
                        placeholder="Selecione a data de admissão"
                        value={form.dataAdmissao}
                        onChange={handleChange}
                        required
                    />

                    {/* Botão de Cadastro */}
                    <button
                        type="submit"
                        className="w-full bg-[#023472] text-white py-2 rounded mt-4"
                    >
                        Cadastrar Funcionário
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CadastroFuncionario;

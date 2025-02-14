"use client";
import React, { useState } from "react";
import MatriculaInput from "../components/matriculaInput"

const funcionarios = [
    { matricula: "000000", nome: "João Silva Da Silva",gerencia: "GAF" ,cargo: "Assistente", ferias: "Em aberto", dias: "25" },
    { matricula: "111111", nome: "Maria Santos Da Silva",gerencia: "GFTM",cargo: "Gerente", ferias: "Solicitada", dias: "30" },
    { matricula: "222222", nome: "Carlos Souza Da Silva",gerencia: "GIF",cargo: "Analista", ferias: "Aprovada", dias: "15" },
];

const ConsultaFuncionario: React.FC = () => {
    const [matricula, setMatricula] = useState("");
    const [resultado, setResultado] = useState<any>(null);
    const [erro, setErro] = useState("");

    const buscarFuncionario = () => {
        const funcionario = funcionarios.find(f => f.matricula === matricula);
        if (funcionario) {
            setResultado(funcionario);
            setErro("");
        } else {
            setResultado(null);
            setErro("Funcionário não encontrado.");
        }
    };

    return (
        
        <div className="min-h-screen bg-white text-black"> {/* Fundo branco e texto preto */}
        
    <div className="max-w-2xl mx-auto p-6 bg-gray-200 rounded-lg shadow-md mt-10"> {/* Fundo cinza */}
        <h1 className="text-2xl font-bold mb-4">Consulta de Funcionário</h1>

        <div className="flex space-x-2">
            <MatriculaInput
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                />
                <button
                        onClick={buscarFuncionario}
                        style={{ backgroundColor: "#023472" }}
                        className="text-white px-4 py-2 rounded"
                    >
                        Buscar
                    </button>

                </div>

                {erro && <p className="text-red-500 mt-4">{erro}</p>}

                {resultado && (
                    <div className="mt-6 p-4 border rounded bg-gray-50 text-black">
                        <h2 className="text-xl font-semibold">{resultado.nome}</h2>
                        <p><strong>Matrícula: </strong> {resultado.matricula}</p>
                        <p><strong>Gerência: </strong> {resultado.gerencia}</p>
                        <p><strong>Cargo: </strong> {resultado.cargo}</p>
                        <p><strong>Dias: </strong> {resultado.dias}</p>
                        <p><strong>Ferias: </strong> {resultado.ferias}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsultaFuncionario;

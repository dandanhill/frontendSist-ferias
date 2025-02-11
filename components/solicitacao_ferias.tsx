"use client"; 
import React, { useState } from "react";

const SolicitaoFerias: React.FC = () => {
    const [form, setForm] = useState({
        dataInicio: "",
        dataFim: "",
        justificativa: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Solicitação enviada:", form);
        alert("Solicitação de férias enviada com sucesso!");
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-[#023472]">Solicitação de Férias</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">


                    {/* Data de Início */}
                    <div>
                        <label className="block font-semibold text-gray-700">Data de Início</label>
                        <input 
                            type="date" 
                            name="dataInicio" 
                            value={form.dataInicio} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 text-black"
                            required
                        />
                    </div>

                    {/* Data de Fim */}
                    <div>
                        <label className="block font-semibold text-gray-700">Data de Fim</label>
                        <input 
                            type="date" 
                            name="dataFim" 
                            value={form.dataFim} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 text-black"
                            required
                        />
                    </div>

                    {/* Botão de Envio */}
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

export default SolicitaoFerias;

"use client"; // Adicione esta linha no topo
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Importa o roteador do Next.js
import Input from "./input";
import MatriculaInput from "./matriculaInput";


const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter(); // Hook para navegação

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Definição de usuário válido
    const usuarioBanco = "123456"; // Matrícula válida
    const senhaBanco = "password"; // Senha válida

    if (username === usuarioBanco && password === senhaBanco) {
      setError("");
      console.log("Login bem-sucedido!");

      // Redireciona para a página desejada após o login
      router.push("/tela"); // Substitua "/dashboard" pela rota correta
    } else {
      setError("Matrícula ou senha incorretos!"); // Exibe mensagem de erro
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#023472]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="text-center">
          <img
            src="/logoprefeitura.jpeg"
            alt="Logo"
            width={160}
            height={144}
            className="mx-auto"
          />
          <h3 className="mt-4 text-2xl font-bold text-[#023472]">
            Sistema de Férias PMJG
          </h3>
          <div className="mt-4">
          <MatriculaInput value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mt-2">
            <Input
              type="password"
              id="inputpassword"
              name="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full px-4 py-2 bg-[#023472] text-white rounded-md shadow-md  transition duration-300"
          >
            Entrar
          </button>
        </form>
        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
